import { listFetchInit, listFetchSuccess, listFetchFailure, listAddItem } from './actions'
import { url } from './consts';
import { call } from 'libs/api-helpers'
import { fetchListMock } from './mocks'

export const getList = () => (dispatch) => {
    dispatch(listFetchInit());

    call(`${url}/lists/test`, 'GET', {}, data => data)
        .then(response => dispatch(listFetchSuccess(response)))
        .catch(error => dispatch(listFetchFailure(error)))
}

export const addListItem = (item) => (dispatch) => {
    return call(`${url}/lists/test/items`, 'PUT', {}, data => data, null, item)
        .then(response => dispatch(listAddItem(response)))
}