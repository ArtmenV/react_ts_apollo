import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { HeroCommunity, Props, Status } from '.';

storiesOf('Modules/HeroCommunity', module)
  .addDecorator(themeDeco())
  .add('Standard', () => {
    const props: Props = {
      community: {
        status: Status.Loaded,
        canModify: true,
        following: true,
        icon: 'https://picsum.photos/800/300',
        name: 'Community nino',
        fullName: 'ninos@instance.com',
        summary: '',
        totalMembers: 193,
        toggleJoin: {
          toggle: action('Unjoin !'),
          isSubmitting: true
        },
        EditCommunityPanel: ({ done }) => (
          <img
            onClick={done}
            src="https://via.placeholder.com/400x200.png?text=An editing panel"
          />
        )
      }
    };
    return <HeroCommunity {...props} />;
  });
