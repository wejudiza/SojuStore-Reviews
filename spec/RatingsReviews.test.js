import React from 'react';
import { shallow } from 'enzyme';

// Import App + SortSelect component for testing
import SortSelect from '../../client/src/components/RatingsReviews/SortSelect';
// import RatingsReviews from '../../client/src/components/RatingsReviews/RatingsReviews';

describe('SortSelect', () => {
  it('SortSelect renders successfully', () => {
    const wrapper = shallow(<SortSelect />);
    expect(wrapper.exists()).toBe(true);
  });
});

// All tests for SortSelect
// describe('RatingsReviews', () => {
//   it('RatingsReviews renders successfully', () => {
//     const wrapper = shallow(<RatingsReviews />);
//     expect(wrapper.exists()).toBe(true);
//   });
// });
