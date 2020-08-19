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
// voting
export const draft = 'DRAFT';
export const accepted = 'ACCEPTED';
export const open = 'OPEN';

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

export function isApplied() {
    return getUserStatusForConference() === applied
}

export function isUnapplied() {
    return getUserStatusForConference() === unapplied
}

export function isAttendee() {
    return getUserStatusForConference() === attendee
}

export function isRejected() {
    return getUserStatusForConference() === rejected
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

//#region Voting
function expressionValid(expression) {
    return expression.match(/^([\s\d<>=()/*]|Math\.floor|Math\.ceiling)+$/)
}

function replaceValues(calculation, question) {
    return calculation
    .replace("ArrivedCouncilCount", question.arrivedCouncilCount)
    .replace("Yes", question.sumYes)
    .replace("No", question.sumNo)
    .replace("Abstention", question.sumAbstention)
}

export function getMajorityOfQuestion(question) {
    const { majorityList } = store.getState().voting
    if (majorityList.length === 0) {
        throw new Error("Keine Mehrheiten gefunden")
    } else {
        const majority = majorityList.find(x => x.majorityID === question.majorityID)
        if (!majority) {
            throw new Error(`Keine Mehrheit mit der ID ${question.majorityID} gefunden`);
        }
        return majority
    }
}

export function isQuestionAccepted(question) {
    const majority = getMajorityOfQuestion(question)
    const expression = replaceValues(majority.calculation, question)
    if (!expressionValid(expression)) {
        throw new Error("Expression not valid")
    }
    // eslint-disable-next-line no-eval
    return eval(expression)
}

export function getQuestionStatus(question) {
    try {
        if (!question.isOpen) {
            return draft
        } else if (!question.resolvedOn) {
            return open
        } else {
            return isQuestionAccepted(question) ? accepted : rejected
        }
    } catch (e) {
        return unknown
    }
}

export function getQuestionStatusText(question) {
    switch(getQuestionStatus(question)) {
        case open: return "offen";
        case accepted: return "angenommen";
        case rejected: return "abgelehnt";
        default: return "fehlerhaft";
    }
}

export function getQuestionStatusColor(question) {
    switch(getQuestionStatus(question)) {
        case open: return "warning";
        case accepted: return "success";
        case rejected: return "danger";
        default: return "primary";
    }
}

export function isQuestionSecret(question) {
    const majority = getMajorityOfQuestion(question)
    return majority.secret === "1"
}

export function getCouncilPriorityOfUser() {
    const { userForConference } = store.getState().auth
    const { conferenceId } = store.getState().conference
    if (!conferenceId || !userForConference || userForConference.length === 0) {
        throw new Error("ConferenceID or UserForeConference NULL")
    }
    const confObj = userForConference.find(x => x.conference_ID === conferenceId)
    if (!confObj || confObj.attendee !== true) {
        throw new Error("User is not attending the conference")
    }
    return confObj.priority
}

export function isUserAllowedToVote() {
    const { userForConference } = store.getState().auth
    const { conferenceId } = store.getState().conference
    if (!userForConference || !conferenceId) {
        return false
    }

    var conferenceObj = userForConference.find(x => x.conference_ID === conferenceId)
    return conferenceObj && conferenceObj.attendee && !conferenceObj.rejected && !conferenceObj.isAlumnus && !conferenceObj.isHelper
}

//#endregion