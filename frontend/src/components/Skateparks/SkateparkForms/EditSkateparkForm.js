import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getParktags } from '../../../store/parktag';
import { getSkateparks, editSkatepark } from '../../../store/skatepark';
import TagSelect from '../ParkTags/TagSelect';
import './skateparkform.css';

function EditSkateparkForm({ setDidUpdate, setShowEditForm }) {
  const dispatch = useDispatch();
  const skateparkParam = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const skatepark = useSelector(state => state.skateparks[skateparkParam.id]);
  const parktags = useSelector(state => state.parktags);

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(skatepark ? skatepark.name : '');
  const [description, setDescription] = useState(skatepark ? skatepark.description : '');
  const [address, setAddress] = useState(skatepark ? skatepark.address : '');
  const [city, setCity] = useState(skatepark ? skatepark.city : '');
  const [state, setState] = useState(skatepark ? skatepark.state : '');
  const [zipcode, setZipcode] = useState(skatepark ? skatepark.zipcode : '');
  const [oldImages, setOldImages] = useState(skatepark ? skatepark.images : []);
  const [images, setImages] = useState({});

  let skateparkTags;
  if (parktags && skatepark) {
    skateparkTags = Object.values(parktags).filter(parktag => parktag.skateparkId === skatepark.id)
  }
  const tagIdArr = [];
  if (skateparkTags) {
    skateparkTags.map(tag => tagIdArr.push(tag.tagId));
  }

  const [selectedTag, setSelectedTag] = useState(tagIdArr.length ? tagIdArr : '');

  useEffect(() => {
    dispatch(getSkateparks());
    dispatch(getParktags());
  }, [dispatch])

  const handleCancel = () => {
    setValidationErrors([]);
    setShowEditForm(false)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (oldImages.length > 10 || images.length > 10 || oldImages.length + images.length > 10) return setValidationErrors(['Only ten photos allowed.']);
      if (oldImages.length === 0 && Object.values(images).length === 0) return setValidationErrors(['Please upload at least one photo.']);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zipcode', zipcode);
      formData.append('userId', sessionUser.id);

      for (const oldImage of oldImages) {
        formData.append('oldImage', oldImage.id)
      }

      for (const image of Object.keys(images)) {
        formData.append('image', images[image]);
      }
      for (const tag of selectedTag) {
        formData.append('tag', tag)
      }
      const updatedSkatepark = await dispatch(editSkatepark(formData, skatepark.id));
      if (updatedSkatepark) {
        setDidUpdate(true);
        setShowEditForm(false);
      }
    }
    catch (error) {
      if (error.status === 503) return setValidationErrors(['Only .png, .jpg and .jpeg format allowed.']);
      if (error.status >= 500) return setValidationErrors([err.message])
      const err = await error.json();
      if (err.message && err.wrongFormat) return setValidationErrors([err.message]);
      if (err.errors && err.errors.length > 0) return setValidationErrors(err.errors);
    }
  }

  let imagesArr;
  if (images && images.length) {
    imagesArr = Object.values(images);
  }

  const removeNewSelectedImage = (e, index) => {
    e.preventDefault();
    imagesArr.splice(index, 1);
    setImages(imagesArr)
  };

  let oldImagesArr;
  if (oldImages && oldImages.length) {
    oldImagesArr = Object.values(oldImages);
  }

  const removeOldSelectedImage = (e, index) => {
    e.preventDefault();
    oldImagesArr.splice(index, 1);
    setOldImages(oldImagesArr);
  };

  return (
    sessionUser ?
    <div>
      <div className='skatepark-form-buffer'></div>
        <div className='skatepark-form-page'>
          <div className='skatepark-form-div'>
            <h1 className='skatepark-form-h1'>Skatepark Form</h1>
            <form
              className='skatepark-form'
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              >
            <div className='skatepark-form-required'>
              <label className='park-name'>*Name of Park:</label>
              <p className='skatepark-form-p all-required'>* all fields are required</p>
            </div>
              <input
                className='skatepark-form-input'
                type="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              <label className='skatepark-form-label'>*Address:</label>
              <input
                className='skatepark-form-input'
                type="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
              <div className='skatepark-form-location'>
                <label className='skatepark-form-label'>*City:</label>
                <input
                  className='skatepark-form-input'
                  type="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  />

                <label className='skatepark-form-label'>*State:</label>
                <input
                  className='skatepark-form-input'
                  type="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  />

                <label className='skatepark-form-label'>*Zipcode:</label>
                <input
                  className='skatepark-form-input'
                  type="zipcode"
                  required
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  />
              </div>
              <p className='skatepark-form-p drop-down-choose'>From the drop down below choose at least one feature to describe the park.</p>
              {tagIdArr && <TagSelect tagIdArr={tagIdArr} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>}
              <label className='skatepark-form-label'>*Description:</label>
              <textarea
                className='description-input'
                rows="4"
                cols="30"
                type="description"
                placeholder="Tell us about the park..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
              <label className='skatepark-form-img-div'>
                <i className="fa-solid fa-images image-input img-input"> <p className='img-upload-p'>Upload Images</p></i>
                <input
                  type="file"
                  multiple
                  name="file"
                  onChange={(e) => setImages(e.target.files)}
                />
                <p className='skatepark-form-p'>photo upload optional (1-10)</p>
              </label>
              {images && images.length ? (
                <div className="thumbnail-container">
                  {imagesArr.map((image, index) => {
                    return (
                      <div key={index} className='thumbnail-divs'>
                        <button type='button' className='thumbnail-remove-btn' onClick={(e) => removeNewSelectedImage(e, index)}>
                          X
                        </button>
                        <img
                          style={{maxWidth: "100%", maxHeight: '320px' }}
                          src={URL.createObjectURL(image)}
                          alt='thumbnail'
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {oldImages && oldImages.length ? (
                <div className="thumbnail-container">
                  {oldImagesArr.map((image, index) => {
                    return (
                      <div key={index} className='thumbnail-divs'>
                        <button className='thumbnail-remove-btn' onClick={(e) => removeOldSelectedImage(e, index)}>
                          X
                        </button>
                        <img
                          style={{maxWidth: "100%", maxHeight: '320px' }}
                          src={image.url}
                          alt='thumbnail'
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {validationErrors && validationErrors.length > 0 && (
                validationErrors.map(error => {
                  return <div className='signup-errors sp-errors' key={error}>{error}</div>
                })
              )}
              <div className='skatepark-form-btn-div'>
                <button className='skatepark-form-submit' type="submit">Submit</button>
                <button className='skatepark-form-cancel' type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    </div> : <Redirect to="/" />
  );
}

export default EditSkateparkForm;
