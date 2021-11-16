import React from "react";

import Post from "./Post";

const Posts = () => {
  const test = ["tweet1", "tweet2", "tweet3", "tweet4", "tweet5"];
  const listPosts = test.map((post) =>
    <Post tweet={post}/>
  );
    return (
      <div>
        <h1>Posts</h1>
        <ul>{listPosts}</ul>
      </div>
    );
  };

export default Posts;