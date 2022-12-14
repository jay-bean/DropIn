import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { editReview } from '../../../store/review';

function EditReviewForm({ review, setShowModal, skatepark }) {
  const dispatch = useDispatch();
  const skateparkParam = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const [validationErrors, setValidationErrors] = useState([]);
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [hover, setHover] = useState(review ? review.rating : 0);
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
    sessionUser ?
    <div className='new-review-form-container'>
      <div className='new-review-cancelbtn-div'>
        <button className='new-review-cancel-btn' type="button" onClick={handleCancel}><img className='new-review-cancel-img' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/close.png' alt='x'/></button>
      </div>
      <form
        className='new-review-form'
        onSubmit={handleSubmit}
        >
        {skatepark && <div className='new-review-skatepark-name'>{skatepark.name}</div>}
        <label className='new-review-label'>* Rating:</label>
        <div className="star-rating-div">
          {[...Array(5).keys()].map((index) => {
            index += 1;
            return (
              <button
                style={{backgroundColor: 'transparent', border: 'none', width: '40px', height: '40px'}}
                type="button"
                key={index}
                className={index <= rating || hover ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseOver={() => setHover(index)}
                onMouseOut={() => setHover(rating)}
              >
                <img
                  className='star-img'
                  src={index <= hover ? "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(7).png" : "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(6).png"}
                  alt={index <= rating || hover ? "filled star" : "empty star"}
                />
              </button>
            );
          })}
        </div>
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
    </div> : <Redirect to="/" />
  );
}

export default EditReviewForm;
