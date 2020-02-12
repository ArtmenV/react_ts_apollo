/**
 * The only true button.
 *
 * @visibleName The Best Button Ever 🐙
 * Avatar component.
 * @param children {JSX.Element} children of Avatar
 * @param size {"small"|"large"} size of avatar
 * @param marked {Boolean} whether blue dot should appear on avatar
 * @param className {String} additional class names of avatar
 * @param props {Object} avatar props

 */

import { Trans } from '@lingui/macro';
import { ellipsis } from 'polished';
import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import media from 'styled-media-query';
import styled from '../../../themes/styled';
import { Button, Heading, Text } from 'rebass/styled-components';
import EditResourceModal from '../EditResourceModal';
import MoreOptions from '../MoreOptions';

const PlaceholderImg = require('../Icons/resourcePlaceholder.png');

interface Props {
  icon: string;
  title: string;
  summary: string;
  url: string;
  id: string;
  editResource(): boolean;
  isEditResourceOpen: boolean;
  preview?: boolean;
  isEditable?: boolean;
  coreIntegrationURL?: string;
  myFlag: string | null;
}

const Resource: React.FC<Props> = props => {
  return (
    <Wrapper>
      <MoreOptionsContainer>
        <MoreOptions contextId={props.id} myFlag={props.myFlag} />
      </MoreOptionsContainer>{' '}
      <UrlLink target="blank" href={props.url}>
        <Img
          style={{ backgroundImage: `url(${props.icon || PlaceholderImg})` }}
        />
        <Info>
          <TitleWrapper>
            <Title>{props.title}</Title>
            {!props.isEditable ? null : (
              <Actions>
                <Button hovered onClick={props.editResource}>
                  <Trans>Edit</Trans>
                </Button>
              </Actions>
            )}
            {!props.coreIntegrationURL ? null : (
              <Actions>
                <a href={props.coreIntegrationURL} target="_top">
                  <Button hovered>
                    <Trans>To Moodle!</Trans>
                  </Button>
                </a>
              </Actions>
            )}
          </TitleWrapper>
          {props.url && <Url>{props.url}</Url>}
          {props.summary && (
            <Summary>
              {props.summary.split('\n').map(function(item, key) {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
            </Summary>
          )}
        </Info>
      </UrlLink>
      <EditResourceModal
        toggleModal={props.editResource}
        modalIsOpen={props.isEditResourceOpen}
        id={props.id}
        url={props.url}
        image={props.icon}
        name={props.title}
        summary={props.summary}
      />
    </Wrapper>
  );
};

const UrlLink = styled.a`
  text-decoration: none;
  display: flex;
  ${media.lessThan('medium')`
  text-align:center;
  display: block;
`};
`;

const TitleWrapper = styled.div`
  display: flex;
  & a {
    flex: 1;
  }
`;
const Info = styled.div`
  flex: 1;
  margin-left: 8px;
  ${media.lessThan('medium')`
  margin-left: 0;
  `};
  & a {
    text-decoration: none;
    color: inherit;
  }
  .--rtl & {
    margin-left: 0px;
    margin-right: 8px;
  }
`;
const Url = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.gray};
  font-weight: 400;
  ${ellipsis('270px')};
  margin-top: 8px;

  ${media.lessThan('medium')`
  ${ellipsis('210px')};
  text-align: center;
  `};
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  &:hover {
    background: ${props => props.theme.colors.lighter};
  }
  padding: 20px;
  margin-bottom: 8px;
  border-radius: 3px;
  ${media.lessThan('medium')`
  display: block;
  padding: 0;
  padding: 20px;
  & a {
    text-decoration: none;
  }
  &:last-of-type {
    margin-bottom: 0;
    border-bottom: 0px;
  }
  `};
`;

const Img = styled.div`
  background-size: cover;
  background-repeat: none;
  height: 120px;
  width: 120px;
  margin: 0 auto;
  background-position: center center;
  margin-right: 20px;
  .--rtl & {
    margin-left: 20px;
  }
  ${media.lessThan('medium')`
    margin: 0 auto;
    margin-bottom: 8px;
    margin-top: 8px;
  `};
`;
const Title = styled(Heading)`
  margin: 0 !important;
  font-size: 15px !important;
  line-height: 22px !important;
  margin-top: 8px;
  flex: 1;
  color: ${props => props.theme.colors.darkgray};
  ${media.lessThan('medium')`
  text-align: center;
  padding: 0 8px;
  line-height: 24px !important;
`};
`;
const Summary = styled(Text)`
  margin: 0 !important;
  margin-top: 4px;
  color: ${props => props.theme.colors.darkgray}
  font-size: 13px;
  line-height: 18px;
`;
const Actions = styled.div`
  width: 100px;
  text-align: right;
  & button {
    height: 25x;
    max-width: 80px;
    min-width: 80px;
    border-width: 1px !important;
    line-height: 25px;
    color: ${props => props.theme.colors.lightgray} svg {
      color: inherit !important;
    }
  }
`;

const MoreOptionsContainer = styled.div`
  margin-left: 16px;
  position: absolute;
  right: 20px;
  z-index: 20;
`;

export default compose(
  withState('isEditResourceOpen', 'onEditResourceOpen', false),
  withHandlers({
    addNewResource: props => () => props.onOpen(!props.isOpen),
    editResource: props => () =>
      props.onEditResourceOpen(!props.isEditResourceOpen)
  })
)(Resource);
