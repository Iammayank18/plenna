import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { getRootReducer } from "./RootReducer";
import rootSagas from "./RootSagas";

import AsyncStorage from "@react-native-async-storage/async-storage";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export default function configureStore() {
  const middlewareEnhancer = applyMiddleware(sagaMiddleware);

  const composedEnhancers = compose(middlewareEnhancer);
  const persistedReducer = persistReducer(persistConfig, getRootReducer());

  const store = createStore(persistedReducer, undefined, composedEnhancers);
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSagas);
  return { store, persistor };
}
