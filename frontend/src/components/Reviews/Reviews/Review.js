import { useDispatch, useSelector } from "react-redux";
import EditReviewFormModal from "../ReviewForms/EditReviewFormModal";
import { removeReview } from '../../../store/review';
import './single-review.css';
import { useEffect } from "react";
import { getUsers } from "../../../store/user";


function Review({ review, skatepark }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.users[review.userId]);

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      await dispatch(removeReview(review));
    }
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="single-review-container">
    {review &&
      <div className="review">
          {user &&
            <div className="review-user-info">
              { user && user.picUrl ? <img className="users-img" src={user.picUrl} alt='user profile'/> : <img style={{width: '60px', height: '60px', borderRadius: "50%"}} src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/73-730477_first-name-profile-image-placeholder-png.png' alt="profile placeholder"/>}
              <div className="single-review-star-name-container">
                <p className="review-user-name">{user.firstName} {user.lastName}</p>
                <div className="single-review-star-rating-div">
                  {[...Array(5).keys()].map((index) => {
                    index += 1;
                    return (
                      <button
                        id="single-review-star-btns"
                        type="button"
                        key={index}
                        className={index <= review.rating ? "on" : "off"}
                      >
                        <img
                          className='single-review-star-img'
                          src={index <= review.rating ? "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(7).png" : "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(6).png"}
                          alt={index <= review.rating ? "filled star" : "empty star"}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          }
        <div className="review-comment">{review.comment}</div>
        {sessionUser && sessionUser.id === review.userId && (
          <div className="single-review-btns-div">
            <EditReviewFormModal skatepark={skatepark} review={review}/>
            <button className="review-delete-btn" onClick={deleteHandler}>Delete</button>
         </div>
        )}
      </div>}
      </div>
  );
}

export default Review;
