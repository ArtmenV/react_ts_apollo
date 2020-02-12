import * as React from 'react';
import { Settings, User, Power } from 'react-feather';
import styled from '../../themes/styled';
import { Trans } from '@lingui/macro';
import { useHistory } from 'react-router';
import { useLogoutMutationMutation } from '../../graphql/logout.generated';
import { Text } from 'rebass/styled-components';
import media from 'styled-media-query';

const WrapperMenu = styled.div`
  box-sizing: border-box;
  width: 250px;
  padding: 5px;
  border-radius: 0.25em;
  background-color: rgb(232, 232, 232);
  position: absolute;
  // top: 110px;
  left: 16px;
  z-index: 999999999999;
  ${media.lessThan('860px')`
  position: fixed;
  top: 70px;
  `};
`;

const ProfileMenu = styled.div`
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;
const List = styled.div<{ lined?: boolean }>`
  padding: 8px;
  border-bottom: ${props => (props.lined ? '1px solid #dadada' : null)};
  a {
    color: inherit !important;
    text-decoration: none;
  }
`;
const Item = styled(Text)`
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  & span {
    display: inline-block;
    margin-right: 8px;
    .--rtl & {
      margin-right: 0px;
      margin-left: 8px;
    }
    & svg {
      vertical-align: sub;
    }
  }
  &:hover {
    color: ${props => props.theme.colors.orange};
  }
`;

const Dropdown: React.FC = () => {
  const { push } = useHistory();
  const [logoutMut /* , logoutMutResp */] = useLogoutMutationMutation();
  const logout = React.useCallback(() => logoutMut(), [logoutMut]);
  return (
    <>
      <WrapperMenu>
        <ProfileMenu>
          <List lined>
            <Item variant="link" onClick={() => push('/profile')}>
              <span>
                <User size={18} color={'#333'} />
              </span>
              <Trans>Profile</Trans>
            </Item>
            <Item variant="link" onClick={() => push('/settings')}>
              <span>
                <Settings size={18} color={'#333'} />
              </span>
              <Trans>Settings</Trans>
            </Item>
          </List>
          <List lined>
            <a
              href="https://docs.moodle.org/dev/MoodleNet/Code_of_Conduct"
              target="blank"
            >
              <Item variant="link">
                <Trans>Code of Conduct</Trans>
              </Item>
            </a>

            <a href="https://changemap.co/moodle/moodlenet/" target="blank">
              <Item variant="link">
                <Trans>Feedback &amp; Suggestions</Trans>
              </Item>
            </a>

            <Text
              style={{
                fontWeight: 600,
                fontSize: '15px',
                padding: '8px',
                paddingLeft: '4px',
                color: '#3c3c3c'
              }}
            >
              v0.10 beta
            </Text>
          </List>
          <List>
            <Item variant="link" onClick={logout}>
              <span>
                <Power width={18} height={18} strokeWidth={1} color={'#333'} />
              </span>
              <Trans>Sign out</Trans>
            </Item>
          </List>
        </ProfileMenu>
      </WrapperMenu>
    </>
  );
};
export default Dropdown;
