import "./App.css";
import SurveyCreation from "./components/surveyBuilder";
import CreateQuestion from "./components/createQuestion";
import { useSelector } from "react-redux";
import Header from "./components/header";
import Auth from "./components/auth";
import DisplaySurveys from "./components/displaySurvey";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnswerSurvey from "./components/displayQuestion";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <>
      <Header />
      <Auth />
      {isAuth && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              index
              element={
                <>
                  {isAdmin && <SurveyCreation />}
                  <DisplaySurveys />
                </>
              }
            />
            <Route
              path="/survey/:surveyId"
              element={
                <>
                  {isAdmin && <CreateQuestion />}
                  {!isAdmin && <AnswerSurvey></AnswerSurvey>}
                </>
              }
            />
            <Route path="*" element={<>404 page not found</>} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
