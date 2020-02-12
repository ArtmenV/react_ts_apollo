import { Trans } from '@lingui/macro';
import * as React from 'react';
import Empty from '../../components/elements/Empty';
import Loader from '../../components/elements/Loader/Loader';
import { GetThreadQueryHookResult } from '../../graphql/getThread.generated';
// import Thread from '../../components/elements/thread';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import Header, { Preview } from './header';
// import { Box } from 'rebass/styled-components';

export interface Props {
  threadQuery: GetThreadQueryHookResult;
  ThreadBoxes: JSX.Element[];
}
const Component: React.FC<Props> = ({ threadQuery: thread, ThreadBoxes }) => {
  const ctx =
    !!thread.data && !!thread.data.thread && thread.data.thread.context;
  const context =
    ctx &&
    (ctx.__typename === 'Resource' ||
      ctx.__typename === 'Collection' ||
      ctx.__typename === 'Community') &&
    ctx;

  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            {thread.loading ? (
              <Empty alignItems="center" mt={3}>
                <Loader />
              </Empty>
            ) : thread.error || !thread.data ? (
              <Empty>
                <Trans>Is it not possible to show the thread</Trans>
              </Empty>
            ) : !thread.data ? null : (
              <>
                {context && <Header context={context} />}

                {/* {thread.data.thread ? (
                    <Box variant="inReplyTo">
                    <Comment
                    noAction
                    key={thread.data.thread.id}
                    comment={thread.data.thread}
                    />
                  </Box>
                  ) : null}
                  <Thread comment={thread.data.thread} /> */}
                {context && <Preview context={context} />}
                {ThreadBoxes}
              </>
            )}
          </Wrapper>
        </WrapperCont>
      </HomeBox>
    </MainContainer>
  );
};
export default Component;
