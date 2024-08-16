import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getAll");
        //const res = await fetch(`/api/comment/getAll?limit=${limit}`);

        const data = await res.json();
        if (res.ok) {
          setComments(data);
        } else {
          console.error("Error fetching comments:", data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleDeleteClick = (comment) => {
    setSelectedComment(comment);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/api/comment/delete/${selectedComment._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments(
          comments.filter((comment) => comment._id !== selectedComment._id)
        );
        setShowModal(false);
        setSelectedComment(null);
      } else {
        console.error("Error deleting comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdateClick = (commentId) => {
    navigate(`/updateComment/${commentId}`);
    console.log("Update Clicked " + commentId);
  };

  return (
    <div className="p-5 bg-slate-400">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Comments
      </h2>
      <table className="table-auto w-full text-white">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Comment</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>
                <img
                  src={comment.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td>{comment.username}</td>
              <td>{comment.comment}</td>
              <td>{comment.isApproved ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={() => handleDeleteClick(comment)}
                  className="text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateClick(comment._id)}
                  className="text-blue-500 ml-2"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded">
            <h3 className="text-lg font-bold">
              Are you sure you want to delete this comment?
            </h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
