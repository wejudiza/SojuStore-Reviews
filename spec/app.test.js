import React from 'react';
import { shallow } from 'enzyme';
// import RelatedProducts from '../client/src/components/RelatedProducts';
import App from '../client/src/components/App';


// eslint-disable-next-line no-undef
describe('App component', () => {
  it('App Component renders', () => {
    const wrapper = shallow(<App />);
  });
});

