import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const AddComment = ({ addComment, comment, setComment, user }) => {
    const handleInputChange = React.useCallback(
        (event) => {
            setComment(event.target.value);
        },
        [setComment]
    );

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src={user.avatarUrl}
                />
                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        value={comment}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={addComment}>
                        Отправить
                    </Button>
                </div>
            </div>
        </>
    );
};

export default React.memo(AddComment);
