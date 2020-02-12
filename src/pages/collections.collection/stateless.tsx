// View a Collection (with list of resources)

import * as React from 'react';

import { Trans } from '@lingui/macro';
import { clearFix } from 'polished';
import styled from '../../themes/styled';
import { compose, withState, withHandlers } from 'recompose';
import Loader from '../../components/elements/Loader/Loader';
// import EditCollectionModal from '../../components/elements/EditCollectionModal';
import { EditCollectionPanelHOC } from '../../HOC/modules/EditCollectionPanel/editCollectionPanelHOC';
import CollectionPage from './collection';
import Join from '../../components/elements/Collection/Join';
import { Settings } from 'react-feather';
import { Text, Flex } from 'rebass/styled-components';
import media from 'styled-media-query';
import { GetCollectionQueryHookResult } from '../../graphql/getCollection.generated';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import Header from '../thread/header';
import Empty from '../../components/elements/Empty';
import { SessionContext } from '../../context/global/sessionCtx';
import MoreOptions from '../../components/elements/MoreOptions';
import Modal from 'ui/modules/Modal';

export interface Props {
  collectionQuery: GetCollectionQueryHookResult;
  addNewResource(): void;
  editCollection(): void;
  isEditCollectionOpen(): void;
}

const Component: React.FC<Props> = ({
  collectionQuery,
  addNewResource,
  editCollection,
  isEditCollectionOpen
}) => {
  const { me } = React.useContext(SessionContext);
  const isMine =
    !!me &&
    !!collectionQuery.data &&
    !!collectionQuery.data.collection &&
    //FIXME https://gitlab.com/moodlenet/meta/issues/185
    me.user.id === collectionQuery.data.collection.creator!.id;
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            {collectionQuery.loading ? (
              <Empty alignItems="center" mt={3}>
                <Loader />
              </Empty>
            ) : collectionQuery.error || !collectionQuery.data ? (
              <Empty>
                <Trans>Is it not possible to show the collection</Trans>
              </Empty>
            ) : (
              collectionQuery.data.collection && (
                <>
                  {/* FIXME https://gitlab.com/moodlenet/meta/issues/185 */}
                  <Header
                    context={collectionQuery.data.collection.community!}
                  />
                  <HeroCont>
                    <Hero>
                      <Background
                        style={{
                          backgroundImage: `url(${
                            collectionQuery.data.collection.icon
                          })`
                        }}
                      />
                      <HeroInfo>
                        <MoreOptionsContainer>
                          <MoreOptions
                            contextId={collectionQuery.data.collection.id}
                            myFlag={collectionQuery.data.collection.myFlag}
                          />
                        </MoreOptionsContainer>
                        <Title fontSize={5} fontWeight={'bold'}>
                          {collectionQuery.data.collection.name}
                        </Title>
                        {collectionQuery.data.collection.preferredUsername ? (
                          <Username fontSize={1}>
                            +{collectionQuery.data.collection.preferredUsername}
                          </Username>
                        ) : null}
                        <Description fontSize={2} mt={2}>
                          {collectionQuery.data.collection &&
                            collectionQuery.data.collection.summary &&
                            collectionQuery.data.collection.summary
                              .split('\n')
                              .map(function(item, key) {
                                return (
                                  <span key={key}>
                                    {item}
                                    <br />
                                  </span>
                                );
                              })}
                        </Description>
                        <ActionsHero mt={3} alignItems={'center'}>
                          {isMine ? (
                            <EditButton onClick={editCollection}>
                              <Settings size={18} color={'#f98012'} />
                            </EditButton>
                          ) : null}
                          <Join
                            followed={
                              !!collectionQuery.data.collection.myFollow
                            }
                            id={collectionQuery.data.collection.id}
                            externalId={collectionQuery.data.collection.id}
                          />
                        </ActionsHero>
                      </HeroInfo>
                    </Hero>
                  </HeroCont>

                  <CollectionPage
                    collection={collectionQuery.data.collection}
                    community_name={
                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                      collectionQuery.data.collection.community!.name
                    }
                    resources={
                      /* FIXME https://gitlab.com/moodlenet/meta/issues/185 */
                      collectionQuery.data.collection.resources!
                    }
                    addNewResource={addNewResource}
                    fetchMore={collectionQuery.fetchMore}
                    type={'collection'}
                  />
                  {isEditCollectionOpen && (
                    <Modal closeModal={editCollection}>
                      <EditCollectionPanelHOC
                        collectionId={collectionQuery.data.collection.id}
                        done={editCollection}
                      />
                    </Modal>
                  )}
                  {/* <EditCollectionModal
                    toggleModal={editCollection}
                    modalIsOpen={isEditCollectionOpen}
                    collectionId={collectionQuery.data.collection.id}
                    collectionExternalId={collectionQuery.data.collection.id}
                    collection={collectionQuery.data.collection}
                    collectionUpdated={collectionQuery.refetch}
                  /> */}
                </>
              )
            )}
          </Wrapper>
        </WrapperCont>
      </HomeBox>
    </MainContainer>
  );
};

const Title = styled(Text)`
  color: ${props => props.theme.colors.darkgray};
`;

const Description = styled(Text)`
  color: ${props => props.theme.colors.darkgray};
`;

const Username = styled(Text)`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

const ActionsHero = styled(Flex)``;

const EditButton = styled.span`
  height: 40px;
  font-weight: 600;
  font-size: 13px;
  line-height: 38px;
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: bottom;
  margin-right: 16px;
  border-radius: 40px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.orange};
  cursor: pointer;
  & svg {
    text-align: center;
    vertical-align: text-bottom;
    color: inherit !important;
  }
  .--rtl & {
    margin-right: 0px;
    margin-left: 16px;
  }
`;

const HeroInfo = styled.div`
  flex: 1;
  margin-left: 16px;
  position: relative;
  ${clearFix()};
  & h2 {
    margin: 0;
    line-height: 32px !important;
    font-size: 24px !important;
    color: ${props => props.theme.colors.darkgray};
    ${media.lessThan('medium')`
      margin-top: 8px;
    `};
  }
  & p {
    margin: 0;
    color: rgba(0, 0, 0, 0.8);
    font-size: 15px;
    margin-top: 8px;
    color: ${props => props.theme.colors.darkgray};
  }
  .--rtl & {
    margin-right: 16px;
    margin-left: 0px;
  }
`;
const HeroCont = styled.div`
  margin-bottom: 16px;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Hero = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  padding: 16px;
  ${media.lessThan('medium')`
  text-align: center;
  display: block;
`};
`;

const Background = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${props => props.theme.colors.lightgray};
  position: relative;
  margin: 0 auto;
`;

const MoreOptionsContainer = styled.div`
  float: right;
  position: relative;
`;

export default compose(
  withState('isEditCollectionOpen', 'onEditCollectionOpen', false),
  withHandlers({
    editCollection: props => () =>
      props.onEditCollectionOpen(!props.isEditCollectionOpen)
  })
)(Component);
