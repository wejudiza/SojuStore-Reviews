import React from 'react';
import { shallow } from 'enzyme';
import getRelated from '../../client/src/components/RelatedProducts/RelatedProductsList';
import App from '../../client/src/components/App';
import OutfitList from '../../client/src/components/RelatedProducts/OutfitList';
import axios from 'axios';
import { rest } from 'msw';

import { server } from '../mocks/server.js'
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
// import MockAdapter from 'axios-mock-adapter';


test('gets all products', async () => {
  // Render components, perform requests, receive mocked responses.
  await axios.get('/api')
    .then((data) => {return data})
})

test('gets related products', async () => {
  // Render components, perform requests, receive mocked responses.
  await axios.get(`/api/12345`)
    .then((data) => {return data})
})

test('gets product info', async () => {
  // Render components, perform requests, receive mocked responses.
  await axios.get(`/api/products/12345`)
    .then((data) => {return data})
})

test('gets product styles', async () => {
  // Render components, perform requests, receive mocked responses.
  await axios.get(`/api/styles/12345`)
    .then((data) => {return data})
})
