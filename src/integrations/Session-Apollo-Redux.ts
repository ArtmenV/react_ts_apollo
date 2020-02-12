import { FetchResult } from 'apollo-link';
import {
  ConfirmEmailMutationMutation,
  ConfirmEmailMutationMutationOperation
} from '../graphql/confirmEmail.generated';
import {
  LoginMutationMutation,
  LoginMutationMutationOperation
} from '../graphql/login.generated';
import { LogoutMutationMutationOperation } from '../graphql/logout.generated';
import { login, logout } from '../redux/session';
import { DynamicLinkSrv } from '../util/apollo/dynamicLink';

export const integrateSessionApolloRedux = (
  dynamicLinkSrv: DynamicLinkSrv,
  dispatch: (msg: any) => unknown
) => {
  const setAuth = (
    resp: FetchResult<LoginMutationMutation | ConfirmEmailMutationMutation>
  ) => {
    if (resp.errors || !resp.data) {
      dispatch(logout.create());
      return;
    }
    const payload =
      'createSession' in resp.data
        ? resp.data.createSession
        : resp.data.confirmEmail;
    dispatch(payload ? login.create(payload.me) : logout.create());
  };

  dynamicLinkSrv.addLinkOpResult<ConfirmEmailMutationMutationOperation>(
    'confirmEmailMutation',
    setAuth
  );

  dynamicLinkSrv.addLinkOpResult<LoginMutationMutationOperation>(
    'loginMutation',
    setAuth
  );

  dynamicLinkSrv.addLinkOp<LogoutMutationMutationOperation>(
    'logoutMutation',
    (op, next) => {
      dispatch(logout.create());
      return next(op);
    }
  );
};
