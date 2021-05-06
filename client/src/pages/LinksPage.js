import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = ()=>{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [links, setLinks] = useState([])
    const [link, setLink] = useState('')
    const {loading,request} = useHttp()

    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try{
                const data = await request('/api/link/generate','POST', {from:link},{
                    Authorization:`Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            }catch(e){}
        }
    }

    const fetchLink = useCallback(async () => {
        try{
            const fetched = await request('/api/link','GET',null,{
                Authorization: `Bearer ${auth.token}`
            })
            setLinks(fetched)
        }catch(e){}
    },[auth.token,request])
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    useEffect(()=>{
        fetchLink()
    },[fetchLink])
    
    if(loading){
        return <Loader/>
    }
    
    return(
        <>  
            <div className='row'>
                <div className='col s12' >
                <input placeholder="Enter link" id="link"
                    type="text"  
                    value={link}
                    onChange={e=>setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor='link'>Enter a link</label>
                </div>
            </div>
            {!loading && <LinksList links={links}/>}
        </>
    )
}

