import { listFetchInit, listFetchSuccess, listFetchFailure } from './actions'
import { url } from './consts';
import { call } from 'libs/api-helpers'
import { fetchListMock } from './mocks'

export const getList = () => (dispatch) => {
    dispatch(listFetchInit());

    call(`${url}/items/wat`, 'GET', {}, data => data, fetchListMock)
        .then(response => dispatch(listFetchSuccess(response)))
        .catch(error => dispatch(listFetchFailure(error)))
}