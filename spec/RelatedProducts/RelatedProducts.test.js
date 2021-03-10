import React from 'react';
import { shallow } from 'enzyme';
import RelatedProductsList from '../../client/src/components/RelatedProducts/RelatedProductsList';
import App from '../../client/src/components/App';
import OutfitList from '../../client/src/components/RelatedProducts/OutfitList';


describe('RelatedProducts', () => {
  it('Releated Products List renders', () => {
    const wrapper = shallow(
      <App>
        <RelatedProductsList />
      </App>);
    expect(wrapper.containsMatchingElement(<RelatedProductsList />)).toEqual(true);
  });
});


describe('Outfit List', () => {
  it('Outfit List renders', () => {
    const wrapper = shallow(
      <App>
        <OutfitList />
      </App>);
    expect(wrapper.containsMatchingElement(<OutfitList />)).toEqual(true);
  });
});


