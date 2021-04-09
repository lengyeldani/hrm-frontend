import {apiEndpoint} from '../Config';

const headers = {
    "Content-Type":"application/json",
    "Accept": "application/json"
}

const fetchOptions = {
    credentials:"include"
}

export function addVacation(data) {
    const url = apiEndpoint + 'vacations/store';

    return fetch(url, {
        headers,
        method:'POST',
        body:JSON.stringify(data)
    })
}

export function getVacations(id, current_page) {
    const url = apiEndpoint + 'vacations/showByUser/'+ id +'?page=' + current_page;

    return fetch(url, {
        headers,
        method:'GET'
    })
}

export function getVacationStatuses() {
    const url = apiEndpoint + 'vacations/vacationStatuses';

    return fetch(url, {
        headers,
        method:'GET'
    })
}

export function changeVacationStatus(data) {
    const url = apiEndpoint + 'vacations/changeVacationStatus';

    return fetch(url, {
        headers,
        method:'POST',
        body:JSON.stringify(data)
    })
}