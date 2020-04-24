/**
 * create store
 */
import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger';

// 根 reducer
import rootReducer from './rootReducer';

const logger = createLogger();

// store conf
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<RootState>(), logger] as const,
  devTools: process.env.NODE_ENV !== 'production',
});

// 注释原因：此处不引入业务 reducer
// hot update --> install @types/webpack-env
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    console.log(newRootReducer);
    store.replaceReducer(newRootReducer);
  });
}

// 普通 dispatch
export type AppDispatch = typeof store.dispatch;

// 每当我们需要访问 Redux 存储状态时（mapState 函数 | useSelector 选择器）
export type RootState = ReturnType<typeof rootReducer>;

// thunk type
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
