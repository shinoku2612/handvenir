import React from "react";
import styles from "./Comment.module.css";
import { Rating } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

export default function Comment({ author = {}, comment = {} }) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.userImage}>
                <img
                    src={author.avatar}
                    alt={author.name}
                    className={styles.image}
                />
            </div>
            <div className={styles.commentDetails}>
                <h5 className={styles.userName}>{author.name}</h5>
                <Rating
                    readOnly
                    value={comment.rating}
                    precision={0.1}
                    size="small"
                />
                <span className={styles.time}>{comment.createdAt}</span>
                <p className={styles.commentContent}>{comment.content}</p>
                <div className={styles.commentReaction}>
                    <ThumbUp className={styles.reactionIcon} />
                    <span className={styles.reactionCount}>{comment.like}</span>
                </div>
            </div>
        </div>
    );
}
