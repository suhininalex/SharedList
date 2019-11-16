import { listFetchInit, listFetchSuccess, listFetchFailure, listAddItem, listRemoveItem } from './actions';
import { url } from './consts';
import { call } from 'libs/api-helpers';
// import { fetchListMock } from './mocks'

export const getList = (id) => (dispatch) => {
    dispatch(listFetchInit());

    call(`${url}/lists/${id}`, 'GET', {}, data => data)
        .then(response => {
            dispatch(listFetchSuccess(response));
            window.document.title = response.name;
        })
        .catch(error => dispatch(listFetchFailure(error)))
}

export const addListItem = (item) => (dispatch) => {
    return call(`${url}/lists/test/items`, 'PUT', {}, data => data, null, item)
        .then(response => dispatch(listAddItem(response)))
}

export const deleteListItem = (id) => (dispatch) => {
    call(`${url}/lists/test/items/${id}`, 'DELETE', {}, data => data)
        .then(response => dispatch(listRemoveItem(id)))
}