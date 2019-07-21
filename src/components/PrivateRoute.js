import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../redux/store'
import PageSpinner from './PageSpinner';

export const PrivateRoute = ({...route}) => {
    const { user } = store.getState().auth
    if (user) {
        return <Route {...route} />
    } else {
        return <Redirect to={{ pathname: '/login' , state: { from: route.path}}} />
    }
}

export const AdministratorRoute = ({...route}) => {
    const { conferenceId } = store.getState().conference
    const { user, userForConference } = store.getState().auth
    if  (!user) {
        return <Redirect to={{ pathname: '/login' , state: { from: route.path}}} />
    }

    if (!conferenceId || !userForConference) {
        return <PageSpinner color="primary" />
    } else {
        const permission = userForConference.find(x => x.conference_ID === conferenceId)
        console.log('Permission', permission)
        if (permission && permission.admin) {
            return <Route {...route} />
        } else {
            return <Redirect to="/" />
        }
    }
}