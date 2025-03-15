import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/api/comments/";

// Function to fetch all comments
export const fetchComments = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

// Function to add a new comment
export const addComment = async (commentData) => {
    try {
        const response = await axios.post(API_URL, commentData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

// Function to update an existing comment
export const updateComment = async (id, commentData) => {
    try {
        const response = await axios.put(`${API_URL}${id}/update/`, commentData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

// Function to delete a comment
export const deleteComment = async (id) => {
    try {
        await axios.delete(`${API_URL}${id}/delete/`);
        return true;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};
