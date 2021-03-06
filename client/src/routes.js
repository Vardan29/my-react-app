import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {DetailPage} from './pages/DetailPage'
import {TodoPage} from './pages/TodoPage'
import {AuthPage} from './pages/AuthPage'


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/todos" exact>
                    <TodoPage />
                </Route>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/detail/:id" >
                    <DetailPage />
                </Route>
                <Redirect to="/links"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}