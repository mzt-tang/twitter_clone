import React, { useState, useEffect } from "react";
import fetchWithHeaders from '../util/fetchWithHeaders';

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns .
 */
const Post = ({post, fetchAllPosts}) => {
  const [allReplies, setAllReplies] = useState([]);
  const [currentReply, setCurrentReply] = useState('');

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

    const fetchAllReplies = async () => {
      await fetchWithHeaders(
        `/api/v2/posts/${post.id}/replies`)
      .then(response => {
        setAllReplies(response);
      });
    }

    // Fetchs the posts
    useEffect(() => {
      fetchAllReplies();
    }, []);

  const submitReply = async () => {

    await fetchWithHeaders(
      `/api/v2/posts/${post.id}/replies`,
      { method: 'POST',
        body: JSON.stringify({ post_id: post.id, comment: currentReply })
    })

    //document.getElementById('post').value = "";
    //setCurrentPost("");
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
      <div className="listGroup">
        <ul>{allReplies.map((reply) => <li className="list-group-item" key={reply.id}>{reply.comment}</li>)}</ul>
        <textarea className="form-control" id="post" style={{ resize: "none", height: "80px" }} required onChange={(e) => setCurrentReply(e.target.value)} />
        <button className="btn btn-success btn-sm" onClick={submitReply}>reply</button>
      </div>
    </>
  );
};

export default Post;
