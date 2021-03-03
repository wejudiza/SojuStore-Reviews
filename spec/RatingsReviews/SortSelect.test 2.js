import React from 'react';
import { shallow } from 'enzyme';

// Import App + SortSelect component for testing
import SortSelect from '../../client/src/components/RatingsReviews/SortSelect';

// All tests for SortSelect
describe('SortSelect', () => {

  it('SortSelect renders successfully', () => {
    const wrapper = shallow(<SortSelect />);
    expect(wrapper.exists()).toBe(true);
  });

});
