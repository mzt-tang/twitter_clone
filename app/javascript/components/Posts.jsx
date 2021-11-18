import React, { useState, useEffect } from "react";

import Post from "./Post";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("");
  const [reload, setReload] = useState(false); // A hook for activating the useEffect hook to update the index of posts
  const [toastMessage, setToastMessage] = useState(""); // The message of the toasts that this page displays

  // Submits the current post inside the shown text area to the index
  //  - Doesn't post if the post has no characters in it or too many characters..\
  //  - Submits the post to the db index if text is valid.
  const submitPost = () => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const toast = new bootstrap.Toast(document.getElementById('postToast'));

    if (currentPost.length === 0) {
      setToastMessage("Nothing to tweet!")
      toast.show()
      return
    }

    if (currentPost.length > 500) {
      setToastMessage("Tweet must be under 500 characters!")
      toast.show()
      return
    }

    const url = "/api/v1/posts/create";
    fetch(url, { method: 'POST', headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json' }, body: JSON.stringify({ tweet: currentPost }) })

    document.getElementById('post').value = "";
    setCurrentPost("");

    setToastMessage("Tweeted!")
    toast.show()
    
    setReload(!reload) // Trigger useEffect to update all posts
  }

  // Fetchs the posts
  useEffect(() => {
    const url = "/api/v1/posts/index.json";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then(response => {
        setAllPosts(response);
      })
  }, [reload]);

  return (
    <div className="container">
      {/* Heading */}
      <div className="row">
        <h1 className="display-1">Posts</h1>
      </div>
      {/* Create post */}
      <div className="row">
        <div className="col d-grid">
          <div className="position-relative">
            <textarea className="form-control" placeholder="What's happening?" id="post" style={{ resize: "none", height: "140px" }} required onChange={(e) => setCurrentPost(e.target.value)} />
            <span className={`position-absolute badge rounded-pill ${(500 - currentPost.length < 0) ? "bg-danger" : "bg-secondary"}`} style={{ bottom: "8px", right: "16px" }}>{500 - currentPost.length}</span>
          </div>
          <button className="btn btn-primary" onClick={submitPost} >Tweet</button>
        </div>
      </div>
      {/* List of all posts */}
      <div className="row list-group">
        <ul>{allPosts.map((post) => <li className="list-group-item" key={post.id}><Post post={post} /></li>)}</ul>
      </div>
      <div className="position-fixed top-0 end-0 p-3">
        <div id="postToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;