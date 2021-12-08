import React from 'react';

import Reply from './Reply';

import './replies.scss';

const Replies = ({allReplies}) => {


  return (
    <ul className="reply-list">
      {allReplies.map((reply) =>
        <li key={reply.id}>
          <Reply reply={reply} />
        </li>
      )}
    </ul>
  );
 }

 export default Replies;
