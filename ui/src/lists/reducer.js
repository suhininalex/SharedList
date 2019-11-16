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

const initialState = {
    status: 'none',
    data: {},
    newName: '',
    error: null
};

const productListReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_LIST:
            return {
                ...state,
                status: action.payload.status
            };

        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                newName: action.payload.data.name,
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

        case LIST_REMOVE_ITEM:
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.filter(item => item.name !== action.payload.id)
                }
            }

        case REMOVE_LIST:
            return initialState

        case LIST_CHANGE_NEW_NAME: {
            return {
                ...state,
                newName: action.payload.name
            }
        }

        case LIST_CHANGE_CURRENT_NAME: {
            return {
                ...state,
                data: {
                    ...state.data,
                    name: action.payload.name
                }
            }
        }

        default:
            return state;
    }
}

export { productListReducer }