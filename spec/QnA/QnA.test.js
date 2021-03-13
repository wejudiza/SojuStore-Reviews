import React from 'react';
import { shallow } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import QnA from '../../client/src/components/QnA/QnA.jsx';

describe('Questions and Answers', () => {
  it('Questions and Answers renders successfully', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<QnA />)).toBe(true);
  });
});
