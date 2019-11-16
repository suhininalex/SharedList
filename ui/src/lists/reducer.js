import {
    FETCH_LIST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_ERROR,
    LIST_ADD_ITEM
} from './consts';

const initialState = {
    status: 'none',
    data: {},
    error: null
};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_LIST:
            return {
                ...state,
                status: action.payload.status
            };

        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                data: action.payload.data
            };

        case FETCH_LIST_ERROR:
            return {
                ...state,
                status: action.payload.status,
                error: action.payload.error
            };
        
        case LIST_ADD_ITEM:
            return {
                ...state,
                data: {
                    ...state.data,
                    items: [...state.data.items, action.payload.item]
                }
            }

        default:
            return state;
    }
}

export { listsReducer }