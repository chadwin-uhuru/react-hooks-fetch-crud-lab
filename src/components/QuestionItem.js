import React from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChange(e) {
    onUpdateCorrectIndex(id, parseInt(e.target.value, 10));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
