import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({ title: '', questions: [] });

  useEffect(() => {
    // Fetch exam details from the API based on the id
    api.get(`exams/${id}`).then((data) => setExam(data));
  }, [id]);

  const handleQuestionChange = (questionIndex, text) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      updatedQuestions[questionIndex].text = text;
      return { ...prevExam, questions: updatedQuestions };
    });
  };

  const handleOptionsChange = (questionIndex, optionIndex, optionText) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      updatedQuestions[questionIndex].options[optionIndex] = optionText;
      return { ...prevExam, questions: updatedQuestions };
    });
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      updatedQuestions[questionIndex].answer = answer;
      return { ...prevExam, questions: updatedQuestions };
    });
  };

  const handleUpdate = () => {
    // Update the exam details in the API
    api.put(`exams/${id}`, exam).then(() => {
      navigate('/');
    });
  };

  return (
    <div className='container container-fuid'>
      <h2 className='bg-dark text-white text-center'>Edit Exam</h2>
      {/* <label>Exam Title:{exam.title}</label>
      <input
        type="text"
        value={exam.title}
        onChange={(e) => setExam({ ...exam, title: e.target.value })}
      /> */}
      <h3>Exam Title:{exam.title}</h3> 
      <h4>Edit Questions</h4>
      {exam.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>Question {questionIndex + 1}:</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            className='m-2'
          />
          <br />
          <label>Edit Options</label>
          {question.options.map((option, optionIndex) => (
            <div key={`${questionIndex}-${optionIndex}`}>
              <label>Edit Option {optionIndex + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionsChange(questionIndex, optionIndex, e.target.value)                  
                }
                className='m-1'
              />
            </div>
          ))}
          <label>Edit Answer:</label>
          <input
            type="text"
            value={question.answer}
            onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
            className='m-1'
          />
        </div>
      ))}

      <button onClick={handleUpdate} className='btn btn-primary m-2'>
        Update Exam
      </button>
      <Link to="/" className='btn btn-secondary'>
        Back to Exam List
      </Link>
    </div>
  );
};

export default EditExam;
