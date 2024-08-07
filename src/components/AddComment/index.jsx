import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const AddComment = ({ addComment, comment, setComment, user }) => {
    const handleInputChange = React.useCallback(
        (event) => {
            setComment(event.target.value);
        },
        [setComment]
    );

    const avatar = React.useMemo(
        () => <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />,
        [user.avatarUrl]
    );

    const textField = React.useMemo(
        () => (
            <TextField
                label="Написать комментарий"
                variant="outlined"
                maxRows={10}
                multiline
                fullWidth
                value={comment}
                onChange={handleInputChange}
            />
        ),
        [comment, handleInputChange]
    );

    const button = React.useMemo(
        () => (
            <Button variant="contained" onClick={addComment}>
                Отправить
            </Button>
        ),
        [addComment]
    );
    return (
        <div className={styles.root}>
            {avatar}
            <div className={styles.form}>
                {textField}
                {button}
            </div>
        </div>
    );
};
