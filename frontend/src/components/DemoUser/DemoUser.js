import React, { useState } from 'react';
import  demoUser from './constant';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUser() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [credential, _setCredential] = useState(demoUser.email);
  const [password, _setPassword] = useState(demoUser.password);

  const handleDemoLogin = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <button onClick={handleDemoLogin}>Demo User</button>
      {errors.length ? errors.map((error, index) => (
        <div key={index}>{error}</div>
      )) : null}
    </>
  );
}

export default DemoUser;