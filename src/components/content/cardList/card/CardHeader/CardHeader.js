import React from 'react';
import './CardHeader.scss';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiXCircle, FiEdit } from 'react-icons/fi';

class CardHeader extends React.Component {
    constructor(props) {
        super(props);
        const { title } = this.props;
        this.state = {
            title,
        };
    }

    componentDidUpdate(nextProps) {
        const { viewOnly, onCancel } = this.props;
        if (!nextProps.viewOnly !== !viewOnly) {
            onCancel();
        }
    }

    onChange = newTitle => {
        this.setState({ title: newTitle?.target?.value });
    };

    render() {
        const {
            handleCheckboxClick,
            viewOnly,
            isEdited,
            onEdit,
            onSubmit,
            onCancel,
        } = this.props;
        const { title } = this.state;

        return isEdited && !viewOnly ? (
            <div className="title row">
                <div className="col-8">
                    <textarea
                        className="form-control textarea-title"
                        type="text"
                        value={title}
                        onChange={this.onChange}
                    />
                </div>
                <div className="col-1 actionButton">
                    <FiXCircle className="fiXButton" onClick={onCancel} />
                </div>
                <div className="col-1 actionButton">
                    <FiCheckCircle
                        className="fiXButton"
                        onClick={() => onSubmit({ title })}
                    />
                </div>
            </div>
        ) : (
            <div className="title row">
                <div className="col-8 title-text" title={title}>
                    {title}
                </div>
                <div className="col-1">
                    <input type="checkbox" onClick={handleCheckboxClick} />
                </div>
                {!viewOnly && (
                    <div className="col-1 edit-button">
                        <FiEdit onClick={onEdit} />
                    </div>
                )}
            </div>
        );
    }
}

CardHeader.propTypes = {
    title: PropTypes.string,
    isEdited: PropTypes.bool,
    viewOnly: PropTypes.bool,
    handleCheckboxClick: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default CardHeader;
