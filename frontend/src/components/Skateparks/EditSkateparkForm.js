import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getParktags } from '../../store/parktag';
import { getSkateparks, editSkatepark } from '../../store/skatepark';
import TagSelect from './TagSelect';
import './skateparkform.css';

function EditSkateparkForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const skateparkParam = useParams();
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
  const [selectedTag, setSelectedTag] = useState([]);

  let skateparkTags;
  if (parktags && skatepark) {
    skateparkTags = Object.values(parktags).filter(parktag => parktag.skateparkId === skatepark.id)
  }
  const tagIdArr = [];
  if (skateparkTags) {
    skateparkTags.map(tag => tagIdArr.push(tag.tagId));
  }

  useEffect(() => {
    dispatch(getSkateparks());
    dispatch(getParktags());
  }, [dispatch])

  const handleCancel = () => {
    setValidationErrors([]);
    history.push(`/skateparks/${skatepark.id}`)
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
        history.push(`/skateparks/${updatedSkatepark.id}`)
      }
    }
    catch (error) {
      const err = await error.json();
      if (error.status >= 500) setValidationErrors([err.message])
      else setValidationErrors(err);
    }
  }

  return (
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
                <i className="fa-solid fa-images"> Upload Images</i>
                <p className='skatepark-form-p'>photo upload optional</p>
                <input
                  className='image-input'
                  type="file"
                  multiple
                  name="file"
                  onChange={(e) => setImages(e.target.files)}
                  />
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
    </div>
  );
}

export default EditSkateparkForm;
