import React from 'react';
import { shallow } from 'enzyme';
import getRelated from '../../client/src/components/RelatedProducts/RelatedProductsList';
import App from '../../client/src/components/App';
import OutfitList from '../../client/src/components/RelatedProducts/OutfitList';
import axios from 'axios';

jest.mock('axios');


describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {test:test};

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getRelated('react')).resolves.toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchData('react')).rejects.toThrow(errorMessage);
  });
});

// test("good response", () => {
//   getRelated.mockImplementation(() => Promise.resolve({ data: {test:test} }));
// });

// test("bad response", () => {
//   axios.get.mockImplementation(() => Promise.reject({test:test}));
// });

// describe('test', () => {
//   it('returns the title of the first album', async () => {
//     axios.get.mockResolvedValue({
//       data: [
//         {
//           userId: 1,
//           id: 1,
//           title: 'My First Album'
//         },
//         {
//           userId: 1,
//           id: 2,
//           title: 'Album: The Sequel'
//         }
//       ]
//     });

//     const title = await getRelated();
//     expect(title).toEqual('My First Album');
//   });
// })

// jest.mock('axios', () => {
//   return {
//     __esModule: true,
//     default: jest.fn()
//   }
// });

// describe('Should make api request', ()=>{
//   it('should get data', (done) => {
//     const axios = require('axios');
//     jest.spyOn(axios, 'default').mockResolvedValue({
//       name: 'abc'
//     })
//     const wrapper = shallow(<RelatedProductsList/>, {
//       disableLifecycleMethods: true
//     });
//     wrapper.instance().getRelated();
//     process.nextTick(()=>{
//       expect(wrapper.state('error')).toBeFalsy();
//       expect(wrapper.state().name).toEqual('abc');
//       done();
//     })
//   })
// })