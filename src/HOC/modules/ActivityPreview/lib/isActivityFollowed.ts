import { GQLConcreteContext } from '../types';

export const isActivityFollowed = (context: GQLConcreteContext): boolean => {
  if (context.__typename === 'Community') {
    return !!context.myFollow;
  } else if (context.__typename === 'Collection') {
    return !!(context.community && context.community.myFollow);
  } else if (context.__typename === 'Resource') {
    return !!(
      context.collection &&
      context.collection.community &&
      context.collection.community.myFollow
    );
  } else if (context.__typename === 'User') {
    return !!context.myFollow;
  } else if (context.__typename === 'Comment') {
    return !!(
      context.thread &&
      context.thread.context &&
      context.thread.context.__typename !== 'Flag' &&
      isActivityFollowed(context.thread.context)
    );
  }
  return false;
};
