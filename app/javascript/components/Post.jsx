import React, {  } from "react";
import fetchWithHeaders from '../util/fetchWithHeaders';

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns .
 */
const Post = ({post, fetchAllPosts}) => {

  const toggleLikePost = async () => {
    if (post.likes_count === 1) {
      await fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes/unlike`,
        { method: 'DELETE' }
      ).catch((e) => {
        alert(e.message)
      })
    } else {
      await fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes`,
        { method: 'POST' }
      ).catch((e) => {
        alert(e.message)
      })
    }

    fetchAllPosts();
  }

  return (
    <>
      <p style={{ overflowWrap: "break-word" }}>
        {post.tweet}
      </p>
      <div>
        <button className="btn btn-success" onClick={toggleLikePost}>like</button>
        <p>{post.likes_count}</p>
      </div>
    </>
  );
};

export default Post;
