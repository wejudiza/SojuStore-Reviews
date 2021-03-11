import React from 'react';
import { shallow } from 'enzyme';

import GalleryImg from '../../client/src/components/Overview/GalleryImg';

describe('Gallery Img', () => {
  it ('Gallery renders', () => {
    const wrapper = shallow(<GalleryImg />)
    expect(wrapper.exists()).toBe(true)
  })
})