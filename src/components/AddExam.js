import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddExam = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    title: '',
    questions: [],
  });

  const addQuestion = () => {
    setExam((prevExam) => ({
      ...prevExam,
      questions: [...prevExam.questions, { text: '', options: ['','','',''], answer: '' }],
    }));
  };

  const handleQuestionChange = (index, text) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      updatedQuestions[index].text = text;
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

  const saveExam = () => {
    api.post('exams', exam).then(() => {
      navigate('/');
    });
  };

  return (
    <div className='container container-fluid'>
      <h2 className='bg-dark text-white text-center m-1'>Add Exam</h2>
      <label><h3>Exam Title:</h3></label>
      <input
        type="text"
        value={exam.title}
        onChange={(e) => setExam({ ...exam, title: e.target.value })}
      />
      <h4>Questions</h4>
      {exam.questions.map((question, index) => (
        <div key={index}>
          <label><h5>Question {index + 1}:</h5></label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />
          <br />
          <label><h6>Options:</h6></label>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>Option {optionIndex + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionsChange(index, optionIndex, e.target.value)}
                className='m-1'
              />
            </div>
          ))}
          
          <label><h6>Answer:</h6></label>
          <input
            type="text"
            value={question.answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className='mt-2 mb-4'
          />
        </div>
      ))}
      <button onClick={addQuestion} className='btn btn-primary m-2'>Add Question</button>
      <button onClick={saveExam} className='btn btn-success'>Save Exam</button>
    </div>
  );
};

export default AddExam;
