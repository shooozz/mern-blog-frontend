import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/auth/selector";
import { logout } from "../../redux/auth/slice";
import { useAppDispatch } from "../../redux/store";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const onClickLogout = () => {
        if (window.confirm("Are you sure want to logout?")) {
            dispatch(logout());
            window.localStorage.removeItem("token");
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <a className={styles.logo} href="/">
                        <div>PUCIGOV BLOG</div>
                    </a>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/add-post">
                                    <Button variant="contained">
                                        Написать статью
                                    </Button>
                                </Link>
                                <Button
                                    onClick={onClickLogout}
                                    variant="contained"
                                    color="error"
                                >
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">
                                        Создать аккаунт
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
