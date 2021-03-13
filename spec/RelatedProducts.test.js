import React from 'react';
import { shallow } from 'enzyme';

/////// Components ///////
import RelatedProductsList from '../client/src/components/RelatedProducts/RelatedProductsList';
import RelatedProducts from '../client/src/components/RelatedProducts/RelatedProducts';
import OutfitList from '../client/src/components/RelatedProducts/OutfitList';
import OutfitCard from '../client/src/components/RelatedProducts/OutfitCard';




describe('Related Products', () => {
  it('Related Products List renders successfully', () => {
    const wrapper = shallow(<RelatedProductsList />);
    expect(wrapper.exists()).toBe(true)
  });
});

describe('Related Products', () => {
  it('Related Products renders', () => {
    const wrapper = shallow(<RelatedProducts />);
    expect(wrapper.exists()).toBe(true)
  });
});

describe('Outfit List', () => {
  it('Outfit List renders', () => {
    const wrapper = shallow(<OutfitList />);
    expect(wrapper.exists()).toBe(true)
  });
});

describe('Outfit Card', () => {
  it('Outfit Card renders', () => {
    const wrapper = shallow(<OutfitCard />);
    expect(wrapper.exists()).toBe(true)
  });
});
