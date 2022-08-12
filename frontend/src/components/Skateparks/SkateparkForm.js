import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { addSkatepark } from '../../store/skatepark';
import TagSelect from './TagSelect';
import './skateparkform.css';

function NewSkateparkForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState(0);
  const [images, setImages] = useState({});
  const [selectedTag, setSelectedTag] = useState([])

  const handleCancel = () => {
    setValidationErrors([]);
    history.push("/")
  };

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
      const newSkatepark = await dispatch(addSkatepark(formData));
      if (newSkatepark) {
        history.push(`/skateparks/${newSkatepark.id}`)
      }
    }
    catch (error) {
      if (error.status === 503) return setValidationErrors(['Only .png, .jpg and .jpeg format allowed.']);
      const err = await error.json();
      if (error.status >= 500) return setValidationErrors([err.message])
      // else setValidationErrors(err.errors);{
      if (err.errors && err.errors.length > 0) return setValidationErrors(err.errors);
      if (err.message && err.wrongFormat) return setValidationErrors([err.message]);
      };
  }

  return (
    sessionUser ?
    <>
      <div className='skatepark-form-buffer'></div>
      <div className='skatepark-form-page'>
        <div className='skatepark-form-div'>
          <h1 className='skatepark-form-h1'>New Skatepark Form</h1>
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
            <TagSelect selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
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
              {/* <i className="fa-solid fa-images"> Upload Images</i> */}
              <input
                className="image-input"
                required
                type="file"
                multiple
                name="file"
                onChange={(e) => setImages(e.target.files)}
                />
              <p className='skatepark-form-p photo-amount'>*Please upload at least one photo. Currently photos can only be added now, and they can't be deleted once added. (1-10)</p>
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
    </> : <Redirect to="/" />
  );
}

export default NewSkateparkForm;
