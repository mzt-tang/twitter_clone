import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

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
    }, [])

    return (
      <div class="container">
        <div class="row">
          <h1 class="display-1">Posts</h1>
        </div>
        <div class="row list-group">
          <ul>{posts.map((post) => <li class="list-group-item" key={post.id}><Post post={post}/></li>)}</ul>
        </div>
        <div class="row">
          
          <Link to="create-post">create post</Link>
        </div>
      </div>
    );
  };

export default Posts;