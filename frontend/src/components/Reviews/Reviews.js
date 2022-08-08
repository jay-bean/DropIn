import Review from './Review';
import NewReviewFormModal from './NewReviewFormModal';

function AllReviews({ skatepark, reviews }) {

  let reviewsArr;
  if (reviews) {
    reviewsArr = Object.values(reviews);
  }
  let filteredReviews;
  if (reviewsArr.length > 0 && skatepark) filteredReviews = reviewsArr.filter(review => review.skateparkId === skatepark.id);

  let count = 0;
  let average;
  if (filteredReviews) {
    filteredReviews.forEach(review => count += review.rating);
    average = count / filteredReviews.length;
  }

  return (
    <div className='all-reviews-div'>
      <div>
        <div>
          {skatepark &&
            <div>
              <p className='skatepark-review-name'>{skatepark.name}'s Reviews</p>
              <div>
                {filteredReviews && filteredReviews.length ? <p className='skatepark-average-rating'>Average rating: {average}</p> : null}
              </div>
            </div>
          }
        </div>
        <div>
          {skatepark && <NewReviewFormModal skatepark={skatepark}/>}
        </div>

      </div>
      <div className='all-reviews-flex'>
        {skatepark && filteredReviews && filteredReviews.length > 0 && filteredReviews.map(review => <Review key={review.id} review={review} skatepark={skatepark}/>)}
      </div>
    </div>
  );
}

export default AllReviews;
