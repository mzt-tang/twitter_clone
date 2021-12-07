import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, IconProvider } from '@optimalworkshop/optimal-components';

import ReplyModal from './ReplyModal';
import fetchWithHeaders from '../util/fetchWithHeaders';
import './post.scss';

/**
 * @param {post} the post object, containing just a tweet for now.
 * @returns .
 */
const Post = ({post, fetchAllPosts}) => {
  const [allReplies, setAllReplies] = useState([]);
  const [currentReply, setCurrentReply] = useState('');
  const [hasLiked, setHasLiked] = useState();

  const toggleLikePost = async () => {
    if (await alreadyLiked()) {
      await fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes/unlike`,
        { method: 'DELETE' }
      ).catch((e) => {
        alert(e.message)
      })
      setHasLiked(false);
    } else {
      await fetchWithHeaders(
        `/api/v2/posts/${post.id}/likes`,
        { method: 'POST' }
      ).catch((e) => {
        alert(e.message)
      })
      setHasLiked(true);
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
    alreadyLiked().then(liked => {
      setHasLiked(liked);
    });
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
    // <>
    //   <ReactMarkdown style={{ overflowWrap: "break-word" }}>
    //     {post.tweet}
    //   </ReactMarkdown>
    //   <div>
    //     <p>{post.likes_count}</p>
    //     <IconButton onClick={toggleLikePost}>
    //       <ThumbUp/>
    //     </IconButton>
    //     <ReplyModal setCurrentReply={setCurrentReply} submitReply={submitReply}/>
    //   </div>
    //   <div className="listGroup">
    //     <ul>
    //       {allReplies.map((reply) => 
    //         <li className="list-group-item" key={reply.id}>
    //           <ReactMarkdown>
    //             {reply.comment}
    //           </ReactMarkdown>
    //         </li>)}
    //       </ul>
    //   </div>
    // </>

    <div className="post-container">
      <ReactMarkdown>{post.tweet}</ReactMarkdown>
      <div className="icon-container">
        <IconProvider />
        <ReplyModal setCurrentReply={setCurrentReply} submitReply={submitReply}/>
        { hasLiked ? <Button primary icon="face/happy" onClick={toggleLikePost} extra-small /> : <Button toolbar icon="face/happy" onClick={toggleLikePost} extra-small />}
      </div>
    </div>

  );
};

export default Post;
