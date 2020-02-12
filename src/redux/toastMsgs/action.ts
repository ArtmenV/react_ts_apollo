import { actionCtx } from '../../util/redux/Actions';
import { ToastContent, ToastOptions } from 'react-toastify';

export interface ShowPayload {
  content: ToastContent;
  options?: ToastOptions;
}
export const showToastMessage = actionCtx<'app.msg.toast', ShowPayload>(
  'app.msg.toast'
);
