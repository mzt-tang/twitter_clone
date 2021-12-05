import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import {ThumbUp} from '@mui/icons-material/';
import fetchWithHeaders from '../util/fetchWithHeaders';
import ReactMarkdown from 'react-markdown'
import ReplyModal from './ReplyModal'

/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns .
 */
const Post = ({post, fetchAllPosts}) => {
  const [allReplies, setAllReplies] = useState([]);
  const [currentReply, setCurrentReply] = useState('');

  const toggleLikePost = async () => {
    if (await alreadyLiked()) {
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

    setCurrentReply("");
    
    fetchAllReplies();
  }

  const alreadyLiked = async () => {
    return await fetchWithHeaders(
      `/api/v2/posts/${post.id}/likes/liked`,
      { method: 'GET' }
    ).catch((e) => {
      alert(e.message)
    })
  }

  return (
    <>
      <ReactMarkdown style={{ overflowWrap: "break-word" }}>
        {post.tweet}
      </ReactMarkdown>
      <div>
        <p>{post.likes_count}</p>
        <IconButton onClick={toggleLikePost}>
          <ThumbUp/>
        </IconButton>
        <ReplyModal setCurrentReply={setCurrentReply} submitReply={submitReply}/>
      </div>
      <div className="listGroup">
        <ul>
          {allReplies.map((reply) => 
            <li className="list-group-item" key={reply.id}>
              <ReactMarkdown>
                {reply.comment}
              </ReactMarkdown>
            </li>)}
          </ul>
      </div>
    </>
  );
};

export default Post;
