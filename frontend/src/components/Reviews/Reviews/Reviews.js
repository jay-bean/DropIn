import Review from './Review';
import NewReviewFormModal from '../ReviewForms/NewReviewFormModal';
import './single-review.css';

function AllReviews({ skatepark, reviews }) {

  let reviewsArr;
  if (reviews) {
    reviewsArr = Object.values(reviews).reverse();
  }
  let filteredReviews;
  if (reviewsArr.length > 0 && skatepark) filteredReviews = reviewsArr.filter(review => review.skateparkId === skatepark.id);

  let count = 0;
  let average;
  if (filteredReviews) {
    filteredReviews.forEach(review => count += review.rating);
    average = Math.round(count / filteredReviews.length);
  }

  return (
    <div className='all-reviews-div'>
      <div className='review-form-container'>
          {skatepark &&
            <div className='reviews-container'>
              <p className='skatepark-review-name'>{skatepark.name}'s Reviews</p>
              <div>
                {filteredReviews && filteredReviews.length ?
                  <div className='average-star-container'>
                    <div className="average-star-rating-div">
                      {[...Array(5).keys()].map((index) => {
                        index += 1;
                        return (
                          <button
                            id='average-star-btns'
                            type="button"
                            key={index}
                            className={index <= average ? "on" : "off"}
                          >
                            <img
                              className='average-star-img'
                              src={index <= average ? "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(7).png" : "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(6).png"}
                              alt={index <= average ? "filled star" : "empty star"}
                            />
                          </button>
                        );
                      })} {filteredReviews.length === 1 ? <p className='average-star-p'>{filteredReviews.length} Review</p> : <p className='average-star-p'>{filteredReviews.length} Reviews</p>}
                    </div>
                  </div> : <p className='average-star-p'>This park currently doesn't have any reviews.</p>}
              </div>
            </div>
          }
        <div className='reviews-container'>
          {skatepark && <NewReviewFormModal skatepark={skatepark}/>}
        </div>

      </div>
      <div className='all-reviews-container'>
        {skatepark && filteredReviews && filteredReviews.length > 0 && filteredReviews.map(review => <Review key={review.id} review={review} skatepark={skatepark}/>)}
      </div>
    </div>
  );
}

export default AllReviews;
