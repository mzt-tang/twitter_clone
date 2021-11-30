import React, { useState } from "react";
import fetchWithHeaders from '../util/fetchWithHeaders';

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns .
 */
const Post = ({post, fetchAllPosts}) => {
  const [reply, setReply] = useState('');

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
        <button className={`${(post.likes_count === 1) ? "btn btn-primary btn-sm" : "btn btn-outline-dark btn-sm"}`} onClick={toggleLikePost}>like</button>
        <p>{post.likes_count}</p>
      </div>
      <div>
        <textarea className="form-control" id="post" style={{ resize: "none", height: "80px" }} required onChange={(e) => setReply(e.target.value)} />
        <button className="btn btn-success btn-sm">submit post</button>
      </div>
    </>
  );
};

export default Post;
