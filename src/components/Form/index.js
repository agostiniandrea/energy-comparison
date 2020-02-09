import React from 'react';
import './Form.css';

export const regex = {
    postcode: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

const typeValues = {
    "Electricity": 0,
    "Gas": 1,
}

const energyUnities = ["kWh", "m3"];

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postcode: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            type: {
                value: 0,
                isValid: true,
            },
            usage: {
                value: 0,
                isValid: false,
            },
            showInvalidParameters: false
        };

        this.calculate = this.calculate.bind(this);
        this.onPostcodeChange = this.onPostcodeChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onUsageChange = this.onUsageChange.bind(this);
    }

    onPostcodeChange(event) {
        const postcode = event.target.value.toUpperCase();
        this.saveStateChange("postcode", postcode, regex.postcode.test(postcode));
    }

    onEmailChange(event) {
        this.saveStateChange("email", event.target.value, regex.email.test(this.state.email.value));
    }

    onTypeChange(value) {
        this.saveStateChange("type", value);
        this.saveUsageChange(0);
        this.props.onTypeChange();
    }

    saveStateChange(type, fieldValue, isValid = true) {
        this.setState({
            [type]: {
                value: fieldValue,
                isValid
            }
        });
    }

    onUsageChange(event) {
        this.saveUsageChange(event.target.value);
    }

    saveUsageChange(value) {
        this.saveStateChange("usage", value, value > 0);
    }

    calculate(e) {
        if (!this.state.showInvalidParameters) {
            this.setState({
                showInvalidParameters: true
            });
        }
        if (this.state.postcode.isValid && this.state.email.isValid && this.state.usage.isValid && this.state.type.isValid) {
            this.props.onSubmit(this.state);
        }
        if (e) {
            e.preventDefault();
        }
    }

    render() {
        return (
            <form className={`form-container ${this.state.showInvalidParameters ? "show-invalid-parameters" : ""}`}>
                <div className="form-item postcode">
                    <label className="form-label">Postal code</label>
                    <input
                        type="text"
                        value={this.state.postcode.value}
                        onChange={this.onPostcodeChange}
                        maxLength={6}
                        placeholder="1234AB"
                    />
                    {!this.state.postcode.isValid && <label className="invalid-value">X</label>}
                </div>
                <div className="form-item energy-type">
                    <label className="form-label">Energy type</label>
                    <div className="radio-button">
                        <label>Electricity</label>
                        <input
                            type="radio"
                            checked={this.state.type.value === typeValues["Electricity"]}
                            onChange={() => this.onTypeChange(typeValues["Electricity"])}
                            value={typeValues["Electricity"]}
                        />
                    </div>
                    <div className="radio-button">
                        <label>Gas</label>
                        <input
                            type="radio"
                            checked={this.state.type.value === typeValues["Gas"]}
                            onChange={() => this.onTypeChange(typeValues["Gas"])}
                            value={typeValues["Gas"]}
                        />
                    </div>
                </div>
                <div className="form-item email">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        value={this.state.email.value}
                        onChange={this.onEmailChange}
                        placeholder="your@email.com"
                    />
                    {!this.state.email.isValid && <label className="invalid-value">X</label>}
                </div>
                <div className="form-item energy-usage">
                    <label className="form-label">Usage</label>
                    <input
                        type="number"
                        value={this.state.usage.value}
                        onChange={this.onUsageChange}
                        placeholder={this.state.type.value}
                    />
                    <label className="usage-unity">{energyUnities[this.state.type.value]}</label>
                    {!this.state.usage.isValid && <label className="invalid-value">X</label>}
                </div>
                <button className="submit-button" onClick={this.calculate}>Start comparing</button>
            </form>
        );
    }
}

export default Form;
