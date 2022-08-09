import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';

function EditReviewFormModal({ review, skatepark }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button className='review-edit-btn' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm skatepark={skatepark} review={review} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewFormModal;
