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
    <div className='new-review-form-container'>
      <div className='new-review-cancelbtn-div'>
        <button className='new-review-cancel-btn' type="button" onClick={handleCancel}>X</button>
      </div>
      <form
        className='new-review-form'
        onSubmit={handleSubmit}
        >
        {skatepark && <div className='new-review-skatepark-name'>{skatepark.name}</div>}
        <label className='new-review-label'>* Rating:</label>
        <input
          className='new-review-input'
          type="rating"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          />

        <label className='new-review-label'>* Comment:</label>
        <textarea
          rows={8}
          className='new-review-input'
          type="comment"
          placeholder="Tell us about the park..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
        {validationErrors.length > 0 && (
          validationErrors.map(error => {
            return <div className='review-errors' key={error}>{error}</div>
          })
        )}
        <div className='new-review-submit-div'>
          <button className='new-review-submit' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditReviewForm;
