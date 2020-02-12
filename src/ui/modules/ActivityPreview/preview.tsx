import { Trans } from '@lingui/react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Text, Heading } from 'rebass/styled-components';
import media from 'styled-media-query';
import Avatar from 'ui/elements/Avatar';
import styled from 'ui/themes/styled';
import { Actor } from './types';
import { Box } from 'rebass';
import { ellipsis } from 'polished';

export enum ContextVerb {
  Updated,
  Created,
  Like,
  Follow,
  Flag
}
export enum ContextType {
  Comment,
  Collection,
  Community,
  User,
  Resource
}

export interface IContext {
  type: ContextType;
  verb: ContextVerb;
  link: string;
}

export interface ConcreteContext extends IContext {
  type:
    | ContextType.Collection
    | ContextType.Community
    | ContextType.User
    | ContextType.Resource;
  icon: string;
  title: string;
  summary: string;
  resourceUrl?: string;
}

// export interface ResourceContext extends ConcreteContext {
//   resourceUrl: string
//   type: ContextType.Resource
// }

export interface CommentContext extends IContext {
  type: ContextType.Comment;
  content: string;
}

export interface UserContext extends IContext, Actor {
  type: ContextType.User;
}

export type Context = CommentContext | ConcreteContext | UserContext;

const SmallPreview: React.SFC<ConcreteContext> = context => (
  <FlexSmallPreview mt={2} alignItems="center">
    <TextPreview display="inline-block" mr={2} variant="link">
      {context.verb === ContextVerb.Follow ? (
        <Trans>Followed</Trans>
      ) : context.verb === ContextVerb.Like ? (
        <Trans>Liked</Trans>
      ) : context.verb === ContextVerb.Flag ? (
        <Trans>Flagged</Trans>
      ) : context.verb === ContextVerb.Created &&
      context.type === ContextType.Collection ? (
        <Trans>Created the collection</Trans>
      ) : context.verb === ContextVerb.Created &&
      context.type === ContextType.Community ? (
        <Trans>Created the community</Trans>
      ) : context.verb === ContextVerb.Created &&
      context.type === ContextType.Resource ? (
        <Trans>Created the resource</Trans>
      ) : context.verb === ContextVerb.Updated &&
      context.type === ContextType.Collection ? (
        <Trans>Updated the collection</Trans>
      ) : context.verb === ContextVerb.Updated &&
      context.type === ContextType.Community ? (
        <Trans>Updated the community</Trans>
      ) : context.verb === ContextVerb.Updated &&
      context.type === ContextType.Resource ? (
        <Trans>Updated the resource</Trans>
      ) : null}
      <B>{context.title}</B>
    </TextPreview>
  </FlexSmallPreview>
);

const Preview: React.FC<Context> = context => {
  // const { link } = context;
  return (
    <Wrapper>
      {context.type === ContextType.Comment ? (
        <Comment mt={2} variant="text">
          {context.content}
        </Comment>
      ) : context.type === ContextType.User ? (
        <pre>
          USER:
          {JSON.stringify(context, null, 4)}
        </pre>
      ) : (
        <SmallPreview {...context} />
      )}
      {context.verb === ContextVerb.Created ? <Overview {...context} /> : null}
    </Wrapper>
  );
};

const Overview: React.FC<Context> = context => {
  return context.type === ContextType.Resource ? (
    <WrapperLink target="blank" href={context.resourceUrl}>
      <WrapperOverview mt={3}>
        <Avatar size="m" src={context.icon} />
        <Infos ml={3}>
          <TitleOverview>{context.title}</TitleOverview>

          <Text variant="text" mt={2} mb={3}>
            {context.summary}
          </Text>
        </Infos>
      </WrapperOverview>
    </WrapperLink>
  ) : context.type === ContextType.Community ||
  context.type === ContextType.Collection ? (
    <WrapperLinkGeneral to={context.link}>
      <WrapperOverview mt={3}>
        <Avatar size="m" src={context.icon} />
        <Infos ml={3}>
          <TitleOverview>{context.title}</TitleOverview>

          <Text variant="text" mt={2} mb={3}>
            {context.summary}
          </Text>
          {/* <Actions>
                <ActionItem>
                  <FileText size={20} color={'#8b98a2'} />
                  
                </ActionItem>
              </Actions> */}
        </Infos>
      </WrapperOverview>
    </WrapperLinkGeneral>
  ) : null;
};

const WrapperLinkGeneral = styled(NavLink)`
  text-decoration: none;
  &:hover {
    text-decoration: none !important;
  }
`;
const FlexSmallPreview = styled(Flex)`
  // padding: 16px 8px;
  // border-bottom: 1px solid ${props => props.theme.colors.lightgray};
`;

const WrapperOverview = styled(Flex)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.lightgray};
  border-radius: 6px;
  &:hover {
    background: #ebeef2;
  }
`;

const Infos = styled(Box)`
  flex: 1;
  position: relative;
  div {
    text-decoration: none;
  }
`;

const TitleOverview = styled(Heading)`
  color: ${props => props.theme.colors.darkgray};
  font-size: 20px;
  text-decoration: none;
`;

export type InReplyToContext = {
  actor: null | Actor;
  icon: string;
  link: string;
  desc: string;
};
export const InReplyTo: React.SFC<InReplyToContext> = context => {
  return (
    <FlexPreview>
      <NavLink to={context.link}>
        <Flex>
          <WrapperPreview>
            {context.actor && (
              <Avatar src={context.actor.icon} initials={context.actor.name} />
            )}
            <Title ml={2}>{context.desc}</Title>
          </WrapperPreview>

          {/* <TextConnector variant="link">
            {context.verb === ContextVerb.Follow ? (
              <Trans>followed</Trans>
            ) : context.verb === ContextVerb.Like ? (
              <Trans>liked</Trans>
            ) : context.verb === ContextVerb.Flag ? (
              <Trans>flagged</Trans>
            ) : context.verb === ContextVerb.Created && context.type === ContextType.Collection ? (
              <Trans>created the collection</Trans>
            ) : context.verb === ContextVerb.Created && context.type === ContextType.Community ? (
              <Trans>created the community</Trans>
            ) : context.verb === ContextVerb.Created && context.type === ContextType.Resource ? (
              <Trans>created the resource</Trans>
            ) : context.verb === ContextVerb.Updated && context.type === ContextType.Collection ? (
              <Trans>updated the collection</Trans>
            ) : context.verb === ContextVerb.Updated && context.type === ContextType.Community ? (
              <Trans>updated the community</Trans>
            ) : context.verb === ContextVerb.Updated && context.type === ContextType.Resource ? (
              <Trans>updated the resource</Trans>
            ) : null}
          </TextConnector> 
          {context.type === ContextType.Comment
            ? <Comment variant="text">{context.content}</Comment>
            : <WrapperPreview>
              <Avatar
                src={context.icon}
                initials={context.actor.name}
              />
              <Title ml={2}>{context.actor.name}</Title>
            </WrapperPreview>
          }*/}
        </Flex>
      </NavLink>
    </FlexPreview>
  );
};

const TextPreview = styled(Text)`
  font-weight: 500;
  ${ellipsis('480px')};
`;

// const InReply = styled(Text)`
//   padding-bottom: 0;
//   display: inline-block;
//   font-weight: 500;
//   font-size: 13px;
//   color: ${props => props.theme.colors.gray};
//   a {
//     color: ${props => props.theme.colors.orange} !important;
//     font-weight: 600;
//   }
// `;

// const TextConnector = styled(Text)`
//   margin-left: 6px;
//   margin-right: 6px;
//   height: 30px;
//   line-height: 30px;
// `;
const WrapperPreview = styled(Flex)`
  display: inline-block;
  div {
    display: inline-block;
  }
  div:first-of-type {
    width: 28px;
    height: 28px;
  }
  align-items: center;
`;

const FlexPreview = styled(Box)`
  align-items: center;
  border: 1px solid ${props => props.theme.colors.lightgray};
  background: #eceff2;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  position: relative;
  display: inline-block;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    left: 10px;
    height: 16px;
    bottom: -17px;
    width: 3px;
    display: block;
    background: ${props => props.theme.colors.lightgray};
  }
`;

export const Comment = styled(Text)`
  // padding: 8px;

  & a {
    color: ${props => props.theme.colors.darkgray} !important;
    font-weight: 400 !important;
    font-size: 14px;
    text-decoration: none;
    line-height: 20px;
  }
`;

const WrapperLink = styled.a`
  text-decoration: none;
  position: relative;
  z-index: 999999;
  &.connector {
    background: ${props => props.theme.colors.lightgray};
  }
  &:hover {
    background: rgb(245, 248, 250);
    text-decoration: none !important;
  }
`;

const Wrapper = styled.div`
  ${media.lessThan('medium')`
  display: block;
  padding: 0;
  `};
`;

const B = styled.b`
  font-weight: 800;
  margin-left: 4px;
`;

const Title = styled(Text)`
  font-size: 14px !important;
  flex: 1;
  display: inline-block;
  font-weight: 800;
  color: ${props => props.theme.colors.darkgray};
`;

export default Preview;
