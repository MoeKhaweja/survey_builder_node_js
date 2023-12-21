import { useState } from "react";
import { fetchApi } from "../../utilities/fetch";

const SurveyCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi("admin/surveys", "post", {
      title: title,
      description: description,
    });
  };

  return (
    <div className="flex padding">
      <h2>Create a Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default SurveyCreation;
