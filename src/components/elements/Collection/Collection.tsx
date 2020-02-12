import * as React from 'react';
import styled from '../../../themes/styled';
import { Link } from 'react-router-dom';
import { Resource } from '../Icons';
import { Flex, Text, Heading } from 'rebass/styled-components';
// import { BasicCollectionFragment } from '../../../graphql/fragments/basicCollection.generated';
const PlaceholderImg = require('../Icons/collectionPlaceholder.png');

interface CollectionProps {
  collection: any;
}
/**
 * Collection component.
 */
const Component: React.SFC<CollectionProps> = ({ collection }) => (
  <Wrapper p={3}>
    <Link
      to={
        collection.id
          ? `/collections/${collection.id}`
          : `/collections/federate?url=${encodeURI(collection.id)}`
      }
    >
      <Img
        style={{
          backgroundImage: `url(${collection.icon || PlaceholderImg})`
        }}
      />
      <Infos>
        <Title>
          {collection.name.length > 80
            ? collection.name.replace(/^(.{76}[^\s]*).*/, '$1...')
            : collection.name}
        </Title>

        <Text variant="text" mt={2} mb={3}>
          {collection.summary && collection.summary.length > 320
            ? collection.summary.replace(/^([\s\S]{316}[^\s]*)[\s\S]*/, '$1...')
            : collection.summary}
        </Text>
        <Actions>
          <ActionItem>
            <Resource
              width={18}
              height={18}
              strokeWidth={2}
              color={'#8b98a2'}
            />
            {(collection.resources && collection.resources.totalCount) || 0}{' '}
          </ActionItem>
        </Actions>
      </Infos>
    </Link>
  </Wrapper>
);

const Actions = styled.div`
  display: inline-block;
  position: absolute;
  bottom: -10px;
`;
const ActionItem = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
  & svg {
    vertical-align: sub;
    color: inherit !important;
    margin-right: 4px;
    .--rtl & {
      margin-right: 0px;
      margin-left: 4px;
    }
  }
`;

const Wrapper = styled(Flex)`
  cursor: pointer;
  position: relative;
  border-bottom: 4px solid ${props => props.theme.colors.lighter};
  & a {
    display: flex;
    color: inherit;
    text-decoration: none;
    width: 100%;
    flex: 1;
  }
  &:hover {
    border-radius: 4px;
    background: ${props => props.theme.colors.lighter};
  }
`;
const Img = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 8px;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;
const Infos = styled.div`
  flex: 1;
  margin-left: 8px;
  .--rtl & {
    margin-right: 8px;
    margin-left: 0px;
  }
  position: relative;
`;
const Title = styled(Heading)`
  color: ${props => props.theme.colors.darkgray};
  font-size: 20px;
`;

export default Component;
