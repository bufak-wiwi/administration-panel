import store from '../redux/store'
import {baseURL, apiKey} from '../config/globals'

export function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

export async function apiFetch(path, method, body) {
    const { auth } = store.getState()
    return await fetch(`${baseURL}/${path}?apikey=${apiKey}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'jwttoken': auth ? auth.token : '',
            'conference_id': 2
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}