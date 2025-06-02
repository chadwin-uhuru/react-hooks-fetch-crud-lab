import React from "react";

function QuestionList({ questions, setQuestions }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions((questions) => questions.filter((q) => q.id !== id));
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleChangeCorrectAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((questions) =>
          questions.map((q) => (q.id === id ? updatedQuestion : q))
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <section>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.prompt}</h3>
            <select
              value={question.correctIndex}
              onChange={(e) =>
                handleChangeCorrectAnswer(question.id, Number(e.target.value))
              }
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer} {index === question.correctIndex ? "(Correct)" : ""}
                </option>
              ))}
            </select>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
