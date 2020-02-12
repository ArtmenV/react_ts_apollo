import { Trans } from '@lingui/macro';
import { useGetFeaturedCollectionsQuery } from 'graphql/getFeaturedCollections.generated';
import React, { useRef, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { LocaleContext } from '../../context/global/localizationCtx';
import CollectionSmall from '../elements/Collection/CollectionSmall';
import { ChevronLeft, Right } from '../elements/Icons';
import Loader from '../elements/Loader/Loader';
import { RightContext, Title } from '../featuredCommunities';
import { Box } from 'rebass';

const MultipleItems: React.FC = () => {
  const props = useGetFeaturedCollectionsQuery();
  const sliderRef = useRef<Slider>();
  const { RTL } = useContext(LocaleContext);
  return (
    <>
      <Title>
        <h5>
          <Trans>Featured collections</Trans>{' '}
        </h5>
        {RTL ? (
          <RightContext>
            <span onClick={sliderRef.current && sliderRef.current.slickNext}>
              <Right width={26} height={26} strokeWidth={1} color={'inherit'} />
            </span>
            <span onClick={sliderRef.current && sliderRef.current.slickPrev}>
              <ChevronLeft
                width={26}
                height={26}
                strokeWidth={1}
                color={'inherit'}
              />
            </span>
          </RightContext>
        ) : (
          <RightContext>
            <span onClick={sliderRef.current && sliderRef.current.slickPrev}>
              <ChevronLeft
                width={26}
                height={26}
                strokeWidth={1}
                color={'inherit'}
              />
            </span>
            <span onClick={sliderRef.current && sliderRef.current.slickNext}>
              <Right width={26} height={26} strokeWidth={1} color={'inherit'} />
            </span>
          </RightContext>
        )}
      </Title>
      <Box p={2}>
        {!props.data || !props.data.instance || props.error ? (
          <span>
            <Trans>{/* Error loading featured collections */}</Trans>
          </span>
        ) : props.loading ? (
          <Loader />
        ) : //FIXME https://gitlab.com/moodlenet/meta/issues/185
        !props.data.instance.featuredCollections ? null : (
          <Slider
            ref={c => (sliderRef.current = c || undefined)}
            {...sliderSettings}
          >
            {props.data.instance.featuredCollections.edges.map(
              edge =>
                //FIXME https://gitlab.com/moodlenet/meta/issues/185
                // edge &&
                !edge || !edge.node.context
                  ? null
                  : edge.node.context.__typename === 'Collection' && (
                      <CollectionSmall
                        collection={edge.node.context}
                        key={edge.node.id}
                      />
                    )
            )}
          </Slider>
        )}
      </Box>
    </>
  );
};

export default MultipleItems;

const sliderSettings = {
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
