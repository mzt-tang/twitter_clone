import React, { useState, useEffect } from 'react';
import { Button } from '@optimalworkshop/optimal-components'

import fetchWithHeaders from '../util/fetchWithHeaders';
import Post from "./Post";
import "./posts.scss";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("");
  const [postNotifToast, setPostNotifToast] = useState(""); // The message of the toasts that this page displays

  const postMaxLength = 500; // Maximum length that a tweet can be

  const submitPost = async () => {

    // No toast in optimal components to notify the user :(
    if (!checkPostPreconditions()) return;

    await fetchWithHeaders(
      "/api/v2/posts",
      {
        method: 'POST', body: JSON.stringify({ tweet: currentPost })
      });

    document.getElementById('post').value = "";
    setCurrentPost("");

    fetchAllPosts();
  }

  const checkPostPreconditions = () => {
    if (currentPost.length === 0) {
      setPostNotifToast("Nothing to tweet!");
      return false;
    }

    if (currentPost.length > postMaxLength) {
      setPostNotifToast("Tweet must be under 500 characters!");
      return false;
    }

    return true;
  }

  const fetchAllPosts = async () => {
    await fetchWithHeaders(
      "/api/v2/posts")
      .then(response => {
        setAllPosts(response);
      });
  }

  // Fetchs the posts
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="container">
      <div className="text-area">
        <textarea placeholder="What's happening?" id="post" required onChange={(e) => setCurrentPost(e.target.value)} />
      </div>

      <div className="tweet-action-button">
        <Button text="Tweet" onClick={submitPost} primary extra-small />
      </div>

      <div className="posts">
        {allPosts.map((post) =>
          <Post key={post.id} post={post} fetchAllPosts={fetchAllPosts} />
        )}
      </div>
    </div>
  );
};

export default Posts;
