import { useSelector } from "react-redux";
import EditReviewForm from "./EditReviewForm";

function Review({ review }) {
  const sessionUser = useSelector(state => state.session.user);
  console.log(review, 'inside single review')
  return (
    <div>
    {review &&
      <div>
        <div>{review.rating}</div>
        <div>{review.comment}</div>
        {sessionUser && sessionUser.id === review.userId && (
         <EditReviewForm review={review}/>
        )}
      </div>}
      </div>
  );
}

export default Review;
