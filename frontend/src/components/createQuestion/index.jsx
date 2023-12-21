import { useState } from "react";
import { fetchApi } from "../../utilities/fetch";
import { useParams } from "react-router-dom";

const CreateQuestion = () => {
  const [text, setText] = useState("");
  const [type, setType] = useState("input");
  const [options, setOptions] = useState([]);

  const param = useParams();

  const surveyId = param.surveyId;

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleOptionsChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi("add/questions", "post", { text, type, options, surveyId });
    console.log(surveyId);
    console.log(text, type, options);
  };

  return (
    <div className="flex column">
      <h2>Create a Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question Text:
          <input type="text" value={text} onChange={handleTextChange} />
        </label>
        <label>
          Select Type:
          <select value={type} onChange={handleTypeChange}>
            <option value="input">Input</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </label>
        {type !== "input" && (
          <div>
            <h4>Options:</h4>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionsChange(e, index)}
                />
                <button type="button" onClick={() => removeOption(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addOption}>
              Add Option
            </button>
          </div>
        )}
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
