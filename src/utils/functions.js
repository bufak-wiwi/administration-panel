import store from '../redux/store'
import {baseURL, apiKey} from '../config/globals'

export function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

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
export const rejected = 'REJECTED';

export function getUserStatusForConference() {
    const { userForConference }= store.getState().auth
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