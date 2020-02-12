import * as React from 'react';
import styled from '../../../themes/styled';

const Wrapper = styled.div`
  border-radius: 4px;
  height: 26px;
  line-height: 26px;
  color: white;
  background: ${props => props.color || 'red'};
  padding: 0 10px;
  font-size: 14px;
  margin-top: 2px;
`;
const Alert: React.FC<{ color?: string }> = ({ color, children }) => (
  <Wrapper color={color}>{children}</Wrapper>
);

export default Alert;
