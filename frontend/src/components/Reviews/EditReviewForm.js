import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editReview } from '../../store/review';

function EditReviewForm({ review, setShowModal, skatepark }) {
  const dispatch = useDispatch();
  const skateparkParam = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const [validationErrors, setValidationErrors] = useState([]);
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [comment, setComment] = useState(review ? review.comment : '');

  const handleCancel = () => {
    setValidationErrors([]);
    setRating(0);
    setComment('');
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        rating,
        comment,
        userId: sessionUser.id,
        skateparkId: skateparkParam ? skateparkParam.id : skatepark.id
      }

      const updatedReview = await dispatch(editReview(data, review.id));

      if (updatedReview) {
        setRating('');
        setComment('');
        setValidationErrors([]);
        setShowModal(false);
      }
    }
    catch (error) {
      const err = await error.json();
      setValidationErrors(err.errors);
    }
  }

  return (
    <div>
      <h1>Edit Review Form</h1>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div key={error}>{error}</div>
        })
      )}
      <form
        onSubmit={handleSubmit}
      >
        <label> Rating:</label>
        <input
          type="rating"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label>Comment:</label>
        <textarea
          type="comment"
          placeholder="Tell us about the park..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditReviewForm;
