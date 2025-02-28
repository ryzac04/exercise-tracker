import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const { id } = useParams();  // Get exercise ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercise details to populate form
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        console.log("Response Object:", response.data); 
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(error => console.log(error));

    // Fetch users for the dropdown
    axios.get('http://localhost:5000/users')
      .then(response => {
        if (response.data.data.length > 0) {
          setUsers(response.data.data.map(user => user.username));
        }
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExercise = {
      username,
      description,
      duration,
      date,
    };

    // Send updated exercise data
    axios.put(`http://localhost:5000/exercises/${id}`, updatedExercise)
      .then(() => navigate('/'))  // Redirect to home on success
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <select
            required
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
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
          <br />
          <DatePicker className='form-control mt-2 mb-2' selected={date} onChange={(date) => setDate(date)} />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Edit Exercise Log
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditExercise;

