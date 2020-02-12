import { toast } from 'react-toastify';
import { showToastMessage } from './action';
import { Middleware } from 'redux';

export const ToastMiddleware: Middleware = store => next => action => {
  if (showToastMessage.is(action)) {
    const { content, options } = action.payload;
    toast(content, options);
  }
  return next(action);
};
