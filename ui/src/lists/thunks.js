import { listFetchInit, listFetchSuccess, listFetchFailure, listAddItem, listRemoveItem, removeList } from './actions';
import { url } from './consts';
import { call } from 'libs/api-helpers';
// import { fetchListMock } from './mocks'

export const getList = (listId) => (dispatch) => {
    dispatch(listFetchInit());

    call(`${url}/lists/${listId}`, 'GET', {}, data => data)
        .then(response => {
            dispatch(listFetchSuccess(response));
            window.document.title = response.name;
        })
        .catch(error => dispatch(listFetchFailure(error)))
}

export const addListItem = (listId, item) => (dispatch) => {
    return call(`${url}/lists/${listId}/items`, 'PUT', {}, data => data, null, item)
        .then(response => dispatch(listAddItem(response)))
}

export const deleteListItem = (listId, itemid) => (dispatch) => {
    call(`${url}/lists/${listId}/items/${itemid}`, 'DELETE', {}, data => data)
        .then(response => dispatch(listRemoveItem(itemid)))
}

export const deleteList = (listId) => (dispatch) => {
    return call(`${url}/lists/${listId}`, 'DELETE', {}, data => data)
        .then(response => dispatch(removeList(listId)))
}