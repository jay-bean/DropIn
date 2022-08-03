import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Review from './Review';
import ReviewForm from './ReviewForm';
import { getReviews } from '../../store/review';

function AllReviews({ skatepark }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews);
  console.log(reviews)
  let reviewsArray;
  let reviewsArr;
  if (reviews) {
    reviewsArray = Object.values(reviews)
    reviewsArr = reviewsArray.filter(review => review.skateparkId === skatepark.id)
  }
  console.log(reviewsArr)
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <>
      <div>
        <p>Leave a review</p>
        <ReviewForm/>
      </div>
      {skatepark && reviewsArr.length > 0 && reviewsArr.map(review => <Review key={review.id} review={review}/>)}
    </>
  );
}

export default AllReviews;
