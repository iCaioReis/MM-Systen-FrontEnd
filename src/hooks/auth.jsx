import { createContext, useContext, useState, useEffect } from "react";

import { api } from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [data, setData] = useState({});
    
    async function signIn({ login, password }){

        try {
            const res = await api.post("/sessions", { login, password });
            const { user, token } = res.data;

            localStorage.setItem("@mmsystem:user", JSON.stringify(user));
            localStorage.setItem("@mmsystem:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({ user, token })

        } catch (error) {
            if(error.res){
                alert(error.res.data.message);
            }else {
                alert("Não foi possível entrar")
            }
        }
        
    }

    function signOut(){
        localStorage.removeItem("@mmsystem:user");
        localStorage.removeItem("@mmsystem:token");

        setData({});
    }

    async function updateProfile({ user, avatarFile }){
        try {
            if(avatarFile){
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const res = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = res.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@mmsystem:user", JSON.stringify(user));

            setData({ user, token: data.token });
            alert("Perfil atualizado!");

        } catch (error) {
            if(error.res){
                alert(error.res.data.message);
            }else {
                alert("Não foi possível atualizar o perfil")
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@mmsystem:user");
        const token = localStorage.getItem("@mmsystem:token");

        if( token && user ){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token, 
                user: JSON.parse(user)
            })
        }
    }, []);

    return(
        <AuthContext.Provider value={{ 
            signIn, 
            signOut,
            updateProfile,
            user: data.user
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context;
}

export { AuthProvider, useAuth }