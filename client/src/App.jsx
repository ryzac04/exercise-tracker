import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar.jsx';
import ExercisesList from './components/ExercisesList';
import EditExercises from './components/EditExercises';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ExercisesList />} />
        <Route path='/edit/:id' element={<EditExercises />} />
        <Route path='/create' element={<CreateExercise />} />
        <Route path='/user' element={<CreateUser />} />
      </Routes>
    </>
  );
}

export default App