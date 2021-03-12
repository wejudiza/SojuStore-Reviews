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
test('testing get', async () => {
  // Render components, perform requests, receive mocked responses.
  const result = await axios.get('/api/test')
    .then((data) => {return data})
  console.log(result)
})

// jest.mock('axios');

// test("good response", () => {
//   axios.get.mockImplementation(() => Promise.resolve({ data: {test:test} }));
// });

// test("bad response", () => {
//   axios.get.mockImplementation(() => Promise.reject({test:test}));
// });
// var mock = new MockAdapter(axios);

// describe('api call', () => {
//   it('Should make api call', () => {
//     mock.onGet('/api')
//   });
// });

// mock.onGet('/api').reply(200);

// axios.get('/api').then(function (response) {
//   console.log(response.data);
// });


