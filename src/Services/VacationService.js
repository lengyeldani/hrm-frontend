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

export function cancelVacation(id) {
    const url = apiEndpoint + 'vacations/cancelVacation/' + id;

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

export function changeVacationStatus(id,data) {
    const url = apiEndpoint + 'vacations/update/' + id;

    return fetch(url, {
        headers,
        method:'PUT',
        body:JSON.stringify(data)
    })
}

export function showByUser(id, current_page) {
    const url = apiEndpoint + 'vacations/showByUser/' + id + '?page='+ current_page;

    return fetch(url, {
        headers,
        method:'GET'
    })
}

export function managerVacationStatuses() {
    const url = apiEndpoint + 'vacations/vacationStatusesForManager';

    return fetch(url, {
        headers,
        method:'GET'
    })
}