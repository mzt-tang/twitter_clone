import React from "react";

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns 
 */
const Post = ({post}) => {

  return (
      <>{post.tweet}</>
  );
};

export default Post;