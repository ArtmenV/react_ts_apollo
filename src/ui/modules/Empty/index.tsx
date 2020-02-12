import * as React from 'react';
import styled from 'ui/themes/styled';
import { Box, Text } from 'rebass/styled-components';
import { Meh } from 'react-feather';
const Wrapper = styled(Box)`
  padding: 40px 0px;
  text-align: center;
  border-radius: 4px;
  color: ${props => props.theme.colors.darkYellow};
  background: ${props => props.theme.colors.yellow};
`;

const Title = styled(Text)`
  color: ${props => props.theme.colors.darkYellow};
  font-size: 20px;
`;
const Empty: React.FC = ({ children }) => (
  <Wrapper>
    <Meh size="32" />
    <Title mt={2} variant="heading">
      {children}
    </Title>
  </Wrapper>
);

export default Empty;
