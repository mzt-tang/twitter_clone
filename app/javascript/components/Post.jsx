import React from "react";
import { ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Divider, Grid } from "@mui/material";
import { green } from '@mui/material/colors';
import FolderIcon from '@mui/icons-material/Folder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';


/**
 * @param {post} the post object, containing just a tweet for now. 
 * @returns   
 */
const Post = ({post}) => {

  return (
    <>
      <div className="flexContainer">
        <div className="flexItem" style={{background: "hotpink", flex: 2}}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: green[500]}}>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText style={{ overflowWrap: "break-word"}} primary="Name" secondary={post.tweet}/>
          </ListItem>
        </div>
        <div className="flexItem position-relative" style={{background: "gold", flex: 1}}>
            <p className="position-absolute top-0 start-0" style={{ }}>33</p>
            <IconButton className="position-absolute top-0 end-0" style={{ }} aria-label="reply">
                <ReplyIcon />
            </IconButton>
            <p className="position-absolute bottom-0 start-0" style={{  }}>42</p>
            <IconButton className="position-absolute bottom-0 end-0" style={{ bottom: "10px" }} aria-label="like">
              <ThumbUpIcon style={{ }} />
            </IconButton>
        </div>
      </div>
      <Divider component="li" />
    </>
  );
};

export default Post;
