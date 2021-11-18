import React, { useState, useEffect, useCallback } from "react";

import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [reload, setReload] = useState(false);
  
  const submitPost = () => {
      // Todo: add a toast or alert for tweet being too short or long!
      if (post.length === 0 || post.length > 500) {
          return;
      }

      const url = "/api/v1/posts/create";
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, { method: 'POST', headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json'}, body: JSON.stringify({tweet: post})})

      document.getElementById('post').value = "";
      setPost("");
      setReload(!reload);
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
      }})
      .then(response => {
        setPosts(response);
      })
    }, [reload]);

    return (
      <div className="container">
        <div className="row">
          <h1 className="display-1">Posts</h1>
        </div>
        <div className="row">
            <div>
                <textarea id="post" name="post" rows="6" required onChange={(e) => setPost(e.target.value)}/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={submitPost} >post</button>
            </div>
        </div>
        <div className="row list-group">
          <ul>{posts.map((post) => <li className="list-group-item" key={post.id}><Post post={post}/></li>)}</ul>
        </div>
        <div className="row">
        </div>
      </div>
    );
  };

export default Posts;