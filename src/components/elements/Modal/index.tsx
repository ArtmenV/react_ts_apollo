import * as React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

interface PortalState {
  el: any;
}

class Portal extends React.Component<{}, PortalState> {
  el: HTMLElement = document.createElement('div');
  modalRoot: HTMLElement;
  constructor(a, b) {
    super(a, b);
    this.modalRoot = document.getElementById('modal') as HTMLElement;
  }
  componentDidMount() {
    this.modalRoot && this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot && this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default props => (
  <Portal>
    <Modal {...props} />
  </Portal>
);
