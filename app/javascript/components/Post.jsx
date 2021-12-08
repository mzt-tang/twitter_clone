import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, IconProvider, Badge } from '@optimalworkshop/optimal-components';

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
      await fetchWithHeaders(`/api/v2/posts/${post.id}/likes/unlike`, { method: 'DELETE' }).catch((e) => {alert(e.message)});
      setHasLiked(false);
    } else {
      // postLike = undefined if post belongs to current user.
      const postLike = await fetchWithHeaders(`/api/v2/posts/${post.id}/likes`, { method: 'POST' }).catch((e) => {alert(e.message)});
      if (postLike !== undefined) {
        setHasLiked(true);
      }
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
    <div className="post-container">
      <ReactMarkdown className="post">{post.tweet}</ReactMarkdown>
      <div className="icon-container">
        <IconProvider />
        <ReplyModal setCurrentReply={setCurrentReply} submitReply={submitReply} allReplies={allReplies} />
        <div className="post-counters-outer">
          <Badge className="post-counters-inner" light small branded>{allReplies.length}</Badge>
        </div>
        { hasLiked ? <Button primary icon="face/happy" onClick={toggleLikePost} extra-small /> : <Button toolbar icon="face/happy" onClick={toggleLikePost} extra-small />}
        <div className="post-counters-outer">
          <Badge className="post-counters-inner" light small branded>{post.likes_count}</Badge>
        </div>
      </div>
    </div>

  );
};

export default Post;
