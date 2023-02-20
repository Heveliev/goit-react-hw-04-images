import PropTypes from 'prop-types';
import { List } from "./GalleryList.styled";
import { GalleryItem } from "components/GalleryItem/GalleryItem";


export const GalleryList = ({image})=>{

            return (<List >{image.map(img => (<GalleryItem
                key={img.user}
                img={img.webformatURL}
                user={img.user}
                urlBig={img.largeImageURL} />))}</List>)
        }


    

GalleryItem.propTypes = {
    image: PropTypes.array.isRequired
}
