import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Report = () => {
  const [examReports, setExamReports] = useState([]);
  const [userResponse,setUserResponse] = useState([]);

  useEffect(() => {
    // Fetch exam reports from the API
    api.get('exams').then((data) => setExamReports(data));
  }, []);
  useEffect(()=>{
    api.get('answers').then((data)=> setUserResponse(data));
  },[]);

  return (
    <div className='container container-fluid'>
      <h2 className='bg-dark text-white text-center m-1'>Exam Reports</h2>
      {/* <ul>
        {examReports.map((report, index) => (
          <li key={index}>
            <p>Name: {report.name}</p>
            <p>Total Questions: {report.totalQuestions}</p>
            <p>Correct Answers: {report.correctAnswers}</p>
            <p>Percentage: {report.percentage}%</p>
          </li>
        ))}
      </ul> */}
      <div>
        <h3>EXAMLIST</h3>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>Title</th>
            <th>Total Questions</th>
            <th>Total Attendees</th>
            <th>Average Correct Answers</th>
            <th>View All Answers</th>
          </tr>
          </thead>
          <tbody>
            {
              examReports.map(exam=>(
                <tr>
                  <td>{exam.title}</td>
                  <td>{exam.questions.length}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <h3>USER RESPONDS</h3>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Questions</th>
              <th>Total correct answers</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {
              userResponse.map(user=>(
                <tr>
                  <td>{user.name}</td>
                  <td>{user.totalQuestions}</td>
                  <td>{user.correctAnswers}</td>
                  <td>{user.percentage}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
