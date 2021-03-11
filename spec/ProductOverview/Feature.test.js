import React from 'react';
import { shallow } from 'enzyme';

import Feature from '../../client/src/components/Overview/Feature';

describe ('Products', () => {
  it ('Feature renders', () => {
    const wrapper = shallow(<Feature />)
    expect(wrapper.exists()).toBe(true)
  })
})