import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../redux/store'
import PageSpinner from './PageSpinner';
import MissingPermissions from './MissinPermissions'

export const PrivateRoute = ({...route}) => {
    const { user } = store.getState().auth
    if (user) {
        return <Route {...route} />
    } else {
        return <Redirect to={{ pathname: '/login' , state: { from: route.path}}} />
    }
}

export const isAdministrator = () => {
    const { conferenceId } = store.getState().conference
    const { userForConference } = store.getState().auth
    if (! conferenceId || !userForConference) {
        return false
    } else {
        const permission = userForConference.find(x => x.conference_ID === conferenceId)
        if (permission && permission.admin) {
            return true 
        } else { 
            return false
        }
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
        if (isAdministrator()) {
            return <Route {...route} />
        } else {
            return <MissingPermissions />
        }
    }
}

export const SuperAdminRoute = ({...route}) => {
    const { user } = store.getState().auth
    if  (!user) {
        return <Redirect to={{ pathname: '/login' , state: { from: route.path}}} />
    }

    if (user.isSuperAdmin) {
        return <Route {...route} />
    } else {
        return <MissingPermissions />
    }
}