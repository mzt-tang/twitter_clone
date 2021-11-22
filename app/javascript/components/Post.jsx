import React from "react";

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns 
 */
const Post = ({post}) => {

  return (
      <p style={{ overflowWrap: "break-word" }}>
        {post.tweet}
      </p>
  );
};

export default Post;