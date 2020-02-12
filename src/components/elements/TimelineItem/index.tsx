// import { Trans } from '@lingui/react';
// import { DateTime } from 'luxon';
// import { clearFix } from 'polished';
// import * as React from 'react';
// import { SFC } from 'react';
// import { Star } from 'react-feather';
// import { NavLink } from 'react-router-dom';
// import { Box, Flex, Text } from 'rebass/styled-components';
// import removeMd from 'remove-markdown';
// import styled from '../../../themes/styled';
// import Link from '../Link/Link';
// import Actions from './Actions';
// import Preview from './preview';
// import media from 'styled-media-query';
// import { useLikeMutationMutation } from '../../../graphql/like.generated';
// import { useDeleteMutation } from '../../../graphql/delete.generated';

// interface Props {
//   userpage?: boolean;
//   user: any;
//   node: any;
// }

// const Item: SFC<Props> = ({ user, node, userpage }) => {
//   const [iLikeIt, setiLikeIt] = React.useState(false);
//   const [like] = useLikeMutationMutation();
//   const [undoLike] = useDeleteMutation();
//   const toggleLike = React.useCallback(
//     (contextId: string) => () => {
//       (iLikeIt ? undoLike : like)({ variables: { contextId } });
//       setiLikeIt(!iLikeIt);
//     },
//     [iLikeIt, like, undoLike]
//   );
//   return (
//     <FeedItem>
//       {node.activityType === 'CreateComment' && node.object.inReplyTo ? (
//         <NavigateToThread to={`/thread/${node.object.inReplyTo.id}`} />
//       ) : node.activityType === 'CreateComment' ||
//       node.activityType === 'LikeComment' ? (
//         <NavigateToThread to={`/thread/${node.object.id}`} />
//       ) : null}
//       {node.activityType === 'LikeComment' ? (
//         <Box>
//           <SubText mb={2}>
//             <Star size="20" color="#ca8f04" />
//             <NavLink style={{ marginRight: '4px' }} to="/">
//               {user.name}
//             </NavLink>
//             <Trans>boosted</Trans>
//           </SubText>
//           <MemberWrapped>
//             <MemberItem mr={2}>
//               <Img src={node.object.author.icon} />
//             </MemberItem>
//             <MemberInfo>
//               <Name>
//                 <Link to={'/user/' + node.object.author.id}>
//                   {node.object.author.name}{' '}
//                   {node.object.author.preferredUsername ? (
//                     <Username ml={2}>
//                       @{node.object.author.preferredUsername}
//                     </Username>
//                   ) : null}
//                 </Link>
//                 <Spacer mr={2}>·</Spacer>{' '}
//                 <Date>{DateTime.fromISO(node.published).toRelative()}</Date>
//               </Name>
//               <Comment>
//                 {node.object.content && node.object.content.length > 320
//                   ? removeMd(node.object.content).replace(
//                       /^([\s\S]{316}[^\s]*)[\s\S]*/,
//                       '$1...'
//                     )
//                   : removeMd(node.object.content)}
//               </Comment>
//             </MemberInfo>
//           </MemberWrapped>
//         </Box>
//       ) : (
//         <Member>
//           <MemberItem mr={2}>
//             <Img src={user ? user.icon : ''} />
//           </MemberItem>
//           <MemberInfo>
//             {userpage ? (
//               <b>{user ? user.name : <Trans>Deleted user</Trans>}</b>
//             ) : user ? (
//               <Name>
//                 <Link to={'/user/' + user.id}>
//                   {user.name}{' '}
//                   {user.preferredUsername ? (
//                     <Username ml={2}>@{user.preferredUsername}</Username>
//                   ) : null}
//                 </Link>
//                 <Spacer mr={2}>·</Spacer>{' '}
//                 <Date>{DateTime.fromISO(node.published).toRelative()}</Date>
//               </Name>
//             ) : (
//               <Name>
//                 <Trans>Deleted user</Trans>
//               </Name>
//             )}

//             {node.activityType === 'JoinCommunity' ? (
//               <SubText>
//                 <Trans>joined</Trans>
//                 <NavLink to={`/communities/${node.object.id}`}>
//                   {' '}
//                   @{node.object.name}
//                 </NavLink>
//               </SubText>
//             ) : node.activityType === 'CreateComment' ? (
//               <>
//                 {node.object.inReplyTo !== null ? (
//                   <InReply my={2}>
//                     <MemberWrapped>
//                       <MemberItem className={'miniavatar'} mr={2}>
//                         <Img src={node.object.inReplyTo.author.icon} />
//                       </MemberItem>
//                       <MemberInfo>
//                         <Name>
//                           <Link
//                             to={'/user/' + node.object.inReplyTo.author.id}
//                           >
//                             {node.object.inReplyTo.author.name}
//                           </Link>
//                           <Spacer mr={2}>·</Spacer>{' '}
//                           <Date>
//                             {DateTime.fromISO(node.published).toRelative()}
//                           </Date>
//                         </Name>
//                         <Comment>
//                           {node.object.inReplyTo.content &&
//                           node.object.inReplyTo.content.length > 320
//                             ? removeMd(node.object.inReplyTo.content).replace(
//                                 /^([\s\S]{316}[^\s]*)[\s\S]*/,
//                                 '$1...'
//                               )
//                             : removeMd(node.object.inReplyTo.content)}
//                         </Comment>
//                       </MemberInfo>
//                     </MemberWrapped>
//                   </InReply>
//                 ) : null}
//                 <Comment>
//                   {node.object.content && node.object.content.length > 320
//                     ? removeMd(node.object.content).replace(
//                         /^([\s\S]{316}[^\s]*)[\s\S]*/,
//                         '$1...'
//                       )
//                     : removeMd(node.object.content)}
//                 </Comment>
//               </>
//             ) : node.activityType === 'UpdateCommunity' ? (
//               <SubText mt={1}>
//                 <Trans>updated</Trans>{' '}
//                 <NavLink
//                   style={{ marginLeft: '4px' }}
//                   to={`/communities/${node.object.id}`}
//                 >
//                   @{node.object.name}
//                 </NavLink>
//               </SubText>
//             ) : node.activityType === 'UpdateCollection' ? (
//               <SubText mt={1}>
//                 <Trans>updated</Trans>{' '}
//                 <NavLink
//                   style={{ marginLeft: '4px' }}
//                   to={`/collections/${node.object.id}`}
//                 >
//                   +{node.object.name}
//                 </NavLink>
//               </SubText>
//             ) : node.activityType === 'FollowCollection' ? (
//               <SubText mt={1}>
//                 <Trans>followed</Trans>
//                 <NavLink
//                   style={{ marginLeft: '4px' }}
//                   to={`/collections/${node.object.id}`}
//                 >
//                   +{node.object.name}
//                 </NavLink>
//               </SubText>
//             ) : node.activityType === 'CreateResource' ? (
//               <Box>
//                 <SubText mt={1}>
//                   <Trans>added a new resource</Trans> <Trans>in</Trans>{' '}
//                   <NavLink
//                     to={`/collections/${node.object.collection.id}`}
//                   >
//                     +{node.object.collection.name}
//                   </NavLink>
//                 </SubText>
//                 <Preview
//                   icon={node.object.icon}
//                   title={node.object.name}
//                   summary={node.object.summary}
//                   url={`/collections/${node.object.collection.id}`}
//                 />
//               </Box>
//             ) : node.activityType === 'CreateCollection' ? (
//               <Box>
//                 <SubText mt={1}>
//                   <Trans>created a new collection</Trans>{' '}
//                   <NavLink to={`/collections/${node.object.id}`}>
//                     +{node.object.name}
//                   </NavLink>
//                 </SubText>
//                 <Preview
//                   icon={node.object.icon}
//                   title={node.object.name}
//                   summary={node.object.summary}
//                   url={`/collections/${node.object.id}`}
//                 />
//               </Box>
//             ) : node.activityType === 'CreateCommunity' ? (
//               <Box>
//                 <SubText mt={1}>
//                   <Trans>created a new community</Trans>{' '}
//                   <NavLink to={`/communities/${node.object.id}`}>
//                     @{node.object.name}
//                   </NavLink>
//                 </SubText>
//                 <Preview
//                   icon={node.object.icon}
//                   title={node.object.name}
//                   summary={node.object.summary}
//                   url={`/communities/${node.object.id}`}
//                 />
//               </Box>
//             ) : null}

//             {node.activityType === 'CreateComment' ? (
//               <Actions
//                 totalReplies={node.object.replies.totalCount as number}
//                 totalLikes={node.object.likers.totalCount as number}
//                 comment={node.object}
//                 toggleLike={toggleLike(node.object.id)}
//                 iLikeIt={iLikeIt}
//               />
//             ) : null}
//           </MemberInfo>
//         </Member>
//       )}
//     </FeedItem>
//   );
// };
// const NavigateToThread = styled(Link)`
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   z-index: 1;
// `;

// const InReply = styled(Box)`
//   color: ${props => props.theme.colors.gray};
//   position: relative;
//   opacity: 0.8
//   &:after {
//     position: absolute;
//     content: '';
//     width: 4px;
//     top: 10px;
//     left: -2px;
//     bottom: 10px;
//     display: block;
//     background: #f3f3f3;
//   }
//   a {
//     color: ${props => props.theme.colors.black} !important;
//     font-weight: 700;
//   }
// `;

// const Username = styled(Text)`
//   color: ${props => props.theme.colors.gray};
//   margin: 0 8px;
//   font-weight: 500;

//   ${media.lessThan('1280px')`
//   display: none;
//  `};
// `;

// const Spacer = styled(Text)`
//   color: ${props => props.theme.colors.gray};
//   margin-right: 8px;
//   font-weight: 500;
//   ${media.lessThan('1280px')`
//   display: none;
//  `};
// `;

// const Date = styled(Text)`
//   color: ${props => props.theme.colors.gray};
//   font-weight: 500;
//   font-size: 12px;
// `;

// const SubText = styled(Flex)`
// font-size: 14px;
// align-items: end;
// display: inline;
// svg {
//   fill: #ffc02d;
//   margin-right: 8px;
// }
// > a {
//   position: relative;
//   z-index: 9;
//   text-decoration: none;
//   font-weight: 800
//   margin-left: 4px;
//   color: ${props => props.theme.colors.darkgray} !important;
//   &:hover {
//     text-decoration: underline;
//   }
// }
// `;

// const Name = styled(Text)`
//   font-weight: 600;
//   color: ${props => props.theme.colors.darkgray};
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   font-size: 14px;
//   margin-bottom: 2px;
//   ${media.lessThan('1280px')`
//   flex-direction: column;
//   align-items: normal;
//  `};

//   a {
//     font-weight: 800;
//     display: flex;
//     text-decoration: none;
//     align-items: center;
//     position: relative;
//     z-index: 9;
//     color: ${props => props.theme.colors.darkgray} !important;
//   }
// `;

// const Member = styled(Flex)`
//   align-items: stretch;
// `;

// const MemberWrapped = styled(Member)`
//   padding: 8px;
//   .miniavatar {
//     min-width: 40px !important;
//     height: 40px;
//   }
// `;

// const MemberInfo = styled(Box)`
//   margin-top: 4px;
//   width: 100%;
// `;

// const Comment = styled.div`
//   margin-top: 6px;
//   & a {
//     color: ${props => props.theme.colors.darkgray} !important;
//     font-weight: 400 !important;
//     font-size: 14px;
//     text-decoration: none;
//     line-height: 20px;
//   }
// `;

// const MemberItem = styled(Box)`
//   background-color: #d6dadc;
//   border-radius: 50px;
//   height: 48px;
//   overflow: hidden;
//   position: relative;
//   width: 48px;
//   user-select: none;
//   z-index: 0;
//   vertical-align: inherit;
//   margin-right: 8px;
//   min-width: 48px !important;
// .--rtl & {
//   margin-right: 0px;
//   margin-left: 8px;
// }
// `;

// const Img = styled.img`
//   width: 48px;
//   height: 48px;
//   display: block;
//   -webkit-appearance: none;
//   line-height: 48px;
//   text-indent: 4px;
//   font-size: 13px;
//   overflow: hidden;
//   max-width: 48px;
//   max-height: 48px;
//   text-overflow: ellipsis;
//   vertical-align: text-top;
//   margin-right: 8px;
// .--rtl & {
//   margin-right: 0px;
//   margin-left: 8px;
// }
// `;

// const FeedItem = styled.div`
//   min-height: 30px;
//   position: relative;
//   margin: 0;
//   padding: 16px;
//   word-wrap: break-word;
//   font-size: 14px;
//   ${clearFix()};
//   transition: background 0.5s ease;
//   margin-top: 0
//   z-index: 10;
//   position: relative;
//   background: #ffffff;
//   position: relative;
//   cursor: pointer;
//   &:hover {
//     background: ${props => props.theme.colors.lighter};
//   }
//   border-bottom: 1px solid  ${props => props.theme.colors.lightgray};
//   a {
//     text-decoration: none;
//     color: inherit !important;
//     &:hover {
//       text-decoration: underline
//     }
//   }

// `;

// export default Item;
