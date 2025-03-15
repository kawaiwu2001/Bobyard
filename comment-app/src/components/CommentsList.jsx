// comment-app/src/components/CommentsList.jsx
import { formatDistanceToNow } from "date-fns";
import "./CommentsList.css";

export default function CommentsList({ comments, isLoading, onEditClick, onDeleteClick }) {
    if (isLoading) {
        return <div className="loading-state">Loading comments...</div>;
    }

    if (comments.length === 0) {
        return (
            <div className="empty-state">
                <h3 className="text-lg font-medium">No comments yet</h3>
                <p className="mt-2">Be the first to add a comment!</p>
            </div>
        );
    }

    return (
        <div className="comments-list">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                        <div className="comment-content">
                            <div className="comment-author">
                                <div className="author-avatar" />
                                <div>
                                    <p className="author-name">{comment.author}</p>
                                    <p className="comment-metadata">
                                        {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                            {comment.image && comment.image !== "null" && comment.image !== "" && (
                                <img
                                    src={comment.image}
                                    alt=""
                                    className="comment-image"
                                />
                            )}
                            <div className="comment-likes">
                                <button className="like-button">
                                    <svg className="heart-icon" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span className="likes-count">{comment.likes || 0}</span>
                                </button>
                            </div>
                        </div>
                        <div className="comment-actions">
                            <button
                                className="btn btn-edit"
                                onClick={() => onEditClick(comment)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-delete"
                                onClick={() => onDeleteClick(comment.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}