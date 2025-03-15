// comment-app/src/components/CommentForm.jsx
import { useState, useEffect } from "react";
import "./CommentForm.css";

export default function CommentForm({ editingComment, onAddComment, onEditComment, onCancelEdit }) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (editingComment) {
            setText(editingComment.text);
        } else {
            setText("");
        }
    }, [editingComment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        if (editingComment) {
            onEditComment(editingComment.id, text);
        } else {
            onAddComment(text);
        }
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={editingComment ? "Edit your comment..." : "Write a comment..."}
                className="comment-textarea"
                rows="4"
            />
            <div className="form-buttons">
                {editingComment && (
                    <button
                        type="button"
                        onClick={() => {
                            setText("");
                            onCancelEdit();
                        }}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!text.trim()}
                >
                    {editingComment ? "Save Changes" : "Post Comment"}
                </button>
            </div>
        </form>
    );
}