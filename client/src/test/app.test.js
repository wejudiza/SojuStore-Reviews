import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});