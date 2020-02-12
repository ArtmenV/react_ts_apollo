export const linkPathMap = {
  User: 'user',
  Community: 'communities',
  // Resource: 'resource',
  Thread: 'thread',
  Collection: 'collections'
};

export const getActivitySimpleLink = ({
  __typename,
  // isLocal,
  id
}: // canonicalUrl
{
  __typename: keyof typeof linkPathMap;
  // isLocal: boolean;
  id: string;
  // canonicalUrl?: string | null | undefined;
}) => `/${linkPathMap[__typename]}/${id}`;
