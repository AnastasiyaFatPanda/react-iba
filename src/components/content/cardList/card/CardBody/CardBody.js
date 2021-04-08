import React from 'react';
import './CardBody.scss';
import PropTypes from 'prop-types';

class CardBody extends React.Component {
    constructor(props) {
        super(props);
        const { descr } = this.props;
        this.state = {
            descr,
        };
    }

    componentDidUpdate(nextProps) {
        const { viewOnly, onCancel } = this.props;
        if (!nextProps.viewOnly !== !viewOnly) {
            onCancel();
        }
    }

    onChange = newDescription => {
        this.setState({ descr: newDescription?.target?.value });
    };

    render() {
        const { viewOnly, isEdited } = this.props;
        const { descr } = this.state;

        return isEdited && !viewOnly ? (
            <textarea
                className="form-control textarea"
                type="text"
                value={descr}
                onChange={this.onChange}
            />
        ) : (
            <div className="descr"> {descr} </div>
        );
    }
}

CardBody.propTypes = {
    descr: PropTypes.string,
    isEdited: PropTypes.bool,
    viewOnly: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default CardBody;
