import { useDispatch, useSelector } from "react-redux";
import EditReviewFormModal from "./EditReviewFormModal";
import { removeReview } from '../../store/review';
import './single-review.css';


function Review({ review }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const deleteHandler = async () => {
    await dispatch(removeReview(review));
  }

  return (
    <div>
    {review &&
      <div className="review">
        <div>
          <div className="review-user-info">
            <img src={review.User.picUrl} style={{width: '70px', height: '70px', borderRadius: "50%"}}/>
            <p className="review-user-name">{review.User.firstName} {review.User.lastName}</p>
          </div>
        </div>
        <div className="review-rating">Rating: {review.rating}</div>
        <div className="review-comment">Review: {review.comment}</div>
        {sessionUser && sessionUser.id === review.userId && (
          <div className="single-review-btns-div">
            <EditReviewFormModal skatepark={review.Skatepark} review={review}/>
            <button className="review-delete-btn" onClick={deleteHandler}>Delete</button>
         </div>
        )}
      </div>}
      </div>
  );
}

export default Review;
