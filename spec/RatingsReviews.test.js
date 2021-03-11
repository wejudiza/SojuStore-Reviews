import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import App from '../client/src/components/App.jsx';
import SortSelect from '../client/src/components/RatingsReviews/SortSelect';
import RatingsReviews from '../client/src/components/RatingsReviews/RatingsReviews';

describe('SortSelect', () => {
  it('SortSelect renders successfully', () => {
    const wrapper = shallow(<SortSelect />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('RatingsReviews', () => {
  it('RatingsReviews renders successfully', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<RatingsReviews />)).toBe(true);
  });
});
