import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css"; 

const App = () => {
  return (
    <Routes>
      <Navbar />
      <br />
      <Route path='/' element={<ExercisesList />} />
      <Route path='/edit/:id' element={<EditExercise />} />
      <Route path='/create' element={<CreateExercise />} />
      <Route path='/user' element={<CreateUser />} />
    </Routes>
  );
}

export default App