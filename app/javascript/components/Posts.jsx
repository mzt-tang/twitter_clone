import React, { useState, useEffect } from "react";
import fetchWithHeaders from '../util/fetchWithHeaders';
import Post from "./Post";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("");
  const [postNotifToast, setPostNotifToast] = useState(""); // The message of the toasts that this page displays
  const [reload, setReload] = useState(false);

  const postMaxLength = 500; // Maximum length that a tweet can be

  const submitPost = async () => {
    const toast = new bootstrap.Toast(document.getElementById('postToast'));
    
    if (!checkPostPreconditions(toast)) return;

    await fetchWithHeaders(
      "/api/v2/posts",
      { method: 'POST',
        body: JSON.stringify({ tweet: currentPost })
    })

    document.getElementById('post').value = "";
    setCurrentPost("");

    setPostNotifToast("Tweeted!")
    toast.show()
    
    fetchAllPosts();
  }

  const checkPostPreconditions = (toast) => {
    if (currentPost.length === 0) {
      setPostNotifToast("Nothing to tweet!")
      toast.show()
      return false
    }

    if (currentPost.length > postMaxLength) {
      setPostNotifToast("Tweet must be under 500 characters!")
      toast.show()
      return false
    }

    return true
  }

  const fetchAllPosts = async () => {
      await fetchWithHeaders(
        "/api/v2/posts")
      .then(response => {
        setAllPosts(response);
      });
      setReload(!reload);
  }

  // Fetchs the posts
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-1">Posts</h1>
      </div>
      
      <div className="row">
        <div className="col d-grid">  
          <div className="position-relative">
            <textarea className="form-control" placeholder="What's happening?" id="post" style={{ resize: "none", height: "140px" }} required onChange={(e) => setCurrentPost(e.target.value)} />
            <span className={`position-absolute badge rounded-pill ${(postMaxLength - currentPost.length < 0) ? "bg-danger" : "bg-secondary"}`} style={{ bottom: "8px", right: "16px" }}>
              {postMaxLength - currentPost.length}
            </span>
          </div>
          <button className="btn btn-primary" onClick={submitPost} >Tweet</button>
        </div>
      </div>

      <div className="row list-group">
        <ul>{allPosts.map((post) => <li className="list-group-item" key={post.id}><Post post={post} fetchAllPosts={fetchAllPosts} /></li>)}</ul>
      </div>
      
      <div className="position-fixed top-0 end-0 p-3">
        <div id="postToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">
            {postNotifToast}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
