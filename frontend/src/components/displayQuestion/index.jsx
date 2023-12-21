/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../utilities/fetch";
import { useSelector } from "react-redux";

const AnswerSurvey = () => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const param = useParams();
  const userId = useSelector((state) => state.auth.userId);
  const surveyId = param.surveyId;

  useEffect(() => {
    const getQuestion = async () => {
      const response = await fetchApi("admin/AnswerSurvey", "post", {
        surveyId: surveyId,
      });
      console.log((await response).data.survey.questions);
      setQuestions((await response).data.survey.questions);
    };
    getQuestion();
  }, []);

  const handleInputChange = (e, questionId) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    questions?.forEach((question) => {
      fetchApi("answer/answers", "post", {
        userId: userId,
        surveyId: surveyId,
        questionId: question._id,
        answer: answers[question._id],
      });
    });
    console.log(userId);
  };

  return (
    <div>
      <h2>Answer Survey</h2>
      <form onSubmit={handleSubmit}>
        {questions?.map((question) => (
          <div key={question._id}>
            <p>{question.text}</p>
            {question.type !== "input" ? (
              <div>
                {question.options.map((option, index) => (
                  <div key={index}>
                    {question.type === "radio" ? (
                      <label>
                        <input
                          type="radio"
                          name={`question_${question._id}`}
                          value={option}
                          onChange={(e) => handleInputChange(e, question._id)}
                        />
                        {option}
                      </label>
                    ) : (
                      <label>
                        <input
                          type="checkbox"
                          name={`question_${question._id}`}
                          value={option}
                          onChange={(e) => handleInputChange(e, question._id)}
                        />
                        {option}
                      </label>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={answers[question._id] || ""}
                onChange={(e) => handleInputChange(e, question._id)}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
};

export default AnswerSurvey;
