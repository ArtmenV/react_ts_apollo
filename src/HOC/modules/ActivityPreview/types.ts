import * as APGQL from './getActivityPreview.generated';
import * as UIP from 'ui/modules/ActivityPreview/preview';

export type MaybeActivityPreviewData =
  | APGQL.ActivityPreviewDataFragment
  | null
  | undefined;

export type GQLConcreteContext =
  | APGQL.ActivityPreviewCommentCtxExtendedFragment
  | APGQL.ActivityPreviewResourceCtxFragment
  | APGQL.ActivityPreviewCollectionCtxFragment
  | APGQL.ActivityPreviewCommunityCtxFragment
  | APGQL.ActivityPreviewUserCtxFragment;

export const verbMap = {
  Create: UIP.ContextVerb.Created,
  Update: UIP.ContextVerb.Updated,
  Flag: UIP.ContextVerb.Flag,
  Follow: UIP.ContextVerb.Follow,
  Like: UIP.ContextVerb.Like
};

export type VerbType = keyof typeof verbMap;
