import React from 'react';
import {Modal as ReactstrapModal, ModalBody, ModalHeader} from "reactstrap";
import '../MyArtComponent/MyArtComponent.scss';
import '../MyStoreComponent.scss';

const Modal = props => {
  const {
    header,
    body,
    isOpen,
    toggle,
    onClosed,
    className,
    ...modalProps
  } = props

  return (
    <ReactstrapModal
      isOpen={isOpen}
      toggle={toggle}
      onClosed={onClosed}
      className={className}
      {...modalProps}
    >
      <ModalHeader toggle={toggle}>
        {header}
      </ModalHeader>
      <ModalBody>
        {body}
      </ModalBody>
    </ReactstrapModal>
  );
};

export default Modal;
