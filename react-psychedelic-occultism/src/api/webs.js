import axios from 'axios';

const API_URL = 'http://localhost:3001/api/webs';

// ✅ Get all webs
export const fetchWebs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching webs:", error);
    return [];
  }
};

// ✅ Get a single web by ID
export const fetchWebById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching web:", error);
    return null;
  }
};

// ✅ Create a new web
export const createWeb = async (webData) => {
  try {
    const response = await axios.post(API_URL, webData);
    return response.data;
  } catch (error) {
    console.error("Error creating web:", error);
    return null;
  }
};

// ✅ Edit (Update) a web by ID
export const updateWeb = async (id, webData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, webData);
    return response.data;
  } catch (error) {
    console.error("Error updating web:", error);
    return null;
  }
};

// ✅ Delete a web by ID
export const deleteWeb = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { success: true, message: "Web deleted successfully" };
  } catch (error) {
    console.error("Error deleting web:", error);
    return { success: false, message: "Failed to delete web" };
  }
};
