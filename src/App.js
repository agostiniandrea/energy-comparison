import React from 'react';
import { sortBy } from 'lodash';
import './App.css';
import Form from './components/Form';
import ContractItem from './components/ContractItem';

import gasProvidersMock from './mock/gas.json';
import electricityProvidersMock from './mock/electricity.json';
import Loader from './components/Loader';

const initialState = {
  contracts: [],
  searchObject: {
    email: "",
    postcode: "",
    usage: 0,
    type: 0
  },
  showLoader: false,
  quantity: 1
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.getData = this.getData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      contracts: [],
      searchObject: initialState.searchObject,
    });
  }

  onTypeChange() {
    this.resetState();
  }

  onSubmit(data) {
    const newObject = Object.assign({}, {
      email: data.email.value,
      postcode: data.postcode.value,
      usage: data.usage.value,
      type: data.type.value
    });

    if (JSON.stringify(newObject) !== JSON.stringify(this.state.searchObject)) {
      this.getData(newObject);
    }
  }

  getData(object) {
    this.setState({ showLoader: true });

    setTimeout(() => {
      this.setState({ showLoader: false });
      const myList = object.type === 0 ? electricityProvidersMock : gasProvidersMock;
      this.setState({
        contracts: sortBy(myList.list, ['price']),
        quantity: object.usage
      })
    }, 2000);
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">Energy comparison</header>
        <Form onTypeChange={this.onTypeChange} onSubmit={this.onSubmit} />
        {this.state.showLoader && <Loader />}
        {this.state.contracts.length > 0 && <h3>Results</h3>}
        <div className="contracts-list">
          {
            this.state.contracts.map((contract) =>
              <ContractItem
                key={contract.id}
                image={contract.image}
                name={contract.name}
                price={contract.price}
                quantity={this.state.quantity}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
