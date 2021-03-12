import React from 'react';
import { shallow } from 'enzyme';
import getRelated from '../../client/src/components/RelatedProducts/RelatedProductsList';
import App from '../../client/src/components/App';
import OutfitList from '../../client/src/components/RelatedProducts/OutfitList';
import axios from 'axios';
import { rest } from 'msw';
// import MockAdapter from 'axios-mock-adapter';

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

test('testing get', async () => {
  // Render components, perform requests, receive mocked responses.
  rest.get('/api', (req, res, ctx) => {
    return res(ctx.json({ firstName: 'John' }))
  })
})

