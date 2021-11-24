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
      <ListItem secondaryAction={
        <Grid container spacing={0}>
          <IconButton edge="end" aria-label="reply">
              <ReplyIcon />
            </IconButton>
          <IconButton edge="end" aria-label="like">
            <ThumbUpIcon />
          </IconButton>
        </Grid>
      }>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: green[500]}}>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText style={{ overflowWrap: "break-word", maxWidth: 1000}} primary="Name" secondary={post.tweet}/>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default Post;