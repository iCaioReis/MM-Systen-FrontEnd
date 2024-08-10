import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from "../pages/SignIn";

const user = localStorage.getItem("@mmsystem:user");

export function AuthRoutes() {
    return (
        <Routes>
            <Route path='/' element={< SignIn />}/>
            {!user && <Route path='*' element={<Navigate to="/"/>}/> }
        </Routes>
    )
}