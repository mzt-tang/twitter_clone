import React from 'react';
import { Button, Modal } from '@optimalworkshop/optimal-components';
import ReactMarkdown from 'react-markdown';

import Replies from './Replies'

import './replymodal.scss';

const ReplyModal = ({post, setCurrentReply, submitReply, allReplies}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const postComment = () => {
    submitReply();
    document.getElementById("reply-text").value = "";
  }

  return (
    <>
      <Button toolbar icon="action/comment" onClick={handleOpen} extra-small/>
      <Modal
        open={open}
        onClose={handleClose}
        title="Comments"
      >
        <Modal.Body className="modal-body">
          <div className="modal-post">
            <ReactMarkdown>{post.tweet}</ReactMarkdown>
          </div>

          <div>
            <Replies allReplies={allReplies} />
          </div>

          <div className="text-area">
            <textarea id="reply-text" placeholder="What are your thoughts?" required onChange={(e) => setCurrentReply(e.target.value)} />
          </div>

          <div className="modal-action-buttons">
            <Button text="reply" primary extra-small onClick={postComment} />
            <Button text="close" secondary extra-small onClick={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReplyModal;
