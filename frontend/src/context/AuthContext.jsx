import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
const C = createContext(); export const useAuth=()=>useContext(C);
export function AuthProvider({children}){const [user,setUser]=useState(null);const [dark,setDark]=useState(false);
useEffect(()=>{document.documentElement.classList.toggle('dark',dark);},[dark]);
useEffect(()=>{if(localStorage.getItem('token')) api.get('/users/me').then(r=>setUser(r.data)).catch(()=>localStorage.removeItem('token'));},[]);
const logout=()=>{localStorage.removeItem('token');setUser(null)};
return <C.Provider value={{user,setUser,logout,dark,setDark}}>{children}</C.Provider>;}
