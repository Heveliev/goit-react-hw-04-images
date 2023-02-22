import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal  } from "react-dom";
import { Overlay, Modal } from "./ModalWindow.styled";


const modalRoot =  document.querySelector('#modal-root');


export const ModalWindow = ({ onClose, show, children }) => {
    
    function handleEscDown (e) {
        if (e.code === 'Escape') {
         onClose();
        }
    }

    const handleKeyDown = handleEscDown;
    useEffect(() => {
        

        if (show) {
        window.addEventListener('keydown', handleKeyDown)
    }
        return () => { window.removeEventListener('keydown', handleKeyDown);}
},[show,handleKeyDown])



    const handleOverlayClick = e =>{
    if(e.currentTarget === e.target){
    onClose();
    }
}
    return ( 
       createPortal(
            <Overlay onClick={handleOverlayClick}>
      <Modal >
        {children}
      </Modal>
    </Overlay>,
    modalRoot,
        )
   ) 
}

ModalWindow.propTypes = {
    onClose: PropTypes.func.isRequired,
}