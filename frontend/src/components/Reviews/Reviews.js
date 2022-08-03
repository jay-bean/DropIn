import Review from './Review';
import ReviewForm from './ReviewForm';

function AllReviews({ skatepark, reviews }) {

  let reviewsArr;
  if (reviews) {
    reviewsArr = Object.values(reviews);
  }
  let filteredReviews;
  if (reviewsArr.length > 0 && skatepark) filteredReviews = reviewsArr.filter(review => review.skateparkId === skatepark.id);

  return (
    <>
      <div>
        <p>Leave a review</p>
        <ReviewForm/>
      </div>
      {skatepark && filteredReviews && filteredReviews.length > 0 && filteredReviews.map(review => <Review key={review.id} review={review}/>)}
    </>
  );
}

export default AllReviews;
