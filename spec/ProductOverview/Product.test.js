import React from 'react';
import { shallow } from 'enzyme';

import Product from '../../client/src/components/Overview/Product';

describe ('Products', () => {
  it ('Product renders', () => {
    const wrapper = shallow(<Product />)
    expect(wrapper.exists()).toBe(true)
  })
})
