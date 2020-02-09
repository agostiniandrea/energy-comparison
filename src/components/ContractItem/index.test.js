import React from 'react';
import { shallow } from 'enzyme';
import ContractItem from './index';

import gasProvidersList from './../../mock/gas.json';
const providersList = gasProvidersList.list;
const provider = providersList[0];

const QUANTITY_VALUE = 500;

let wrapper1;
let wrapper2;

beforeEach(() => {
    wrapper1 = shallow(<ContractItem />);
    wrapper2 = shallow(<ContractItem image={provider.image} name={provider.name} price={provider.price} quantity={QUANTITY_VALUE} />);
})

afterEach(() => {
    wrapper1.unmount();
    wrapper2.unmount();
});

describe('ContractItem/index.js', () => {
    it('renders without crashing', () => {
        expect(wrapper1).toMatchSnapshot();
        expect(wrapper2).toMatchSnapshot();
    });

    it('calculates prices properly', () => {
        expect(wrapper2.instance().annualPrice()).toBe("14.10");
        expect(wrapper2.instance().monthlyPrice()).toBe("1.18");
    });
});