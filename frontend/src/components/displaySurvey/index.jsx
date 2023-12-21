import { useEffect, useState } from "react";
import { fetchApi } from "../../utilities/fetch";
import { Link } from "react-router-dom";

const DisplaySurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const getSurveys = async () => {
      const response = await fetchApi("admin/surveys", "get");
      setSurveys((await response).data.surveys);
    };
    getSurveys();
  }, []);

  return (
    <div className="flex column">
      <h2>Available Surveys</h2>
      <ul>
        {surveys?.map((survey) => (
          <Link
            key={survey._id}
            className={`survey`}
            to={`/survey/${survey._id}`}
          >
            <li className="survey">
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>

              {/* Add a button or link to navigate to the survey page */}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySurveys;
