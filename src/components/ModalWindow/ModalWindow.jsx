import React from "react";
import PropTypes from 'prop-types';
import { createPortal  } from "react-dom";
import { Overlay,Modal } from "./ModalWindow.styled"

const modalRoot =  document.querySelector('#modal-root');


export class ModalWindow extends React.Component{
    

handleKeyDown = e => {
    if (e.code === 'Escape') {
        this.props.onClose();
    }}

handleOverlayClick = e =>{
    if(e.currentTarget === e.target){
        this.props.onClose();
    }
}
    

componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
    }

    
componentWillUnmount(){
window.removeEventListener('keydown', this.handleKeyDown)
}

    render(){
        return  createPortal(
            <Overlay onClick={this.handleOverlayClick}>
      <Modal >
        {this.props.children}
      </Modal>
    </Overlay>,
    modalRoot,
        )
    }

}

ModalWindow.propTypes = {
    onClose: PropTypes.func.isRequired,
}