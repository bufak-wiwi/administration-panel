import React from 'react';
import { Redirect } from 'react-router-dom';
import LayoutRoute from './Layout/LayoutRoute'
import store from '../redux/store'
import PageSpinner from './PageSpinner';
import MissingPermissions from './MissingPermissions'

export const PrivateRoute = ({...route}) => {
    const { user } = store.getState().auth
    if (user) {
        return <LayoutRoute {...route} />
    } else {
        return <Redirect to={{ pathname: '/login' , state: { from: route.location.pathname}}} />
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

export const IsSuperAdmin = () => {
    const { user } = store.getState().auth
    return user && user.isSuperAdmin
}

export const AdministratorRoute = ({...route}) => {
    const { conferenceId } = store.getState().conference
    const { user, userForConference } = store.getState().auth
    if  (!user) {
        return <Redirect to={{ pathname: '/login' , state: { from: route.location.pathname}}} />
    }

    if (!conferenceId || !userForConference) {
        return <PageSpinner color="primary" />
    } else {
        if (isAdministrator()) {
            return <LayoutRoute {...route} />
        } else {
            return <MissingPermissions />
        }
    }
}

export const SuperAdminRoute = ({...route}) => {
    const { user } = store.getState().auth
    if  (!user) {
        return <Redirect to={{ pathname: '/login' , state: { from: route.location.pathname}}} />
    }

    if (user.isSuperAdmin) {
        return <LayoutRoute {...route} />
    } else {
        return <MissingPermissions />
    }
}