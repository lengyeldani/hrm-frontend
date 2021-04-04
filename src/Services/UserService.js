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