import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Can be re-factored into its own component 
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>edit</Link> | 
      <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  // Fetch exercises when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        setExercises(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(response => {
        console.log(response.data);
      });

    // Update exercises list after deletion
    setExercises(exercises.filter(el => el._id !== id));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(currentExercise => (
            <Exercise 
              exercise={currentExercise} 
              deleteExercise={deleteExercise} 
              key={currentExercise._id} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;