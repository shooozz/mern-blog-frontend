import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe } from "./redux/auth/slice";
import { SearchTags } from "./pages/SearchTags";
import { useAppDispatch } from "./redux/store";

function App() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    });

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/tags/:name" element={<SearchTags />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
