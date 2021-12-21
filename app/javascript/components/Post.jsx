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
const Post = ({ post, fetchAllPosts }) => {
  const [allReplies, setAllReplies] = useState([]);
  const [currentReply, setCurrentReply] = useState('');
  const [hasLiked, setHasLiked] = useState();
  const [disabledButton, setDisabledButton] = useState(false);

  const toggleLikePost = async () => {
    if (disabledButton) {
      return;
    } else {
      setDisabledButton(true);
    }

    if (await postBelongsToUser()) {
      setHasLiked(false);
      return;
    }

    if (await alreadyLiked()) {
      await fetchWithHeaders(`/api/v2/posts/${post.id}/likes/unlike`, { method: 'DELETE' }).catch((e) => { alert(e.message) });
      setHasLiked(false);
    } else {
      await fetchWithHeaders(`/api/v2/posts/${post.id}/likes`, { method: 'POST' }).catch((e) => { alert(e.message) });
      setHasLiked(true);
    }
    fetchAllPosts();
    setDisabledButton(false);
  }

  const fetchAllReplies = async () => {
    await fetchWithHeaders(
      `/api/v2/replies?post_id=${post.id}`)
      .then(response => {
        setAllReplies(response);
      });
  }

  // Fetchs the posts on first render
  useEffect(() => {
    fetchAllReplies();
    alreadyLiked().then(liked => {
      setHasLiked(liked);
    });
  }, []);

  const submitReply = async () => {
    await fetchWithHeaders(
      `/api/v2/replies`,
      {
        method: 'POST',
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

  const postBelongsToUser = async () => {
    return await fetchWithHeaders(
      `/api/v2/posts/${post.id}/likes/post_belongs_to_user`,
      { method: 'GET' }
    ).catch((e) => {
      alert(e.message);
    })
  }

  return (
    <div className="post-container">
      <ReactMarkdown className="post-container--post">{post.tweet}</ReactMarkdown>
      <div className="likes-and-replies">
        <IconProvider />
        <ReplyModal post={post} setCurrentReply={setCurrentReply} submitReply={submitReply} allReplies={allReplies} />
        <div className="likes-and-replies--reaction-counter-outer">
          <Badge className="likes-and-replies--reaction-counter-inner" light small branded>{allReplies.length}</Badge>
        </div>
        {hasLiked ? <Button id='post-unlike-button' primary icon="face/happy" onClick={toggleLikePost} extra-small />
          : <Button id='post-like-button' toolbar icon="face/happy" onClick={toggleLikePost} extra-small />}
        <div className="likes-and-replies--reaction-counter-outer">
          <Badge className="likes-and-replies--reaction-counter-inner" light small branded>{post.likes_count}</Badge>
        </div>
      </div>
    </div>

  );
};

export default Post;
