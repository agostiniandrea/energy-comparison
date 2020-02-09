import React from 'react';
import { shallow } from 'enzyme';
import { sortBy } from 'lodash';
import App from './App';
import electricityProvidersMock from './mock/electricity.json';

const providersList = electricityProvidersMock.list;

const formData = {
  postcode: {
    value: "1033XX",
    isValid: true
  },
  email: {
    value: "name@email.com",
    isValid: true
  },
  type: {
    value: 0,
    isValid: true
  },
  usage: {
    value: 1200,
    isValid: true
  },
  showInvalidParameters: false
}

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
})

afterEach(() => {
  wrapper.unmount();
});

describe('App.js', () => {
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly the contracts list', () => {
    wrapper.instance().onSubmit(formData);
    expect(wrapper.instance().state.showLoader).toBe(true);

    setTimeout(() => {
      expect(wrapper.instance().state.showLoader).toBe(false);
      expect(wrapper.instance().state.contracts).toStrictEqual(sortBy(providersList, ['price']));
    }, 2400);
  });
});