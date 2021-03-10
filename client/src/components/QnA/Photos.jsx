import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

export default function Photos({photo}) {
  const [modalState, setModal] = useState(false);

  return (
    <div id="column">
      <img src={photo} width='100px' height='100px' onClick={()=>{setModal(true)}}/>
      <Modal isOpen={modalState} onRequestClose={()=>{setModal(false)}} appElement={document.getElementById('app')}>
        <img src={photo} width='100%' height='100%'/>
      </Modal>
    </div>
  )
}