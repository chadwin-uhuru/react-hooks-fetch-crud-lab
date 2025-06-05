import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updated = questions.filter((q) => q.id !== id);
      setQuestions(updated);
    });
  }

  function handleUpdateCorrectIndex(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updated = questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        );
        setQuestions(updated);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdateCorrectIndex={handleUpdateCorrectIndex}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
