import React from 'react';
import { shallow } from 'enzyme';
import RelatedProductsList from '../client/src/components/RelatedProducts/RelatedProductsList';
import RelatedProducts from '../client/src/components/RelatedProducts/RelatedProducts';
import OutfitList from '../client/src/components/RelatedProducts/OutfitList';
import OutfitCard from '../client/src/components/RelatedProducts/OutfitCard';




describe('Related Products', () => {
  it('RelatedProducts renders successfully', () => {
    const wrapper = shallow(<RelatedProductsList />);
    expect(wrapper.exists()).toBe(true)
  });
});

describe('Outfit List', () => {
  it('Outfit List renders', () => {
    const wrapper = shallow(<OutfitList />);
    expect(wrapper.exists()).toBe(true)
  });
});

describe('Outfit List', () => {
  it('Outfit List renders', () => {
    const wrapper = shallow(<OutfitList />);
    expect(wrapper.exists()).toBe(true)
  });
});