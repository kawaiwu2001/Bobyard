// comment-app/src/App.jsx
import React, { useState, useEffect } from "react";
import CommentsList from "./components/CommentsList";
import CommentForm from "./components/CommentForm";
import { fetchComments, addComment, updateComment, deleteComment } from "./lib/api";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchComments();
      setComments(data);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (text) => {
    try {
      await addComment({
        text,
        author: "Admin",
        date: new Date().toISOString(),
        likes: 0
      });
      await loadComments();
      setShowCommentForm(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEditComment = async (id, text) => {
    try {
      await updateComment(id, { text });
      setEditingComment(null);
      await loadComments();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(id);
        await loadComments();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  const filteredComments = comments.filter(comment =>
    comment.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="page-title">Community Comments</h1>
      <div className="comments-section">
        <div className="comments-header">
          <h2 className="comments-count">{comments.length} Comments</h2>
          <div className="comments-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search comments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            <button
              className="add-comment-btn"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              <svg className="comment-icon" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
              {showCommentForm ? 'Cancel' : 'Add Comment'}
            </button>
          </div>
        </div>

        {showCommentForm && (
          <div className="comment-form-container">
            <CommentForm
              onAddComment={handleAddComment}
              onEditComment={handleEditComment}
              editingComment={editingComment}
              onCancelEdit={() => setEditingComment(null)}
            />
          </div>
        )}

        {editingComment && (
          <div className="comment-form-container">
            <CommentForm
              editingComment={editingComment}
              onEditComment={handleEditComment}
              onCancelEdit={() => setEditingComment(null)}
            />
          </div>
        )}

        <CommentsList
          comments={filteredComments}
          isLoading={isLoading}
          onEditClick={setEditingComment}
          onDeleteClick={handleDeleteComment}
        />
      </div>
    </div>
  );
}

export default App;