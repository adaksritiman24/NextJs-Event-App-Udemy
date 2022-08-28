import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const getAllComments = () => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => setComments([]));
  };

  function addCommentHandler(commentData, clearAllInputs) {
    // send data to API
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        clearAllInputs();
        getAllComments();
      })
      .catch(console.log);
  }
  useEffect(() => {
    getAllComments();
  }, []);
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
