import React, { useState } from 'react';
import Modal from 'react-modal';

export default function ReviewTilePhoto({ photo }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <img
        className="photo-thumbnail"
        src={photo.url}
        alt={photo.id}
        key={photo.id}
        onClick={handleOpen}
      />

      <Modal
        className="photo-modal"
        isOpen={isOpen}
        onRequestClose={handleClose}
        ariaHideApp={false}
      >
        <img src={photo.url} alt={photo.id} key={photo.id} />
      </Modal>
    </>
  );
}
