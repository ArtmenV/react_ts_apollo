import * as UIP from 'ui/modules/ActivityPreview/preview';
import { GQLConcreteContext, VerbType } from '../types';
import { getActivitySimpleLink } from './getActivitySimpleLink';

export type VerbMapKey = keyof typeof verbMap;
export const verbMap = {
  Create: UIP.ContextVerb.Created,
  Update: UIP.ContextVerb.Updated,
  Flag: UIP.ContextVerb.Flag,
  Follow: UIP.ContextVerb.Follow,
  Like: UIP.ContextVerb.Like
};
export const getActivityContext = (
  gqlContext: GQLConcreteContext,
  verbType: VerbType
): UIP.Context | null => {
  const context: null | UIP.Context =
    gqlContext.__typename === 'Collection'
      ? {
          verb: verbMap[verbType],
          link: getActivitySimpleLink(gqlContext),
          type: UIP.ContextType.Collection,
          icon: gqlContext.icon || '',
          title: gqlContext.name,
          summary: gqlContext.summary || ''
        }
      : gqlContext.__typename === 'Comment'
        ? {
            verb: verbMap[verbType],
            //FIXME https://gitlab.com/moodlenet/meta/issues/185
            //@ts-ignore
            link: getActivitySimpleLink(gqlContext.thread),
            type: UIP.ContextType.Comment,
            content: gqlContext.content
          }
        : gqlContext.__typename === 'Community'
          ? {
              verb: verbMap[verbType],
              link: getActivitySimpleLink(gqlContext),
              type: UIP.ContextType.Community,
              icon: gqlContext.icon || '',
              title: gqlContext.name,
              summary: gqlContext.summary || ''
            }
          : gqlContext.__typename === 'Resource'
            ? {
                verb: verbMap[verbType],
                //FIXME https://gitlab.com/moodlenet/meta/issues/185
                //@ts-ignore
                link: getActivitySimpleLink(gqlContext.collection),
                type: UIP.ContextType.Resource,
                icon: gqlContext.icon || '',
                title: gqlContext.name,
                summary: gqlContext.summary || '',
                resourceUrl: gqlContext.url || ''
              }
            : gqlContext.__typename === 'User'
              ? {
                  verb: verbMap[verbType],
                  link: getActivitySimpleLink({
                    ...gqlContext,
                    id: gqlContext.userId
                  }),
                  type: UIP.ContextType.Resource,
                  icon: gqlContext.icon || gqlContext.image || '',
                  summary: '',
                  title: gqlContext.userName || ''
                }
              : null; // gqlContext: never

  return context;
};
