import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from '../../../context/Modal';
import NewReviewForm from './NewReviewForm';
import './new-review.css';

function NewReviewFormModal({ skatepark }) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>

      {sessionUser ? <button className='review-create-btn' onClick={() => setShowModal(true)}>Write Review</button> : <Link className='review-link-login' to='/login'><button className='review-create-btn' onClick={() => setShowModal(true)}>Write Review</button></Link>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewReviewForm skatepark={skatepark} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewReviewFormModal;
