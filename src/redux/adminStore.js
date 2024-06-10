import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminReducer from './adminSlice'; // Import admin reducer

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    admin: adminReducer, // Add admin reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const adminStore = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(adminStore);

export default adminStore;
