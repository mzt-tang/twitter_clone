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
      <div>
        <h1>Posts</h1>
        <ul>{posts.map((post) => <li key={post.id}><Post post={post}/></li>)}</ul>
        <Link to="create-post">create post</Link>
      </div>
    );
  };

export default Posts;
