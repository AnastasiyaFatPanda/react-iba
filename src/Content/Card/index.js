import './Card.scss';
import PropTypes from 'prop-types';

const Card = props => (
    <div className="card">
        <div className="title"> {props.name} </div>
        <div className="decr"> {props.decr} </div>
    </div>
)

Card.propTypes = {
    name: PropTypes.string,
    decr: PropTypes.string,
};

export default Card;