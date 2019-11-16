import {
    FETCH_LIST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_ERROR
} from './consts';

export const listFetchInit = () => {
    return {
        type: FETCH_LIST,
        payload: {
            status: 'loading'
        }
    }
}

export const listFetchSuccess = (list) => {
    return {
        type: FETCH_LIST_SUCCESS,
        payload: {
            status: 'success',
            data: list
        }
    }
}

export const listFetchFailure = (error) => {
    return { 
        type: FETCH_LIST_ERROR, 
        payload: {
            status: 'failure',
            error
        } 
    }
}