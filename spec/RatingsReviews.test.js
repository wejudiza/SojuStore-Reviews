import React from 'react';
import { shallow } from 'enzyme';

// Import Components
import App from '../client/src/components/App.jsx';
import AddReview from '../client/src/components/RatingsReviews/AddReview';
import AddReviewImgUpload from '../client/src/components/RatingsReviews/AddReviewImgUpload';
import AddReviewRadio from '../client/src/components/RatingsReviews/AddReviewRadio';
import AddReviewSubmit from '../client/src/components/RatingsReviews/AddReviewSubmit';
import AddReviewText from '../client/src/components/RatingsReviews/AddReviewText';
import ProductBreakdown from '../client/src/components/RatingsReviews/ProductBreakdown';
import ProductBreakdownBar from '../client/src/components/RatingsReviews/RatingBreakdownBar';
import RatingBreakdown from '../client/src/components/RatingsReviews/RatingBreakdown';
import RatingBreakdownBar from '../client/src/components/RatingsReviews/RatingBreakdownBar';
import RatingStars from '../client/src/components/RatingsReviews/RatingStars';
import ReviewTile from '../client/src/components/RatingsReviews/ReviewTile';
import ReviewTileHelpful from '../client/src/components/RatingsReviews/ReviewTileHelpful';
import ReviewTilePhoto from '../client/src/components/RatingsReviews/ReviewTile';
import SortSelect from '../client/src/components/RatingsReviews/SortSelect';
import RatingsReviews from '../client/src/components/RatingsReviews/RatingsReviews';
import Search from'../client/src/components/RatingsReviews/Search';

describe('Ratings & Reviews', () => {
  it('SortSelect renders successfully', () => {
    const wrapper = shallow(<SortSelect />);
    expect(wrapper.exists()).toBe(true);
  });
  it('Search renders successfully', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.exists()).toBe(true);
  });
  it('AddReview renders successfully', () => {
    const wrapper = shallow(<AddReview />);
    expect(wrapper.exists()).toBe(true);
  });
  it('AddReviewImgUpload renders successfully', () => {
    const wrapper = shallow(<AddReviewImgUpload />);
    expect(wrapper.exists()).toBe(true);
  });
  it('AddReviewRadio renders successfully', () => {
    const wrapper = shallow(<AddReviewRadio />);
    expect(wrapper.exists()).toBe(true);
  });
  it('AddReviewSubmit renders successfully', () => {
    const wrapper = shallow(<AddReviewSubmit />);
    expect(wrapper.exists()).toBe(true);
  });
  it('AddReviewText renders successfully', () => {
    const wrapper = shallow(<AddReviewText />);
    expect(wrapper.exists()).toBe(true);
  });
  it('ProductBreakdown renders successfully', () => {
    const wrapper = shallow(<ProductBreakdown />);
    expect(wrapper.exists()).toBe(true);
  });
  it('ProductBreakdownBar renders successfully', () => {
    const wrapper = shallow(<ProductBreakdownBar />);
    expect(wrapper.exists()).toBe(true);
  });
  it('RatingBreakdown renders successfully', () => {
    const wrapper = shallow(<RatingBreakdown />);
    expect(wrapper.exists()).toBe(true);
  });
  it('RatingBreakdownBar renders successfully', () => {
    const wrapper = shallow(<RatingBreakdownBar />);
    expect(wrapper.exists()).toBe(true);
  });
  it('RatingsReviews renders successfully', () => {
    const wrapper = shallow(<RatingsReviews />);
    expect(wrapper.exists()).toBe(true);
  });
  it('RatingStars renders successfully', () => {
    const wrapper = shallow(<RatingStars />);
    expect(wrapper.exists()).toBe(true);
  });
  it('ReviewTile renders successfully', () => {
    const wrapper = shallow(<ReviewTile />);
    expect(wrapper.exists()).toBe(true);
  });
  it('ReviewTileHelpful renders successfully', () => {
    const wrapper = shallow(<ReviewTileHelpful />);
    expect(wrapper.exists()).toBe(true);
  });
  it('ReviewTilePhoto renders successfully', () => {
    const wrapper = shallow(<ReviewTilePhoto />);
    expect(wrapper.exists()).toBe(true);
  });
});

// describe('RatingsReviews', () => {
//   it('RatingsReviews renders successfully', () => {
//     const wrapper = shallow(<RatingsReviews />);
//     expect(wrapper.exists()).toBe(true);
//   });
// });

// describe('RatingBreakdown', () => {
//   it('RatingBreakdown renders successfully', () => {
//     const wrapper = shallow(<RatingsReviews />);
//     expect(wrapper.contains(<RatingBreakdown />)).toBe(true);
//   });
// });
