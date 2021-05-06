import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import {Loader} from '../components/Loader'

export const TodoPage = ()=>{
    const auth = useContext(AuthContext)
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
    const {loading,request} = useHttp()

    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try{
                await request('/api/todo/generate','POST', {text:todo},{
                    Authorization:`Bearer ${auth.token}`
                })
                setTodo('')
                fetchTodo()
                
                
            }catch(e){}
        }
    }
    const removeTodo = async (arg)=>{
        try{ 
            await request(`/api/todo/${arg}`,'DELETE',{_id:arg},{
                Authorization: `Bearer ${auth.token}`
            })
            fetchTodo()
            
            
        }catch(e){}
    }
  
    const fetchTodo = useCallback(async () => {
        try{
            const fetched = await request('/api/todo','GET',null,{
                Authorization: `Bearer ${auth.token}`
            })
            setTodos(fetched)
        }catch(e){}
    },[auth.token,request])
    
   
    

    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    useEffect(()=>{
        fetchTodo()
    },[fetchTodo])
   
    if(loading){
        return <Loader/>
    }
    
    return(
        <>  
            <div className='row'>
                <div className='col s12' >
                <input placeholder="Enter Todo" id="todo"
                    type="text"  
                    value={todo}
                    onChange={e=>setTodo(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor='todo'>Enter todo</label>
                </div>
            </div>
            {!loading && 
            <>
            <table className="highlight">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Todo</th>
                    <th>Date</th>
                    <th>Delete</th>
                </tr>
                </thead>

                <tbody>
                {todos.map((todo,index) =>{
                    return (
                        <tr key={todo._id}>
                            <td>{index+1}</td>
                            <td>{todo.text}</td>
                            <td>{todo.date}</td>
                            <td>
                               <button  className="btn red darken-3 white-text" onClick={()=>{removeTodo(todo._id)}}  >Remove</button>
                            </td> 
                           
                        </tr>
                    )
                })}
                
                </tbody>
            </table>
        </>}
        </>
    )
}

