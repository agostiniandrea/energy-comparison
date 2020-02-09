import React from 'react';
import { shallow } from 'enzyme';
import Form from './index';
import { regex } from './index';

const VALID_EMAIL = "name@gmail.com";
const VALID_POSTCODE = "1059CL";
const VALID_USAGE = 100;

const INVALID_EMAIL = "namegmail.com";
const INVALID_POSTCODE = "100010";
const INVALID_USAGE = 0;

let wrapper;

beforeEach(() => {
    wrapper = shallow(<Form />);
})

afterEach(() => {
    wrapper.unmount();
});

describe('Form/index.js', () => {
    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('shows invalid labels', () => {
        wrapper.instance().calculate();
        expect(wrapper.instance().state.showInvalidParameters).toBe(true);
        expect(wrapper.find(".postcode").find(".invalid-value").exists()).toBe(true);
        expect(wrapper.find(".email").find(".invalid-value").exists()).toBe(true);
        expect(wrapper.find(".energy-usage").find(".invalid-value").exists()).toBe(true);
    });

    it('sets valid values', () => {
        wrapper.instance().saveStateChange("postcode", VALID_POSTCODE, regex.postcode.test(VALID_POSTCODE));
        expect(wrapper.instance().state.postcode).toStrictEqual({ isValid: true, value: VALID_POSTCODE });

        wrapper.instance().saveStateChange("email", VALID_EMAIL, regex.email.test(VALID_EMAIL));
        expect(wrapper.instance().state.email).toStrictEqual({ isValid: true, value: VALID_EMAIL });

        wrapper.instance().saveUsageChange(VALID_USAGE);
        expect(wrapper.instance().state.usage).toStrictEqual({ isValid: true, value: VALID_USAGE });

        wrapper.instance().saveStateChange("type", 0);
        expect(wrapper.instance().state.type).toStrictEqual({ isValid: true, value: 0 });
    });

    it('warns on invalid values', () => {
        expect(wrapper.instance().state.usage).toStrictEqual({ isValid: false, value: 0 });

        wrapper.instance().saveStateChange("postcode", INVALID_POSTCODE, regex.postcode.test(INVALID_POSTCODE));
        expect(wrapper.instance().state.postcode).toStrictEqual({ isValid: false, value: INVALID_POSTCODE });

        wrapper.instance().saveStateChange("email", INVALID_EMAIL, regex.email.test(INVALID_EMAIL));
        expect(wrapper.instance().state.email).toStrictEqual({ isValid: false, value: INVALID_EMAIL });

        wrapper.instance().saveUsageChange(INVALID_USAGE);
        expect(wrapper.instance().state.usage).toStrictEqual({ isValid: false, value: INVALID_USAGE });
    });
});