import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import QnA from '../../client/src/components/QnA/QnA.jsx';
import Answers from '../../client/src/components/QnA/Answers.jsx';
import Photos from '../../client/src/components/QnA/Photos.jsx';
import Questions from '../../client/src/components/QnA/Questions.jsx';
import {UserContext} from '../../client/src/components/UserContext.jsx';

describe('QnA', () => {
  it('QnA renders successfully', () => {
    const wrapper = shallow(<QnA />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Answers', () => {
  it('Answers renders successfully', () => {
    const wrapper = shallow(<Answers />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Photoss', () => {
  it('Photos renders successfully', () => {
    const wrapper = shallow(<Photos />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Questions', () => {
  it('Questions renders successfully', () => {
    const wrapper = shallow(<Questions />);
    expect(wrapper.exists()).toBe(true);
  });
});