import React from 'react';
import { shallow } from 'enzyme';

import StyleSelect from '../../client/src/components/Overview/StyleSelect';

describe ('Products', () => {
  it ('StyleSelect renders successfully', () => {
    const wrapper = shallow(<StyleSelect />)
    expect(wrapper.exists()).toBe(true)
  })
})