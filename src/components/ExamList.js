import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exam list from the API
    
    api.get('exams').then((data) => setExams(data));
  }, []);

  const deleteExam = (id) => {
    // Delete the exam from the API
    api.post('exams/delete', { id }).then(() => {
      setExams((prevExams) => prevExams.filter((exam) => exam.id !== id));
    });
  };

  return (
    <div className='container container-fluid mt-1 text-center'>
      <h2 className='bg-dark text-white'>Exam List</h2>
      <ul className='list-unstyled'>
        {exams.map((exam) => (
          <li key={exam.id} className='m-2'>
            {exam.title} -{' '}
            <Link to={`/attend-exam/${exam.id}`} className='btn btn-primary'>Attend</Link> {' '}
            <Link to={`/edit-exam/${exam.id}`} className='btn btn-warning'>Edit</Link> {' '}
            <button onClick={() => deleteExam(exam.id)} className='btn btn-danger'>Delete</button> <br/>
          </li>
        ))}
      </ul>
      <Link  to="/add-exam" className='btn btn-success'>Add Exam</Link>
    </div>
  );
};

export default ExamList;
