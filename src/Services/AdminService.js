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