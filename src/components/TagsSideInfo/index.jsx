import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import styles from "./TagsSidaInfo.module.scss";
import { SideBlock } from "../SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.root}>
            {isMobile ? (
                <>
                    <IconButton onClick={handleClickOpen}>
                        <TagIcon />
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle>Тэги</DialogTitle>
                        <List>
                            {(isLoading ? [...Array(5)] : items).map(
                                (name, i) => (
                                    <a
                                        key={i}
                                        className={styles.a}
                                        href={`/tags/${name}`}
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <TagIcon />
                                                </ListItemIcon>
                                                {isLoading ? (
                                                    <Skeleton width={100} />
                                                ) : (
                                                    <ListItemText
                                                        primary={name}
                                                        className="active"
                                                    />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    </a>
                                )
                            )}
                        </List>
                    </Dialog>
                </>
            ) : (
                <SideBlock title="Тэги">
                    <List>
                        {(isLoading ? [...Array(5)] : items).map((name, i) => (
                            <a
                                key={i}
                                className={styles.a}
                                href={`/tags/${name}`}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <TagIcon />
                                        </ListItemIcon>
                                        {isLoading ? (
                                            <Skeleton width={100} />
                                        ) : (
                                            <ListItemText
                                                primary={name}
                                                className="active"
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </SideBlock>
            )}
        </div>
    );
};
