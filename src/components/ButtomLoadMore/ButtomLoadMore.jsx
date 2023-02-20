import { Button } from "./ButtomLoadMore.styled";
import PropTypes from 'prop-types';

export const ButtonLoadMore = ({title,onClick}) => {
    return (
        <Button onClick={onClick} type='button'>{title}</Button>
    )
}

ButtonLoadMore.propTypes = {
    title:PropTypes.string,
    onClick:PropTypes.func.isRequired
}