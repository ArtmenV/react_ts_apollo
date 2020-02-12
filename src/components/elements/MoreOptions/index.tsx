import * as React from 'react';
import styled from '../../../themes/styled';
import { Text } from 'rebass/styled-components';
import { Trans } from '@lingui/macro';
import FlagModal from '../FlagModal';
import { Flag, MoreHorizontal } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';

const WrapperMenu = styled.div`
  box-sizing: border-box;
  width: 250px;
  padding: 5px;
  border-radius: 0.25em;
  background-color: rgb(232, 232, 232);
  position: absolute;
  top: 30px;
  right: 0px;
  z-index: 999999999999;
`;
const OptionsMenu = styled.div`
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;
const List = styled.div<{ lined?: boolean }>`
  padding: 0px 8px;
  border-bottom: ${props => (props.lined ? '1px solid #dadada' : null)};
`;
const Item = styled(Text)`
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  & span {
    display: inline-block;
    margin-right: 8px;
    & svg {
      vertical-align: sub;
    }
  }
  & a {
    color: inherit !important;
    text-decoration: none;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;

const MoreButton = styled.div`
  cursor: pointer;
`;

const Layer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 50px;
  z-index: 1;
  display: block;
`;

interface Props {
  contextId: string;
  myFlag: any;
}

// const MoreOptions: React.FC<Props> = ({ contextId, myFlag }) => {
const MoreOptions: React.FC<Props> = ({ contextId, myFlag }) => {
  const [isFlagOpen, onFlagOpen] = React.useState(false);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const closeMenu = React.useCallback(() => setMenuIsOpen(false), []);
  const openMenu = React.useCallback(() => setMenuIsOpen(true), []);
  const [isFlagged, flagItem] = React.useState(myFlag != null);
  return (
    <>
      <MoreButton>
        <MoreHorizontal size={18} color={'#f98012'} onClick={openMenu} />
      </MoreButton>
      {menuIsOpen ? (
        <>
          <OutsideClickHandler onOutsideClick={closeMenu}>
            <WrapperMenu>
              <OptionsMenu>
                <List lined>
                  <Item
                    variant="link"
                    onClick={() => {
                      onFlagOpen(true);
                      closeMenu();
                    }}
                  >
                    <span>
                      <Flag size={18} color={'#333'} />
                    </span>
                    {!isFlagged ? <Trans>Flag</Trans> : <Trans>Unflag</Trans>}
                  </Item>
                </List>
              </OptionsMenu>
            </WrapperMenu>
          </OutsideClickHandler>
          <Layer />
        </>
      ) : null}
      <FlagModal
        contextId={contextId}
        myFlag={myFlag}
        isFlagged={isFlagged}
        flagItem={flagItem}
        closeModal={() => {
          onFlagOpen(false);
        }}
        modalIsOpen={isFlagOpen}
      />
    </>
  );
};
export default MoreOptions;
