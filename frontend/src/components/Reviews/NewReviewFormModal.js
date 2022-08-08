import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewReviewForm from './NewReviewForm';
import './new-review.css';

function NewReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='review-create-btn' onClick={() => setShowModal(true)}>Write Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewReviewForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewReviewFormModal;
