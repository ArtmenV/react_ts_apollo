import * as APGQL from '../getActivityPreview.generated';
import { GQLConcreteContext } from '../types';

export const getActivityGqlConcreteContext = (
  context: APGQL.ActivityPreviewDataFragment['context']
): GQLConcreteContext | null => {
  if (!context) {
    return null;
  }

  const gqlContext: null | GQLConcreteContext =
    context.__typename === 'Collection' ||
    context.__typename === 'Community' ||
    context.__typename === 'Comment' ||
    context.__typename === 'Resource'
      ? context // simple direct concrete object ctx
      : context.__typename === 'Flag' ||
        context.__typename === 'Follow' ||
        context.__typename === 'Like'
        ? //FIXME https://gitlab.com/moodlenet/meta/issues/185
          //@ts-ignore
          context.context.__typename === 'Thread' // if VERB'ed ona a thread we should go deeper
          ? //FIXME https://gitlab.com/moodlenet/meta/issues/185
            //@ts-ignore
            context.context.context.__typename === 'Flag' // if it's thread about a flag go deeper
            ? //FIXME https://gitlab.com/moodlenet/meta/issues/185
              //@ts-ignore
              context.context.context.context // simple thread's flag's concrete object ctx
            : //FIXME https://gitlab.com/moodlenet/meta/issues/185
              //@ts-ignore
              context.context.context // if not VERB'ed ona a thread use that context
          : context.context
        : null; // context: never

  if (!gqlContext) {
    return null;
  }

  return gqlContext;
};
