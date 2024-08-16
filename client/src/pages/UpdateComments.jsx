import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateComment() {
  const { commentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/comment/get/${commentId}`);
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else {
          console.error("Error fetching comment:", data);
        }
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    fetchComment();
  }, [commentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/comment/update/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/comments");
      } else {
        setError("Error updating comment");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error updating comment");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Comment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username || ""}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title || ""}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment || ""}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isApproved"
            checked={formData.isApproved || false}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isApproved">Approved</label>
        </div>
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Comment"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
