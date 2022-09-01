import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../store/review";
import './average-rating.css';

function AverageRating({ skatepark }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews);

  let reviewsArr;
  if (reviews) {
    reviewsArr = Object.values(reviews).filter(review => review.skateparkId === skatepark.id)
  }

  let count = 0;
  let average;
  if (reviewsArr) {
    reviewsArr.forEach(review => count += review.rating);
    average = Math.round(count / reviewsArr.length);
  }

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch])

  return (
    <div className="single-park-star-container">
      {reviewsArr && reviewsArr.length ?
        <div className='single-park-star-name-container'>
          <div className="single-park-average-star-rating-div">
            {/* <div className=""> */}
              {[...Array(5).keys()].map((index) => {
                index += 1;
                return (
                  <button
                    id='single-park-star-btns'
                    type="button"
                    key={index}
                    className={index <= average ? "on" : "off"}
                  >
                    <img
                      className='single-park-star-img'
                      src={index <= average ? "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(7).png" : "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(6).png"}
                      alt={index <= average ? "filled star" : "empty star"}
                    />
                  </button>
                );
              })}
            {/* </div> */}
            {reviewsArr.length === 1 ? <p className='average-star-park-p'>({reviewsArr.length})</p> : <p className='average-star-park-p'>({reviewsArr.length})</p>}
          </div>
        </div> : null}
    </div>
  );
}

export default AverageRating;
