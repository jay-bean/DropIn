import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Review from './Review';
import ReviewForm from './ReviewForm';
import { getReviews } from '../../store/review';

function AllReviews({ skatepark }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews);

  let reviewsArr = Object.values(reviews).filter(review => review.skateparkId === skatepark.id)
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <>
      <div>
        <p>Leave a review</p>
        <ReviewForm/>
      </div>
      {skatepark && reviewsArr && reviewsArr.map(review => <Review key={review.id} review={review}/>)}
    </>
  );
}

export default AllReviews;
