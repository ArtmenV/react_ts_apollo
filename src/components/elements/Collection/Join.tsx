import gql from 'graphql-tag';
import React from 'react';
import { Trans } from '@lingui/macro';
import { graphql } from 'react-apollo';
import { compose, withState } from 'recompose';
// import styled from '../../../themes/styled';
import { Button } from 'rebass/styled-components';
import Loader from '../Loader/Loader';
// import { Trans } from '@lingui/react';
const { followMutation } = require('../../../graphql/follow.graphql');
const { deleteMutation } = require('../../../graphql/delete.graphql');

interface Props {
  joinCollection: any;
  leaveCollection: any;
  id: string;
  followed: boolean;
  externalId: string;
  isSubmitting: boolean;
  onSubmitting: any;
}

const withJoinCollection = graphql(followMutation, {
  name: 'joinCollection'
  // TODO enforce proper types for OperationOption
});

const withLeaveCollection = graphql(deleteMutation, {
  name: 'leaveCollection'
  // TODO enforce proper types for OperationOption
});

const Join: React.FC<Props> = ({
  joinCollection,
  id,
  leaveCollection,
  externalId,
  followed,
  isSubmitting,
  onSubmitting
}) => {
  if (followed) {
    return (
      <Button
        variant="outline"
        unfollow
        onClick={() => {
          onSubmitting(true);
          return leaveCollection({
            variables: { contextId: id },
            update: (proxy, { data }) => {
              const fragment = gql`
                fragment Res on Collection {
                  followed
                }
              `;
              let collection = proxy.readFragment({
                id: `Collection:${id}`,
                fragment: fragment,
                fragmentName: 'Res'
              });
              collection.myFollow = null;
              proxy.writeFragment({
                id: `Collection:${id}`,
                fragment: fragment,
                fragmentName: 'Res',
                data: collection
              });
            }
          })
            .then(res => {
              onSubmitting(false);
            })
            .catch(err => console.log(err));
        }}
      >
        {isSubmitting ? <Loader /> : <Trans>Unfollow</Trans>}
      </Button>
    );
  } else {
    return (
      <Button
        variant="primary"
        onClick={() => {
          onSubmitting(true);
          return joinCollection({
            variables: { contextId: id },
            update: (proxy, { data: { createFollow } }) => {
              const fragment = gql`
                fragment Res on Collection {
                  myFollow
                }
              `;
              let collection = proxy.readFragment({
                id: `Collection:${id}`,
                fragment: fragment,
                fragmentName: 'Res'
              });
              collection.myFollow = createFollow;
              proxy.writeFragment({
                id: `Collection:${id}`,
                fragment: fragment,
                fragmentName: 'Res',
                data: collection
              });
            }
          })
            .then(res => {
              onSubmitting(false);
            })
            .catch(err => console.log(err));
        }}
      >
        {isSubmitting ? <Loader /> : <Trans>Follow</Trans>}
      </Button>
    );
  }
};

export default compose(
  withJoinCollection,
  withLeaveCollection,
  withState('isSubmitting', 'onSubmitting', false)
)(Join);
