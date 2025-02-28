import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const user = { username };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    axios
      .post("http://localhost:5000/users", user)
      .catch((error) => console.log(error));
    
    setUsername(''); 
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <input
            required
            type='text'
            className='form-control'
            value={username}
            onChange={(e) => (setUsername(e.target.value))}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary mt-2' type='submit'>Create New User</button>
        </div>
      </form>
    </div>
  )
}

export default CreateUser