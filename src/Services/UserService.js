import {apiEndpoint} from '../Config';

const headers = {
    "Content-Type":"application/json",
    "Accept": "application/json"
}

const fetchOptions = {
    credentials:"include"
}

export function getLoggedInUser() {
    const url = apiEndpoint + 'users/loggedInUser';

    return fetch(url,{
        ...fetchOptions
    })
}

export function getUsers() {
    const url = apiEndpoint + 'users/index';

    return fetch(url, {
        //...fetchOptions,
        headers,
        method:'GET'
    })
}

export function getRoles(){
    const url = apiEndpoint + 'users/roles';

    return fetch(url, {
        headers,
        method:'GET'
    })
}

export function getDepartments() {
    const url = apiEndpoint + 'users/departments';

    return fetch(url, {
        headers,
        method:'GET'
    })
}

export function addUser(data) {
    const url = apiEndpoint + 'users/store';

    return fetch(url, {
        headers,
        method:'POST',
        body:JSON.stringify(data)
    })
}