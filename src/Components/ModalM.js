import React from 'react';
import Modal from 'react-modal';

const ModalM = ({ isOpen, onRequestClose, children }) => {
    Modal.setAppElement('#root');
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>{children}</Modal>
    );
};

export default ModalM;
