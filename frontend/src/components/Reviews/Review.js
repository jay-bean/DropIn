import { useDispatch, useSelector } from "react-redux";
import EditReviewFormModal from "./EditReviewFormModal";
import { removeReview } from '../../store/review';

function Review({ review }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const deleteHandler = async () => {
    await dispatch(removeReview(review));
  }

  return (
    <div>
    {review &&
      <div>
        <div>{review.rating}</div>
        <div>{review.comment}</div>
        {sessionUser && sessionUser.id === review.userId && (
          <div>
            <EditReviewFormModal review={review}/>
            <button onClick={deleteHandler}>Delete</button>
         </div>
        )}
      </div>}
      </div>
  );
}

export default Review;
