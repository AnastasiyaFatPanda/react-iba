import React from 'react';
import PropTypes from 'prop-types';

class CardBody extends React.Component {
    constructor(props) {
        super(props);
        const { descr, } = this.props;
        this.state = {
            descr,
        };
    }

    componentDidUpdate(nextProps) {
        const { viewOnly, onCancel } = this.props;
        if (!nextProps.viewOnly !== !viewOnly) {
            onCancel();
            this.returnToInitial();
        }
    }

    returnToInitial = () => {
        const { descr } = this.props;
        this.setState({ descr });
    }

    onChange = newDescription => {
        this.setState({ descr: newDescription?.target?.value });
    }

    renderEditable = () => {
        const { descr } = this.state;
        return (
            <div className="card-body">
                <textarea
                    className="form-control textarea"
                    type="text"
                    value={descr}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    renderNotEditable = () => {
        const { descr } = this.state;
        return (<div className="card-body descr"> {descr} </div>);
    }

    render() {
        const { viewOnly, isEdited } = this.props;
        return isEdited && !viewOnly ? this.renderEditable() : this.renderNotEditable();
    }
}

CardBody.propTypes = {
    descr: PropTypes.string,
    isEdited: PropTypes.bool,
    viewOnly: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default CardBody;