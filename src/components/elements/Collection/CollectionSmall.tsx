import { BasicCollectionFragment } from 'graphql/fragments/basicCollection.generated';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from 'rebass/styled-components';
import media from 'styled-media-query';
import { Collection } from '../../../graphql/types.generated';
import styled from '../../../themes/styled';
const PlaceholderImg = require('../Icons/collectionPlaceholder.png');
import { ellipsis } from 'polished';

interface CollectionProps {
  collection: BasicCollectionFragment;
}
const Collection: React.FC<CollectionProps> = ({ collection }) => {
  return (
    <Wrapper py={1} mb={2} ml={3}>
      <Link to={`/collections/${collection.id}`}>
        <Img
          style={{
            backgroundImage: `url(${collection.icon || PlaceholderImg})`
          }}
        />
        <Infos>
          <Title fontSize={1} my={1} fontWeight={600}>
            {collection.name.length > 80
              ? collection.name.replace(/^(.{76}[^\s]*).*/, '$1...')
              : collection.name}
          </Title>
        </Infos>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  cursor: pointer;
  position: relative;
  max-width: 200px;
  max-height: 200px;
  border-radius: 4px;
  ${media.lessThan('medium')`
  display: block;
`} & a {
    color: inherit;
    text-decoration: none;
    width: 100%;
  }
`;
const Img = styled.div`
  width: 100%;
  height: auto;
  padding: 50%;
  border-radiu: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Infos = styled.div``;
const Title = styled(Text)`
  color: ${props => props.theme.colors.darkgray};
  ${ellipsis('200px')};
  display: block;
  text-align: center;
`;

export default Collection;
