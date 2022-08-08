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
    <div className='all-reviews-div'>
      <div>
        <p>Leave a review</p>
        <div>
          <ReviewForm/>
        </div>
      </div>
      <div className='all-reviews-flex'>
        {skatepark && filteredReviews && filteredReviews.length > 0 && filteredReviews.map(review => <Review key={review.id} review={review}/>)}
      </div>
    </div>
  );
}

export default AllReviews;
