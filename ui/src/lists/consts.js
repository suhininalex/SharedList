export const FETCH_LIST = 'list/FETCH_INIT';
export const FETCH_LIST_SUCCESS = 'list/FETCH_SUCCESS';
export const FETCH_LIST_ERROR = 'list/FETCH_FAILURE';
export const LIST_ADD_ITEM = 'list/ADD_ITEM';
export const LIST_REMOVE_ITEM = 'list/REMOVE_ITEM';
export const REMOVE_LIST = 'list/DELETE_LIST';
export const LIST_CHANGE_NEW_NAME = 'list/CHANGE_NEW_NAME';
export const LIST_CHANGE_CURRENT_NAME = 'list/CHANGE_CURRENT_NAME';

export const url = window.location.hostname === 'localhost' ? 'http://95.158.51.96:8000/api' : `${window.location.protocol}//${window.location.host}/api`;