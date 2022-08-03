import { useSelector } from "react-redux";

function EditReviewForm({ review }) {
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
