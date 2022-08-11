import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getParktags } from '../../store/parktag';
import { getSkateparks, editSkatepark } from '../../store/skatepark';
import TagSelect from './TagSelect';
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
  const [zipcode, setZipcode] = useState(skatepark ? skatepark.zipcode : 0);
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

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zipcode', zipcode);
      formData.append('userId', sessionUser.id);

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
      console.log(error);
      if (error.status === 503) return setValidationErrors(['Only .png, .jpg and .jpeg format allowed.']);
      if (error.status >= 500) return setValidationErrors([err.message])
      const err = await error.json();
      console.log(err)
      // else setValidationErrors(err.errors);{
      if (err.message && err.wrongFormat) return setValidationErrors([err.message]);
      if (err.errors && err.errors.length > 0) return setValidationErrors(err.errors);
    }
  }

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
              <label className='skatepark-form-label'>*Name of Park:</label>
              <p className='skatepark-form-p'>* all fields are required</p>
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
              <p className='skatepark-form-p'>From the drop down below choose at least one feature to describe the park.</p>
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
                <input
                  className='image-input'
                  type="file"
                  multiple
                  name="file"
                  onChange={(e) => setImages(e.target.files)}
                />
                <p className='skatepark-form-p'>photo upload optional (1-10)</p>
              </label>
              {validationErrors && validationErrors.length > 0 && (
                validationErrors.map(error => {
                  return <div className='signup-errors' key={error}>{error}</div>
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
