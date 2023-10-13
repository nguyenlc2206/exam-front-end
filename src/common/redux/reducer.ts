import { combineReducers } from 'redux';
import snackbarReducer from '@package:src/common/redux/slice/snackbar';
import menuReducer from '@package:src/common/redux/slice/menu';
import examReducer from '@package:src/common/redux/slice/exam';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        menuReducer
    ),
    exam: persistReducer(
        {
            key: 'exam',
            storage,
            keyPrefix: 'questions-'
        },
        examReducer
    )
});

export default reducer;
