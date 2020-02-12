import * as React from 'react';
import styled from '../../themes/styled';
import { Trans } from '@lingui/macro';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useHistory } from 'react-router';
import Link from '../../components/elements/Link/Link';
import { Community, Collection, Resource } from '../../graphql/types.generated';
import { LocaleContext } from '../../context/global/localizationCtx';
import { Image, Text, Box, Flex } from 'rebass/styled-components';

const Img = styled(Image)`
  border-radius: 3px;
`;
// const Right = styled(Flex)`
//   align-items: center;
//   a {
//     display: flex;
//     align-items: center;
//   }
// `;
const Left = styled(Flex)`
  flex: auto;
`;

const Header = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  height: 50px;
  align-items: center;
  align-content: space-between;
  padding: 0 8px;
  cursor: pointer;
  a {
    display: flex;
    flex: 1;
    text-decoration: none;
  }
`;

const FlexOuter = styled(Flex)`
  background: #fff;
  margin: 16px;
  /* margin-top: 0; */
  border-radius: 6px;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 16px;
  a {
    text-decoration: none;
    display: flex;
  }
`;

const LinkImg = styled(Img)`
  margin-right: 8px;
  width: 140px;
  height: 140px;
  .--rtl & {
    margin-right: 0px;
    margin-left: 8px;
  }
`;

export interface Props {
  context: Pick<
    Community | Collection | Resource,
    'id' | 'name' | 'icon' | 'summary' | '__typename'
  >;
}

export const Preview: React.FC<Props> = ({ context }) => (
  <FlexOuter>
    <Link
      to={
        context.__typename === 'Community'
          ? `/communities/${context.id}`
          : context.__typename === 'Collection'
            ? `/collections/${context.id}`
            : context.__typename === 'Resource'
              ? `/collections/${(context as any).collection.id}`
              : ''
      }
    >
      <LinkImg src={context.icon} />
      <Box ml={2}>
        <Text variant="heading">{context.name}</Text>
        <Text mt={2} variant="text">
          {context.summary}
        </Text>
      </Box>
    </Link>
  </FlexOuter>
);

const HeaderWrapper: React.FC<Props> = ({ context }) => {
  const history = useHistory();
  return (
    <LocaleContext.Consumer>
      {value => (
        <Header>
          <Left onClick={() => history.goBack()}>
            {value.locale != 'ar_SA' ? (
              <ChevronLeft size="24" />
            ) : (
              <ChevronRight size="24" />
            )}
            <Text>
              <Trans>Back</Trans>
            </Text>
          </Left>
          {/* <Right>
            <Link to={`/communities/${context.id}`}>
              <LinkImg src={context.icon} />
              <Text variant="suptitle">{context.name}</Text>
            </Link>
          </Right> */}
        </Header>
      )}
    </LocaleContext.Consumer>
  );
};

export default HeaderWrapper;
