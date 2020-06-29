import {store} from '../redux/store'
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
            'conference_id': conferenceId || 2 // TODO: fix hack
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


/**
 * In a normal application the priority is returned, whereas in an special application the group is returned
 * @param {*} application the application
 */
export function getPriorityOrType(application) {
    if (application.isAlumnus) {
        return 'Alumnus'
    }
    if (application.isHelper) {
        return 'Helfer'
    }
    if (application.isBuFaKCouncil) {
        return 'BuFaK Rat'
    }
    return application.priority
}

/**
 * Returns the type of an applicant in natural language
 * @param {*} application the application
 */
export function getType(application) {
    if (application.isAlumnus) {
        return 'Alumnus'
    }
    if (application.isHelper) {
        return 'Helfer'
    }
    if (application.isBuFaKCouncil) {
        return 'BuFaK Rat'
    }
    return 'Teilnehmer'
}

/**
 * Returns the status of the application in natural language
 * @param {*} application the application
 */
export function getStatus(application) {
   switch(application.status) {
       case 'HasApplied':
           return 'ausstehend'
        case 'IsRejected':
            return 'abgelehnt'
        case 'IsAttendee':
            return 'angenommen'
        default:
            return 'unbekannt'
   } 
}

//#region WorkshopApplication
export function getWorkshopApplicationStatus(workshopApplication, workshopApplicationPhase, userForConference, conferenceId) {
    if (!isAttendee(userForConference, conferenceId)) {
        return noAttendee
    } else  {
        const workshopsOfConference = workshopApplication.filter(x => x.workshop && x.workshop.conferenceID === conferenceId)
        if (workshopsOfConference.length > 0) {
            if (workshopsOfConference.some(x => x.status === "IsAttendee")) {
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
}
//#endregion