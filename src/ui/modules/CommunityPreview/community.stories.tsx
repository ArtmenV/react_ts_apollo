import React from 'react';
import { storiesOf } from '@storybook/react';
import { CommunityPreview, CommunitySmall, Props } from '.';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { Box, Flex } from 'rebass/styled-components';

let communityProps: Props = {
  icon: 'https://picsum.photos/id/32/150/150',
  name: 'awesome community',
  summary:
    'More simply put, the difference is in the standards and documentation that accompanies the assets. With a guide on why and how to use them, design components because easier to use and clearer to discern.',
  followersCount: 12,
  collectionsCount: 3
};

storiesOf('Modules/Community', module)
  .addDecorator(themeDeco())
  .add('Standard Community', () => (
    <Flex>
      <CommunityPreview {...communityProps} />

      <CommunityPreview {...communityProps} />

      <CommunityPreview {...communityProps} />
    </Flex>
  ));

storiesOf('Modules/Community', module)
  .addDecorator(themeDeco())
  .add('Community preview', () => (
    <div>
      <Box m={2}>
        <CommunitySmall icon={communityProps.icon} name={communityProps.name} />
      </Box>
    </div>
  ));
