import React from 'react';
import { shallow } from 'enzyme';

// Import App + SortSelect component for testing
import SortSelect from '../../client/src/components/RatingsReviews/SortSelect.jsx';

// All tests for SortSelect
describe('SortSelect', () => {

  it('SortSelect renders successfully', () => {
    const component = shallow(<SortSelect />);
  });

})