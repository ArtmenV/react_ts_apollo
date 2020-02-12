import { Trans } from '@lingui/macro';
import { useGetFeaturedCommunitiesQuery } from 'graphql/getFeaturedCommunities.generated';
import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import { LocaleContext } from '../../context/global/localizationCtx';
import styled from '../../themes/styled';
import CommunitySmall from '../elements/Community/CommunitySmall';
import { ChevronLeft, Right } from '../elements/Icons';
import Loader from '../elements/Loader/Loader';
import { Box } from 'rebass';

export const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  padding: 8px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  margin: 0;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.darkgray};
  & h5 {
    margin: 0;
    color: ${props => props.theme.colors.darkgray};
    display: inline-block;
    padding: 0;
    font-size: 12px;
    text-transform: uppercase;
    height: 30px;
    font-weight: 500;
    line-height: 30px;
  }
`;

export const RightContext = styled.div`
  & span {
    cursor: pointer;
    display: inline-block;
    height: 30px;
    & svg {
      color: ${props => props.theme.colors.darkgray} !important;
      vertical-align: middle;
      height: 30px;
    }
    &:hover {
      & svg {
        color: ${props => props.theme.colors.darkgray} !important;
      }
    }
  }
  float: right;

  // .--rtl & {
  //   flex-direction: row-reverse;
  //   float: left;
  // }
`;

const MultipleItems: React.FC = () => {
  const props = useGetFeaturedCommunitiesQuery();
  const sliderRef = useRef<Slider>();
  // const { RTL } = useContext(LocaleContext);
  return (
    <>
      <Title>
        <h5>
          <Trans>Featured communities</Trans>{' '}
        </h5>

        <RightContext>
          <span onClick={sliderRef.current && sliderRef.current.slickPrev}>
            <ChevronLeft
              width={26}
              height={26}
              strokeWidth={1}
              color={'#333'}
            />
          </span>
          <span onClick={sliderRef.current && sliderRef.current.slickNext}>
            <Right width={26} height={26} strokeWidth={1} color={'#333'} />
          </span>
        </RightContext>
      </Title>
      <Box p={2}>
        {!props.data || !props.data.instance || props.error ? (
          <span>
            <Trans>{/* Error loading featured communities */}</Trans>
          </span>
        ) : props.loading ? (
          <Loader />
        ) : //FIXME https://gitlab.com/moodlenet/meta/issues/185
        !props.data.instance.featuredCommunities ? null : (
          <Slider
            ref={c => (sliderRef.current = c || undefined)}
            {...sliderSettings}
          >
            {props.data.instance.featuredCommunities.edges.map(
              (edge, i) =>
                //FIXME https://gitlab.com/moodlenet/meta/issues/185
                // edge &&
                !edge || !edge.node.context
                  ? null
                  : edge.node.context.__typename === 'Community' && (
                      <div key={i}>
                        <CommunitySmall community={edge.node.context} />
                      </div>
                    )
            )}
          </Slider>
        )}
      </Box>
    </>
  );
};

export default MultipleItems;

const sliderSettings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
