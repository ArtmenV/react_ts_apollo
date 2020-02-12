import { Trans } from '@lingui/macro';
import { useGetCollectionsQueryQuery } from 'graphql/getCollections.generated';
import * as React from 'react';
import { Text } from 'rebass/styled-components';
import { CollectionPreview } from 'ui/modules/CollectionPreview';
import Loader from '../../components/elements/Loader/Loader';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { WrapperPanel } from '../../sections/panel';
import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';

export const CollectionsYours: React.SFC = () => {
  const { error, data, loading } = useGetCollectionsQueryQuery({
    variables: {
      limit: 15
    }
  });
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            <Text
              mb={3}
              sx={{ borderBottom: '1px solid #dadada' }}
              p={3}
              variant="suptitle"
            >
              <Trans>All collections</Trans>
            </Text>
            <div>
              {(!data && !loading) || error ? (
                <span>
                  <Trans>Error loading collections</Trans>
                </span>
              ) : !data || loading ? (
                <Loader />
              ) : (
                <>
                  {/* <Helmet>
                        <title>{APP_NAME} > All collections</title>
                      </Helmet> */}
                  <List>
                    {data.collections.nodes &&
                      data.collections.nodes.map(
                        (coll, i) =>
                          coll && (
                            <div key={i}>
                              <CollectionPreview
                                icon={coll.icon || ''}
                                name={coll.name}
                                summary={coll.summary!}
                                link={{
                                  url: 'collections/' + coll.id,
                                  external: false
                                }}
                                totalResources={coll.resources!.totalCount}
                              />
                            </div>
                          )
                          // <CollectionCard key={i} collection={coll} />
                      )}
                  </List>
                  {/* <CollectionsLoadMore
                          fetchMore={data.fetchMore}
                          collections={data.collections}
                        /> */}
                </>
              )}
            </div>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel />
    </MainContainer>
  );
};

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 0;
`;
