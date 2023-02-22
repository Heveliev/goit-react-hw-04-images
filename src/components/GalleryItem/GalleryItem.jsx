import { Item, Image } from "./GalleryItem.styled";
import { ModalWindow } from "components/ModalWindow/ModalWindow";
import {useState} from "react";
import PropTypes from 'prop-types';





export const GalleryItem = ({img,user,urlBig}) => {
    const [showModal, setShowModal] = useState(false);


    const toggleModal = () => {
        setShowModal((state) => (!state))
    }
    return (
          <Item >
                <Image onClick={toggleModal}  src={img} alt={`image${user}`} />
                {showModal && <ModalWindow onClose={toggleModal} show={showModal}><img src={urlBig} alt={user} /></ModalWindow>}
            </Item>
    )
}

GalleryItem.propTypes = {
    img:PropTypes.string.isRequired,
    user:PropTypes.string.isRequired,
    urlBig:PropTypes.string.isRequired
}
