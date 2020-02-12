import * as UIP from 'ui/modules/ActivityPreview/preview';
import * as APGQL from '../getActivityPreview.generated';
import { getActivityActor } from './getActivityActor';
import { getActivitySimpleLink } from './getActivitySimpleLink';
export const getActivityInReplyContext = (
  context: APGQL.ActivityPreviewDataFragment['context']
): null | UIP.InReplyToContext => {
  if (!context) {
    return null;
  }

  if (context.__typename !== 'Comment') {
    return null;
  } else if (context.inReplyTo) {
    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    const actor = getActivityActor(context.inReplyTo.creator!);
    return {
      //FIXME https://gitlab.com/moodlenet/meta/issues/185
      actor: getActivityActor(context.inReplyTo.creator!),
      //FIXME https://gitlab.com/moodlenet/meta/issues/185
      link: getActivitySimpleLink(context.inReplyTo.thread!),
      desc: context.inReplyTo.content,
      icon: actor.icon
    };
  }
  //FIXME https://gitlab.com/moodlenet/meta/issues/185
  else if (context.thread!.context!.__typename === 'Flag') {
    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    if (
      !context.thread ||
      !context.thread.context ||
      context.thread.context.__typename !== 'Flag' ||
      !context.thread.context.context
    ) {
      return null;
    }

    const type =
      context.thread.context.context.__typename === 'Collection'
        ? UIP.ContextType.Collection
        : context.thread.context.context.__typename === 'Community'
          ? UIP.ContextType.Community
          : context.thread.context.context.__typename === 'Resource'
            ? UIP.ContextType.Resource
            : context.thread.context.context.__typename === 'Comment'
              ? UIP.ContextType.Comment
              : context.thread.context.context.__typename === 'User'
                ? UIP.ContextType.User
                : null;
    if (!type) {
      console.error(context);
      throw new Error(`Type Error: can't extract thread.flag.context type`);
    }

    return {
      actor:
        context.thread.context.context.__typename === 'User'
          ? null
          : //FIXME https://gitlab.com/moodlenet/meta/issues/185
            getActivityActor(context.thread.context.context.creator!),
      link: getActivitySimpleLink(
        context.thread.context.context.__typename === 'User'
          ? {
              ...context.thread.context.context,
              id: context.thread.context.context.userId
            }
          : context.thread.context.context.__typename === 'Resource'
            ? //FIXME https://gitlab.com/moodlenet/meta/issues/185
              context.thread.context.context.collection!
            : context.thread.context.context.__typename === 'Comment'
              ? //FIXME https://gitlab.com/moodlenet/meta/issues/185
                context.thread.context.context.thread!
              : context.thread.context.context
      ),
      icon:
        context.thread.context.context.__typename === 'Collection' ||
        context.thread.context.context.__typename === 'Community' ||
        context.thread.context.context.__typename === 'Resource' ||
        context.thread.context.context.__typename === 'User'
          ? context.thread.context.context.icon || ''
          : //FIXME https://gitlab.com/moodlenet/meta/issues/185
            context.thread.context.context.creator!.icon ||
            //FIXME https://gitlab.com/moodlenet/meta/issues/185
            context.thread.context.context.creator!.image ||
            '',
      desc:
        context.thread.context.context.__typename === 'Collection' ||
        context.thread.context.context.__typename === 'Community' ||
        context.thread.context.context.__typename === 'Resource'
          ? context.thread.context.context.name
          : context.thread.context.context.__typename === 'User'
            ? context.thread.context.context.userName || ''
            : context.thread.context.context.content
    };
  } else {
    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    if (
      !context.thread ||
      !context.thread.context ||
      !context.thread.context.__typename
    ) {
      return null;
    }

    const type =
      context.thread.context.__typename === 'Collection'
        ? UIP.ContextType.Collection
        : context.thread.context.__typename === 'Community'
          ? UIP.ContextType.Community
          : context.thread.context.__typename === 'Resource'
            ? UIP.ContextType.Resource
            : null; // context.thread.context: never
    if (!type) {
      console.error(context);
      throw new Error(`Type Error: can't extract thread.context type`);
    }

    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    if (
      !context.thread.context ||
      !('creator' in context.thread.context) ||
      !context.thread.context.creator ||
      (context.thread.context.__typename === 'Resource' &&
        !context.thread.context.collection)
    ) {
      return null;
    }

    return {
      actor: getActivityActor(context.thread.context.creator),
      link: getActivitySimpleLink(
        context.thread.context.__typename === 'Resource'
          ? //FIXME https://gitlab.com/moodlenet/meta/issues/185
            context.thread.context.collection!
          : context.thread.context
      ),
      desc: context.thread.context.name,
      icon: context.thread.context.icon || ''
    };
  }
};
