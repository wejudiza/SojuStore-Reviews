import React from 'react';
import { shallow } from 'enzyme';

import Def from '../../client/src/components/Overview/Def-Expanded';

describe('Products', () => {
  it ('Default Expanded renders', () => {
    const wrapper = shallow(<Def />)
    expect(wrapper.exists()).toBe(true)
  })
})