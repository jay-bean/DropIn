import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSkatepark } from '../../store/skatepark';
import { getTags } from '../../store/tag';
import TagSelect from './TagSelect';

function NewSkateparkForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tags = useSelector(state => state.tags);
  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState(0);
  const [images, setImages] = useState({});
  const [selectedTag, setSelectedTag] = useState([])

  let tagsArr;
  if (tags) {
    tagsArr = Object.values(tags);
  }

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch])

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
      const newSkatepark = await dispatch(addSkatepark(formData));
      if (newSkatepark) {
        history.push(`/skateparks/${newSkatepark.id}`)
      }

      
    }
    catch (error) {
      const err = await error.json();
      setValidationErrors(err.errors);
    }
  }

  return (
    <div>
      <h1>Skatepark Form</h1>
      {validationErrors && validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div key={error}>{error}</div>
        })
      )}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label> Name of Park:</label>
        <input
          type="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          rows="4"
          cols="30"
          type="description"
          placeholder="Tell us about the park..."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Address:</label>
        <input
          type="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>City:</label>
        <input
          type="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>State:</label>
        <input
          type="state"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <label>Zipcode:</label>
        <input
          type="zipcode"
          required
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        <div>
          <i className="fa-solid fa-images"> Upload Images</i>
          <input
            type="file"
            multiple
            name="file"
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
        <TagSelect selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
      </form>
    </div>
  );
}

export default NewSkateparkForm;
