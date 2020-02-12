import React, { SFC } from 'react';
import { Box, Text, Flex } from 'rebass/styled-components';
import { Globe } from '../../components/elements/Icons';
import styled from '../../themes/styled';
import media from 'styled-media-query';
import { User } from '../../graphql/types.generated';

interface Props {
  user: Pick<
    User,
    'image' | 'icon' | 'name' | 'summary' | 'displayUsername' | 'location'
  >;
}

const HeroComp: SFC<Props> = ({ user }) => (
  <ProfileBox p={1} mb={2}>
    {/* <Helmet>
      <title>
        {APP_NAME} > Profile > {user.name}
      </title>
    </Helmet> */}
    <Hero>
      <HeroBg src={user.image || 'https://picsum.photos/id/1021/800/300'} />
      <FlexProfile>
        <WrapperHero>
          <Img
            style={{
              backgroundImage: `url(${user.icon})`
            }}
          />
        </WrapperHero>
        <HeroInfo>
          <Text variant="heading" mt={1} fontWeight={'bold'}>
            {user.name}
          </Text>
          <Username mt={2} fontSize={2}>
            @{user.displayUsername}
          </Username>
          <Text variant="text" mt={2}>
            {user.summary}
          </Text>
          {user.location ? (
            <Location mt={2}>
              <span>
                <Globe width={20} height={20} strokeWidth={1} color={'#333'} />
              </span>
              {user.location}
            </Location>
          ) : null}
        </HeroInfo>
      </FlexProfile>
    </Hero>
  </ProfileBox>
);

export default HeroComp;

const FlexProfile = styled(Flex)`
  ${media.lessThan('860px')`
  flex-direction: column;
  align-items: center;
  text-align: center;
`};
`;

const ProfileBox = styled(Box)`
  // overflow-y: overlay;
`;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const Location = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  line-height: 26px;
  font-size: 14px;
  border-radius: 100px;
  margin-top: 16px;
  span {
    display: inline-block;
    margin-right: 8px;
    & svg {
      color: ${props => props.theme.colors.gray};
      vertical-align: text-bottom;
    }
    .--rtl & {
      margin-left: 8px;
      margin-right: 0px;
    }
  }
`;

const HeroBg = styled.div<{ src: string }>`
  height: 250px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  background: ${props => props.theme.colors.lightgray};
  background-image: url(${props =>
    props.src ? props.src : props.theme.colors.lightgray});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const WrapperHero = styled.div`
  padding: 24px;
  padding-top: 0;
  z-index: 9999;
  position: relative;
  margin-top: -60px;
  padding-bottom: 0;
`;

const Img = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  background: ${props => props.theme.colors.lightgray};
  border: 3px solid white;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  margin-right: 16px;
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
  border-radius: 6px;
  & p {
    color: ${props => props.theme.colors.darkgray};
    padding: 0 24px;
    margin-left: 120px;
    margin: 0;
    margin-left: 136px;
    margin-top: -40px;
    line-height: 26px;
    font-size: 16px;
    padding-bottom: 16px;
  }
`;

const HeroInfo = styled.div`
  & button {
    span {
      vertical-align: sub;
      display: inline-block;
      height: 30px;
      margin-right: 4px;
    }
  }
`;
