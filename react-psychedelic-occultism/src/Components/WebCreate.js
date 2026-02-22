import { useState, useEffect } from "react";
import { createWeb } from "../api/webs.js"; // API function to send data to backend
import { useAuth } from "../Hooks/useAuth";

const WebCreate = () => {
  const { user } = useAuth(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a web.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createWeb({
        title,
        description,
        createdBy: user.userId, // Ensure the user ID is sent
      });

      // Clear form after successful creation
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to create web.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Create New Web</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description (optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Web"}
        </button>
      </form>
    </div>
  );
};

export default WebCreate;
