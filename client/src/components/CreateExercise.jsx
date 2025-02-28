import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        console.log("API Response:", response.data.data);
        if (response.data.data.length > 0) {
          setUsers(response.data.data.map(user => user.username));
          setUsername(response.data.data[0].username);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      description,
      duration,
      date
    };

    axios
      .post("http://localhost:5000/exercises/", data)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <h3>Create New Exercise</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <select
            required
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {
              users.map((user) => (
                // console.log("user", user.username)
                
                  <option
                    key={user}
                    value={user}
                  >
                    {user}
                  </option>
              ))
            }
          </select>
        </div>
        <div className='form-group'>
          <label>Description:</label>
          <input
            required
            type='text'
            className='form-control'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes):</label>
          <input
            required
            type='number'
            className='form-control'
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <div className='form-group'>
          <label>Date:</label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Create Exercise Log
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateExercise