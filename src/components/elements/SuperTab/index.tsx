import { Tab, TabList } from 'react-tabs';
import media from 'styled-media-query';
import styled from '../../../themes/styled';
import 'react-tabs/style/react-tabs.css';

export const SuperTabList = styled(TabList)`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 32px;
  ${media.lessThan('medium')`
      display: block;
      overflow-y: auto;
      width: 100%;
      white-space: nowrap;

  `};
`;
export const SuperTab = styled(Tab)`
  border-radius: 0;
  border: none;
  position: relative;
  height: 40px;
  padding: 0 16px;
  color: ${props => props.theme.colors.gray};
  background: transparent;
  cursor: pointer;
  text-align: center;
  & h5 {
    display: inline-block;
    color: ${props => props.theme.colors.gray};
    font-size: 12px !important;
    font-weight: 700 !important;
    line-height: 40px;
    text-transform: uppercase;
    margin: 0;
  }

  & span {
    display: inline-block;
    margin-right: 8px;
    height: 40px;
    line-height: 40px;
    & svg {
      vertical-align: middle;
    }
  }
`;

export const StickyTabList = styled(SuperTabList)`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 32px;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 9999999;
  background: white;
  & li {
    height: 50px;
    line-height: 45px;
  }
  ${media.lessThan('medium')`
    grid-template-columns: 1fr 1fr 1fr
  `};
`;
