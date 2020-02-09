import React from 'react';
import './ContractItem.css';

class ContractItem extends React.Component {
    constructor(props) {
        super(props);

        this.annualPrice = this.annualPrice.bind(this);
        this.monthlyPrice = this.monthlyPrice.bind(this);
    }

    annualPrice() {
        return ((this.props.price * this.props.quantity) / 10000).toFixed(2);
    }

    monthlyPrice() {
        return (this.annualPrice() / 12).toFixed(2);
    }

    render() {
        return (
            <div className="contract-item">
                <div className="contract-container">
                    <img className="brand-logo" alt="" src={this.props.image} />
                    <div className="brand-name">{this.props.name}</div>
                    <div className="contract-price">
                        <div className="price">€ {this.monthlyPrice()}</div>
                        <label className="description">
                            <strong>per month</strong><br />
                            € {this.annualPrice()} per year
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContractItem;
