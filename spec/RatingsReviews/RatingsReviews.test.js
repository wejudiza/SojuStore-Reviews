import React from 'react';
import { shallow } from 'enzyme';

// Import App + SortSelect component for testing
import RatingsReviews from '../../client/src/components/RatingsReviews/RatingsReviews';

// All tests for SortSelect
describe('RatingsReviews', () => {

  it('RatingsReviews renders successfully', () => {
    const wrapper = shallow(<RatingsReviews />);
    expect(wrapper.exists()).toBe(true);
  });

});
