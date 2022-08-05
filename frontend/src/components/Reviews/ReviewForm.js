import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addReview } from '../../store/review';

function NewSkateparkForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const skateparkParam = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const [validationErrors, setValidationErrors] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // const handleCancel = () => {
  //   setValidationErrors([]);
  //   setRating(0);
  //   setComment('');
  //   history.push("/")
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        rating,
        comment,
        userId: sessionUser.id,
        skateparkId: skateparkParam.id
      }

      const newReview = await dispatch(addReview(data));

      if (newReview) {
        setRating('');
        setComment('');
        setValidationErrors([]);
      }
    }
    catch (error) {
      const err = await error.json();
      if (error.status >= 500) setValidationErrors([err.message])
      else setValidationErrors(err.errors);
    }
  }

  return (
    <div>
    <h1>New Review Form</h1>
    {validationErrors.length > 0 && (
      validationErrors.map(error => {
        return <div key={error}>{error}</div>
      })
    )}
    <form
      onSubmit={handleSubmit}
    >
      <label>*Rating:</label>
      <input
        type="rating"
        required
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <label>*Comment:</label>
      <textarea
        type="comment"
        placeholder="Tell us about the park..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div>
        <button type="submit">Submit</button>
        {/* <button type="button" onClick={handleCancel}>Cancel</button> */}
      </div>
    </form>
  </div>
  );
}

export default NewSkateparkForm;
