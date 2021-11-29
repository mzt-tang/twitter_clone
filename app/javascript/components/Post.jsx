import React, { useState, useEffect } from "react";
import fetchWithHeaders from '../util/fetchWithHeaders';

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns 
 */
const Post = ({post}) => {
  const [reload, setReload] = useState(false);
  const [likeID, setLikeID] = useState('');

  const likePost = () => {
    if (post.likes_count === 1) {
      fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes/${likeID}`,
        { method: 'DELETE' }
      ).catch((e) => {
        alert(e.message)
      })


      fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes/${likeID}`,
        { method: 'DELETE' }
      ).catch((e) => {
        alert(e.message)
      })
    } else {
      fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes`,
        { method: 'POST' }
      ).catch((e) => {
        alert(e.message)
      })
    }

    setReload(!reload);
  }

  return (
    <>
      <p style={{ overflowWrap: "break-word" }}>
        {post.tweet}
      </p>
      <div>
        <button className="btn btn-success" onClick={likePost}>like</button>
        <p>{post.likes}</p>
      </div>
    </>
  );
};

export default Post;
