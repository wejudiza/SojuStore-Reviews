import React from 'react';
import { shallow } from 'enzyme';
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

// eslint-disable-next-line no-undef
describe('RelatedProducts', () => {
  it('Releated Products renders', () => {
    const wrapper = shallow((
      <App>
        <RelatedProducts />
      </App>));
    expect(wrapper.contains(<RelatedProductsList />)).toBe(true);
  });
});
