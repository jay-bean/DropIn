import { useDispatch, useSelector } from "react-redux";
import EditReviewFormModal from "./EditReviewFormModal";
import { removeReview } from '../../store/review';
import './single-review.css';
import { useEffect } from "react";
import { getUsers } from "../../store/user";


function Review({ review, skatepark }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.users[review.userId]);

  const deleteHandler = async () => {
    await dispatch(removeReview(review));
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
    {review &&
      <div className="review">
        <div>
          {user &&
            <div className="review-user-info">
              <img src={user.picUrl} style={{width: '70px', height: '70px', borderRadius: "50%"}}/>
              <p className="review-user-name">{user.firstName} {user.lastName}</p>
            </div>
          }
        </div>
        <div className="review-rating">Rating: {review.rating}</div>
        <div className="review-comment">Review: {review.comment}</div>
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
