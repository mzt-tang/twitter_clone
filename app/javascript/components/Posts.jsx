import React from "react";

import Post from "./Post";

const Posts = () => {
  const test = ["tweet1", "tweet2", "tweet3", "tweet4", "tweet5"];
  const listPosts = test.map((post) =>
    <li><Post tweet={post}/></li>
  );
    return (
      <div>
        <h1>Posts</h1>
        {listPosts}
      </div>
    );
  };

export default Posts;