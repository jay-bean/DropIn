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
        <div>Rating: {review.rating}</div>
        <div className="review-comment">Review: {review.comment}</div>
        {sessionUser && sessionUser.id === review.userId && (
          <div>
            <EditReviewFormModal skatepark={review.Skatepark} review={review}/>
            <button className="review-delete-btn" onClick={deleteHandler}>Delete</button>
         </div>
        )}
        <div className="review-buffer"></div>
      </div>}
      </div>
  );
}

export default Review;
