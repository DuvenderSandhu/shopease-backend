import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const ModalFormat = ({isModalOpen}) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      
    </>
  );
};
export default ModalFormat;