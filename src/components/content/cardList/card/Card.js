import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import CardBody from './CardBody/CardBody';

class Card extends React.Component {
    constructor(props) {
        super(props);
        const { title, descr, selected } = this.props;
        this.state = {
            selectedCard: selected,
            isEdited: false,
            title,
            descr,
        };

        this.cardBodyRef = React.createRef();
    }

    componentDidUpdate(nextProps) {
        const { viewOnly } = this.props;
        if (!nextProps.viewOnly !== !viewOnly) {
            this.onCancel();
        }
    }

    handleCheckboxClick = () => {
        const { selectedCard } = this.state;
        const { title, descr, onSelect, id } = this.props;
        this.setState({ selectedCard: !selectedCard });
        onSelect({ id, title, descr, selected: !selectedCard });
    };

    onEdit = () => {
        const { title, descr, onSelect, id } = this.props;
        this.setState({ isEdited: true, selectedCard: false });
        onSelect({ id, title, descr, selected: false });
    };

    onCancel = () => {
        const { title, descr } = this.state;
        this.setState({ isEdited: false, title, descr });
        this.cardBodyRef.current.setState({ descr });
    };

    onSubmit = newValue => {
        this.setState({
            isEdited: false,
            ...newValue,
        });
    };

    renderEditable = () => {
        const { title, descr, viewOnly, isEdited } = this.state;
        return (
            <>
                <CardHeader
                    title={title}
                    viewOnly={viewOnly}
                    onCancel={this.onCancel}
                    onSubmit={this.onSubmit}
                    isEdited={isEdited}
                />
                <CardBody
                    ref={this.cardBodyRef}
                    descr={descr}
                    viewOnly={viewOnly}
                    isEdited={isEdited}
                    onCancel={this.onCancel}
                />
            </>
        );
    };

    renderNotEditable = () => {
        const { title, descr, isEdited } = this.state;
        const { viewOnly } = this.props;
        return (
            <>
                <CardHeader
                    title={title}
                    viewOnly={viewOnly}
                    isEdited={isEdited}
                    handleCheckboxClick={this.handleCheckboxClick}
                    onEdit={this.onEdit}
                    onCancel={this.onCancel}
                />
                <CardBody
                    ref={this.cardBodyRef}
                    descr={descr}
                    viewOnly={viewOnly}
                    isEdited={isEdited}
                    onCancel={this.onCancel}
                />
            </>
        );
    };

    render() {
        const { selectedCard, isEdited } = this.state;
        const className = selectedCard ? 'card selected' : 'card';
        return (
            <div className={className}>
                {isEdited ? this.renderEditable() : this.renderNotEditable()}
            </div>
        );
    }
}

Card.propTypes = {
    viewOnly: PropTypes.bool,
    title: PropTypes.string,
    descr: PropTypes.string,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    id: PropTypes.number,
};

export default Card;
