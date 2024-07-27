import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useSelector } from "react-redux";
import { fetchRegister } from "../../redux/auth/slice";
import { selectIsAuth } from "../../redux/auth/selector";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useAppDispatch(fetchRegister);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    if (isAuth) {
        return <Navigate to="/" />;
    }

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            alert("Coudn't registration");
        }
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {" "}
                <Typography classes={{ root: styles.title }} variant="h5">
                    Создание аккаунта
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>
                <TextField
                    className={styles.field}
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register("fullName", { required: "Write full name" })}
                    label="Полное имя"
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email", { required: "Write email" })}
                    label="E-Mail"
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", { required: "Write password" })}
                    label="Пароль"
                    fullWidth
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
