import React from 'react';
import { Button, Modal, IconProvider } from '@optimalworkshop/optimal-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ReplyModal = ({setCurrentReply, submitReply}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const postComment = () => {
    submitReply();
    handleClose();
  }

  return (
    <>
      <Button toolbar icon="action/comment" onClick={handleOpen} extra-small/>
      <Modal
        open={open}
        onClose={handleClose}
        title="Reply to tweet"
      >
        <Modal.Body>
          <div className="text-area">
            <textarea placeholder="What's happening?" id="post" required onChange={(e) => setCurrentReply(e.target.value)} />
          </div>
          <Button text="reply" onClick={postComment} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReplyModal;
