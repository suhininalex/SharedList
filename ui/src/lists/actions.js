import {
    FETCH_LIST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_ERROR,
    LIST_ADD_ITEM,
    LIST_REMOVE_ITEM,
    REMOVE_LIST,
    LIST_CHANGE_NEW_NAME,
    LIST_CHANGE_CURRENT_NAME
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

export const listAddItem = (item) => {
    return {
        type: LIST_ADD_ITEM,
        payload: {
            item
        }
    }
}

export const listRemoveItem = (id) => {
    return {
        type: LIST_REMOVE_ITEM,
        payload: {
            id
        }
    }
}

export const removeList = (id) => {
    return {
        type: REMOVE_LIST,
        payload: {
            id
        }
    }
}

export const changeNewListName = (name) => {
    return {
        type: LIST_CHANGE_NEW_NAME,
        payload: {
            name
        }
    }
}

export const changeListCurrentName = (name) => {
    return {
        type: LIST_CHANGE_CURRENT_NAME,
        payload: {
            name
        }
    }
}