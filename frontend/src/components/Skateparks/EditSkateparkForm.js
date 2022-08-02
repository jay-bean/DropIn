import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSkateparks, editSkatepark } from '../../store/skatepark';

function EditSkateparkForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const skateparkParam = useParams();
  const skatepark = useSelector(state => state.skateparks[skateparkParam.id]);

  const [validationErrors, setValidationErrors] = useState([]);
  const [name, setName] = useState(skatepark ? skatepark.name : '');
  const [description, setDescription] = useState(skatepark ? skatepark.description : '');
  const [address, setAddress] = useState(skatepark ? skatepark.address : '');
  const [city, setCity] = useState(skatepark ? skatepark.city : '');
  const [state, setState] = useState(skatepark ? skatepark.state : '');
  const [zipcode, setZipcode] = useState(skatepark ? skatepark.zipcode : 0);
  const [images, setImages] = useState({});

  useEffect(() => {
    dispatch(getSkateparks())
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

      for(const image of Object.keys(images)) {
        formData.append('image', images[image]);
      }
      const updatedSkatepark = await dispatch(editSkatepark(formData, skatepark.id));
      if (updatedSkatepark) {
        window.alert('edited park!');
        // history.push(`/skateparks/${newSkatepark.id}`)
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
      <h1>Skatepark Form</h1>
      {validationErrors.length > 0 && (
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
      </form>
    </div>
  );
}

export default EditSkateparkForm;