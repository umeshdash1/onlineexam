import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AttendExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    dob: '',
  });
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch exam details from the API based on the URL parameter
    api.get(`exams/${id}`).then((data) => setExam(data));
  }, [id]);

  const selectAnswer = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const submitUserData = () => {
    setCurrentStep(2);
  };

  const saveAndNext = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < Object.keys(exam.questions).length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setCurrentStep(3);
    }
  };

  const finalSubmit = () => {
    // Calculate and save exam results to the API
    const totalQuestions = Object.keys(exam.questions).length;
    const correctAnswers = Object.keys(answers).filter(
      (index) => exam.questions[index].answer === answers[index]
    ).length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    const resultData = {
      name: userData.name,
      totalQuestions,
      correctAnswers,
      percentage,
    };

    api.post('answers', resultData).then(() => {
      navigate('/report');
    });
  };

  return (
    <div className='container container-fluid'>
      <h2 className='text-center bg-dark text-white m-1'>Attend Exam</h2>
      {currentStep === 1 && (
        <div className='text-center'>
          <label>Name:</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className='m-1'
          /><br/>
          <label>Email:</label>
          <input
            type="text"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className='m-1'
          /><br/>
          <label>DOB:</label>
          <input
            type="text"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            className='m-1'
          /><br/>
          <button onClick={submitUserData} className='btn btn-primary'>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          {exam.questions &&
            Object.keys(exam.questions).map((index, questionIndex) => (
              <div key={index} style={{ display: questionIndex === currentQuestionIndex ? 'block' : 'none' }}>
                <p>
                  QS:<span>{questionIndex + 1}-:</span>
                  {exam.questions[index].text}
                </p>
                {exam.questions[index].options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={option}
                      onChange={() => selectAnswer(index, option)}
                      checked={answers[index] === option}
                    />
                    {option}
                  </div>
                ))}
                <br />
              </div>
            ))}
          <button onClick={saveAndNext} className='btn btn-primary m-2'>Save & Next</button>
          <button onClick={finalSubmit} className='btn btn-success'>Final Submit</button>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <h3>Results</h3>
          <p>Total questions: {Object.keys(exam.questions).length}</p>
          <p>Correct Answers: {Object.keys(answers).length}</p>
          <p>Percentage: {((Object.keys(answers).length / Object.keys(exam.questions).length) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default AttendExam;
