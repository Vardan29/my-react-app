import React, { useContext, useState, useCallback, useEffect } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const Navbar = () =>{
    const [user, setUser] = useState([])
    const {request}=useHttp()
    const auth = useContext(AuthContext)
    const data = useCallback(async () => {
        try{
            const data = await request('/api','GET', null,{
                Authorization:`Bearer ${auth.token}`
            })
            setUser(data)
        }catch(e){}
    },[auth.token,request])
    useEffect(()=>{
        data()
    },[data])
    
    const history = useHistory()
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper blue darken-4">
            <span className="brand-logo">{user[0]} {user[1]}</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/links">Links</NavLink></li>
                <li><NavLink to="/todos">Todos</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Log Out</a></li>
              
                
            </ul>
            </div>
        </nav>
    )
}