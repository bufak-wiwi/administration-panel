import store from '../redux/store'
import _ from 'lodash'
import {baseURL, apiKey} from '../config/globals'
import moment from 'moment';
import {isMobile} from 'react-device-detect';
require('moment/locale/de.js')

export function isMobileDevice() {
    return isMobile
};

export const shouldObjectBeUpdated = (stateObj, propsObj, editing)  => {
    return (!stateObj && propsObj) || (!editing && !isSubset(propsObj, stateObj))
}

export const isSubset = (subset, superset) => {
    return _.every(subset, (val, key) => _.isEqual(val, superset[key]))
}

export const toGermanTime = (x) => {
    return moment(x).format('dddd HH:mm') + ' Uhr'
}

export async function apiFetch(path, method, body) {
    const { auth } = store.getState()
    const { conferenceId } = store.getState().conference

    return await fetch(`${baseURL}/${path}?apikey=${apiKey}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'jwttoken': auth ? auth.token : '',
            'conference_id': conferenceId
        },
        body: JSON.stringify(body)
    })
    .then(async res => {
        try {
            if (!res.ok) {
                if (res.status === 401 || res.status === 418) {
                    store.dispatch({ type: 'LOGOUT'})
                } else if (res.status > 500 && res.status < 600){
                    store.dispatch({ type:'UPDATE_SERVER_ERROR',serverError:true})
                }
                return false
            }
            var result = await res.text()
            return result.length > 0 ? JSON.parse(result) : true
        } catch(e) {
            console.log('catched error', e)
            return false
        }
    })
    .catch(e => console.log('ApiFetch', e))
}

export const unknown = 'UNKNOWN';
export const unapplied = 'UNAPPLIED'; 
export const applied = 'APPLIED';
export const attendee = 'ATTENDEE';
export const noAttendee ='NO_ATTENDEE';
export const rejected = 'REJECTED';
export const phaseClosed = 'PHASE_CLOSED';

export function getUserStatusForConference() {
    const { userForConference } = store.getState().auth
    const { conferenceId } = store.getState().conference
    if (!userForConference || !conferenceId) {
        return unknown
    }

    var conferenceObj = userForConference.find(x => x.conference_ID === conferenceId)
    if (!conferenceObj || (!conferenceObj.applied && !conferenceObj.attendee && !conferenceObj.rejected)) {
        return unapplied;
    } 
    if (conferenceObj.attendee) {
        return attendee;
    }

    if (conferenceObj.rejected) {
        return rejected
    }

    if (conferenceObj.applied && !conferenceObj.attendee && !conferenceObj.rejected) {
        return applied;
    }
}

export function isApplied(userForConference, conferenceId) {
    return getUserStatusForConference(userForConference, conferenceId) === applied
}

export function isUnapplied(userForConference, conferenceId) {
    return getUserStatusForConference(userForConference, conferenceId) === unapplied
}

export function isAttendee(userForConference, conferenceId) {
    return getUserStatusForConference(userForConference, conferenceId) === attendee
}

export function isRejected(userForConference, conferenceId) {
    return getUserStatusForConference(userForConference, conferenceId) === rejected
}

export function currentlyBufak(conference) {
    const currentDay = moment()
    const startDay = moment(conference.dateStart)
    const endDay = moment(conference.dateEnd);
    return currentDay.isSame(startDay) || currentDay.isSame(endDay) || currentDay.isBetween(startDay, endDay, 'days')
}

//#region WorkshopApplication
export function getWorkshopApplicationStatus(workshopApplication, workshopApplicationPhase, userForConference, conferenceId) {
    if (!isAttendee(userForConference, conferenceId)) {
        return noAttendee
    } else if (workshopApplication !== [] && workshopApplication.length > 0) {
        if (workshopApplication.some(x => x.status === "IsAttendee")) {
            return attendee
        } else {
            return applied
        }
    } else if (!workshopApplicationPhase) {
        return phaseClosed
    } else {
        return unapplied
    }
}
//#endregion