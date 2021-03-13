import React from 'react';
import axios from 'axios';
import { rest } from 'msw';

/////////// GET REQUESTS //////////////

test('gets all products', async () => {
  await axios.get('/api')
    .then((data) => {return data})
})

test('gets related products', async () => {
  await axios.get(`/api/12345`)
    .then((data) => {return data})
})

test('gets product info', async () => {
  await axios.get(`/api/products/12345`)
    .then((data) => {return data})
})

test('gets product styles', async () => {
  await axios.get(`/api/styles/12345`)
    .then((data) => {return data})
})

test('gets product reviews by id', async () => {
  await axios.get(`/api/reviews/12345`)
    .then((data) => {return data})
})

test('gets product review meta data by id', async () => {
  await axios.get(`/api/reviews/meta/12345`)
    .then((data) => {return data})
})

test('gets all products from cart', async () => {
  await axios.get(`/api/cart`)
    .then((data) => {return data})
})

test('gets all questions for a product', async () => {
  await axios.get(`/api/qa/questions/12345`)
    .then((data) => {return data})
})

test('gets all answers for a product', async () => {
  await axios.get(`/api/qa/questions/12345/answers`)
    .then((data) => {return data})
})

/////////// POST REQUESTS //////////////

test('posts to cart', async () => {
  await axios.post('/api/cart')
    .then((data) => {return data})
})

test('posts to reviews', async () => {
  await axios.post('/api/reviews')
    .then((data) => {return data})
})

test('posts to questions', async () => {
  await axios.post('/api/qa/questions/12345')
    .then((data) => {return data})
})

test('posts to answers', async () => {
  await axios.post('/api/qa/questions/12345/answers')
    .then((data) => {return data})
})

/////////// PUT REQUESTS //////////////

test('puts record in reivews that the review was helpful', async () => {
  await axios.put('/api/reviews/12345/helpful')
    .then((data) => {return data})
})

test('reports an answer', async () => {
  await axios.put('/api/qa/answers/12345/report')
    .then((data) => {return data})
})

test('votes answer helpful', async () => {
  await axios.put('/api/qa/answers/12345/helpful')
    .then((data) => {return data})
})

test('votes question helpful', async () => {
  await axios.put('/api/qa/answers/12345/report')
    .then((data) => {return data})
})

test('reports an answer', async () => {
  await axios.put('/api/qa/answers/12345/report')
    .then((data) => {return data})
})

test('reports a question', async () => {
  await axios.put('/api/qa/questions/12345/report')
    .then((data) => {return data})
})