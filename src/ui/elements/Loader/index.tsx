import * as React from 'react';
import styled from 'ui/themes/styled';
import { Box } from 'rebass/styled-components';
import './loader.css';
const Bounce = styled(Box)<{ color: string }>`
  background-color: ${props =>
    props.color === 'primary' ? '#ffffffeb' : props.theme.colors.orange};
`;

/**
 * Loader spinner component.
 * @param props {Object} props of the loader
 * @constructor
 */
function Loader({ ...props }) {
  return (
    <div className="spinner" {...props}>
      <Bounce color={props.variant} className="bounce1" />
      <Bounce color={props.variant} className="bounce2" />
      <Bounce color={props.variant} className="bounce3" />
    </div>
  );
}

export default Loader;
