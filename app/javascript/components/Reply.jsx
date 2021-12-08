import React from 'react';
import ReactMarkdown from 'react-markdown';

import './reply.scss';

const Reply = ({reply}) => {


  return (
    <div className="comment-container">
      <ReactMarkdown>{reply.comment}</ReactMarkdown>
    </div>
  );
 }

 export default Reply;
