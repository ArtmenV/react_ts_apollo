import * as UIA from 'ui/modules/ActivityPreview/Actions';
import { GQLConcreteContext } from '../types';
import { isActivityFollowed } from './isActivityFollowed';
export const getActivityActions = (
  context: GQLConcreteContext,
  replyFormik: UIA.ReplyActions['replyFormik'],
  toggleLikeFormik: UIA.LikeActions['toggleLikeFormik']
): null | UIA.ActionProps => {
  if (!isActivityFollowed(context)) {
    return null;
  }
  const like: null | UIA.LikeActions =
    'Community' !== context.__typename && 'myLike' in context
      ? {
          toggleLikeFormik,
          iLikeIt: !!context.myLike,
          totalLikes:
            'likes' in context
              ? context.likes && context.likes.totalCount
              : null
        }
      : null;

  const reply: null | UIA.ReplyActions = {
    replyFormik
  };

  return {
    like,
    reply
  };
};
