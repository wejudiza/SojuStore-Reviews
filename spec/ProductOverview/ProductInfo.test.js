import React from 'react';
import { shallow } from 'enzyme';

import ProductInfo from '../../client/src/components/Overview/ProductInfo';

describe ('Products', () => {
  it ('Product Info renders', () => {
    const wrapper = shallow(<ProductInfo />)
    expect(wrapper.exists()).toBe(true)
  })
})