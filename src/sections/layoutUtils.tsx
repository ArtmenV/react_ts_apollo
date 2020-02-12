import styled from '../themes/styled';
import { Flex } from 'rebass/styled-components';
import media from 'styled-media-query';
export const HomeBox = styled(Flex)`
      max-width: 600px;
        width: 100%;
        align-items: flex-start;
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: auto;
        flex-direction: column;
        margin: 0px;
        min-height: 0px;
        min-width: 0px;
        padding: 0px;
        position: relative;
        z-index: 0;
  ${media.lessThan('1005px')`
  max-width: 100%;
  `};
  // ${media.lessThan('1280px')`
  // top: 60px;
  // `};
          `;

export const MainContainer = styled(Flex)`
  align-items: stretch;
  flex-grow: 1;
  flex-direction: row;
  width: 100%;
`;

export const MainWrapper = styled(Flex)`
  align-items: flex-start;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: column;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  margin-top: 16px;
  margin-left: 8px;
  ${media.lessThan('1280px')`
  width: 100%;
  margin: 0
`};
`;

export const WrapperDimension = styled(Flex)<{ isLogin: boolean }>`
  align-items: stretch;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: column;
  width: 990px;
  margin: ${props => (props.isLogin ? '0 auto' : 'initial')}
    ${media.lessThan('1095px')`
  width: 920px;
`};
  ${media.lessThan('1005px')`
  width: 100%;
`};
  ${media.lessThan('medium')`
  width: 100%;
`};
`;

export const Inner = styled(Flex)`
  flex-grow: 1;
  justify-content: space-between;
  align-items: stretch;
  min-height: 100%;
  width: 100%;
  flex-direction: column;
`;
