import { useSelector } from "react-redux";

function Review({ review }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    review &&
      <div>
        <div>{review.rating}</div>
        <div>{review.comment}</div>
        {sessionUser && sessionUser.id === review.userId && (
         <EditReviewForm review={review}/>
        )}
      </div>
  );
}

export default Review;
