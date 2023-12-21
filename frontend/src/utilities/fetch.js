import axios from "axios";

const API_URL = "http://localhost:8000";
let localToken = localStorage.getItem("token");

export const fetchApi = async (url, method, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
