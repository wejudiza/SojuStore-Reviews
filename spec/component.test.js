import React from 'react';
import { shallow } from 'enzyme';
import Product from '../client/src/components/Overview/Product'
import RelatedProductsList from '../client/src/components/RelatedProducts/RelatedProductsList';
import App from '../client/src/components/App';

// describe('hello', () => {
//   it ('hello', () => {
//     var test = true;
//     expect(test).toBe(true);
//   });
// });

// eslint-disable-next-line no-undef
describe('App component', () => {
  it('App Component renders', () => {
    const wrapper = shallow(<App />);
  });
});

describe('Overview', () => {
  it ('Overview renders', () => {
    const wrapper = shallow((
      <App>
        <Product />
      </App>
    ));
    expect(wrapper.contains(<Product />)).toBe(true)
  })
})

// eslint-disable-next-line no-undef
describe('RelatedProducts', () => {
  it('Releated Products renders', () => {
    const wrapper = shallow((
      <App>
        <RelatedProductsList />
      </App>));
    expect(wrapper.contains(<RelatedProductsList />)).toBe(true);
  });
});
