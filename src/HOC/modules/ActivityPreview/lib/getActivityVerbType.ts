import * as GQL from 'graphql/types.generated';
import * as APGQL from '../getActivityPreview.generated';
import { VerbType } from '../types';

export const getActivityVerbType = (
  activity: APGQL.ActivityPreviewDataFragment
): VerbType | null => {
  if (!activity.context) {
    return null;
  }

  const verbType: null | VerbType =
    activity.context.__typename === 'Flag' ||
    activity.context.__typename === 'Like' ||
    activity.context.__typename === 'Follow'
      ? activity.context.__typename
      : activity.verb === GQL.ActivityVerb.Created
        ? 'Create'
        : activity.verb === GQL.ActivityVerb.Updated
          ? 'Update'
          : null; // activity.verb: never

  return verbType;
};
