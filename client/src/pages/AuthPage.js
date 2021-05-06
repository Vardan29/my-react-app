import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'



export const AuthPage = ()=>{
    
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request,error,clearError} = useHttp()
    const [form,setForm] = useState({
        name:'',
        surname:'',
        birth:'',
        gender: '',
        phone:'',
        email:'',
        password:'',
        passwordVerify:''
    })
    const [form1,setForm1] = useState({
        email1:'',
        password1:''
    })
    useEffect(()=>{
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })  
    }
    const changeLoginHandler = event => { setForm1({
            ...form1,
            [event.target.name]:event.target.value
        })
    }
    

    const registerHandler = async () => {
        try{
            if(form.password===form.passwordVerify)
            {
                const data = await request(
                '/api/auth/register',
                'POST',
                {...form})
                message(data.message)
            
            }else(message('Check your password and try again'))
           
        }catch(err){}
    }
    const loginHandler = async () => {
        try{
            const data = await request(
                '/api/auth/login',
                'POST',
                {...form1})
                auth.login(data.token, data.userId)
        }catch(err){}
    }

    return(
        <div className="row">
            <div className="col s12 ">
                <h1>My React App</h1>
                <div className="card light-blue darken-4 myFlex">
                    <div className="card-content white-text col s5  auth-margin">
                        <span className="card-title">Authorize</span>
                        <div className="input-field">
                            <input placeholder="Enter E-mail" id="email1"
                                type="text" name="email1" className="white-text" 
                                value={form1.email1}
                                onChange={changeLoginHandler}
                            />
                            <label htmlFor="email1">E-mail</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Enter Password" id="password1"
                                type="password" name="password1" className="white-text"
                                value={form1.password1}
                                onChange={changeLoginHandler}
                            />
                            <label htmlFor="password1">Password</label>
                        </div>
                        <div className="card-action">
                            <button 
                                className="btn green accent-4 white-text pad" 
                                disabled={loading}
                                onClick={loginHandler}
                            >Log In</button> 
                            
                        </div>
                    </div>
                    <div className="card-content white-text col s5 ">
                        <span className="card-title">Register</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter Your Name" id="name"
                                    type="text" name="name" className="white-text" 
                                    value={form.name}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter Your Surname" id="surname"
                                    type="text" name="surname" className="white-text" 
                                    value={form.surname}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="surname">Surname</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter E-mail" id="email"
                                    type="text" name="email" className="white-text" 
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field myFlex">
                                <p>Gender</p>
                                <p>
                                <label>
                                    <input 
                                        className="with-gap"
                                        id="male"
                                        name="gender" 
                                        type="radio"   
                                        value='Male'
                                        onChange={changeHandler}
                                    />
                                    <span>Male</span>
                                </label>
                                </p>
                                <p>
                                <label>
                                    <input 
                                        className="with-gap"
                                        id="female"
                                        name="gender" 
                                        type="radio"  
                                        value='Female'
                                        onChange={changeHandler}
                                    />
                                    <span>Female</span>
                                </label>
                                </p>
                            </div>
                            <div className="input-field">
                                <input
                                    type="date"
                                    id='birth' 
                                    name='birth'
                                    min="1920-01-01" max="2016-12-31"
                                    className="datepicker  white-text"
                                    value={form.birth}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="birth">Birth Date</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter Password" id="password"
                                    type="password" name="password" className="white-text"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Verify Password" id="passwordVerify"
                                    type="password" name="passwordVerify" className="white-text"
                                    value={form.passwordVerify}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="passwordVerify">Verify Password</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter Your Phone" id="phone"
                                    type="text" name="phone" className="white-text"
                                    value={form.phone}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>
                        </div>
                    
                        <div className="card-action">
                            <button 
                                className="btn deep-orange darken-2 white-text pad"
                                onClick={registerHandler}
                                disabled={loading}
                            >Sign Up</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}