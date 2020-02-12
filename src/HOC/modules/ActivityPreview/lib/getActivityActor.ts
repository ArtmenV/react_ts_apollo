import * as UIT from 'ui/modules/ActivityPreview/types';
import * as APGQL from '../getActivityPreview.generated';
import { getActivitySimpleLink } from './getActivitySimpleLink';
export const getActivityActor = (
  usr: APGQL.ActivityPreviewUserCtxFragment
): UIT.Actor => {
  return {
    icon: usr.icon || usr.image || '',
    name: usr.userName || '',
    link: getActivitySimpleLink({ ...usr, id: usr.userId })
  };
};
