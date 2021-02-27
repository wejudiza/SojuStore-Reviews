import React from 'react';
import { shallow } from 'enzyme';
import RelatedItems from '../client/src/components/RelatedItems';
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
describe('RelatedItems', () => {
  it('Releated Items renders', () => {
    const wrapper = shallow((
      <App>
        <RelatedItems />
      </App>));
    expect(wrapper.contains(<RelatedItems />)).toBe(true);
  });
});
