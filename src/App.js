import React from 'react';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';
import ExamList from './components/ExamList';
import AddExam from './components/AddExam';
import AttendExam from './components/AttendExam';
import Report from './components/Report';
import EditExam from './components/EditExam';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExamList />} />
          <Route path="/add-exam" element={<AddExam />} />
          <Route path="/attend-exam/:id" element={<AttendExam />} />
          <Route path="/report" element={<Report />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
        </Routes>
      </BrowserRouter>
    </>
    
  );
};

export default App;
