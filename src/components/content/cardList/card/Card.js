import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import withLoadingDelay from '../../../hoc/WithLoadingDelay';
import { updateCard, selectCard } from '../../../../redux/actions/cardActions';

export class Card extends React.Component {
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
        this.cardHeaderRef = React.createRef();
    }

    componentDidUpdate(nextProps) {
        const { viewOnly } = this.props;
        if (!nextProps.viewOnly !== !viewOnly) {
            this.onCancel();
        }
    }

    handleCheckboxClick = () => {
        const { selectedCard } = this.state;
        const { onSelect, id } = this.props;
        this.setState({ selectedCard: !selectedCard });
        onSelect({ id, selected: !selectedCard });
    };

    onEdit = () => {
        const { onSelect, id } = this.props;
        this.setState({ isEdited: true, selectedCard: false });
        onSelect({ id, selected: false });
    };

    onCancel = () => {
        const { title, descr } = this.state;
        this.setState({ isEdited: false, title, descr });
        this.cardBodyRef.current.setState({ descr });
        this.cardHeaderRef.current.setState({ title });
    };

    onSubmit = newValue => {
        const { onChange, id } = this.props;
        this.setState({
            isEdited: false,
            descr: this.cardBodyRef.current.state.descr,
            ...newValue,
        });
        onChange({
            id,
            title: newValue.title,
            descr: this.cardBodyRef.current.state.descr,
        });
    };

    doubleClickHandler = id => {
        const { viewOnly } = this.props;
        if (!viewOnly) {
            const { history } = this.props;
            history.push(`/card/${id}`);
        }
    };

    render() {
        const { viewOnly, id } = this.props;
        const { selectedCard, title, descr, isEdited } = this.state;
        const className = selectedCard ? 'card selected' : 'card';
        return (
            <div className={className} onDoubleClick={() => this.doubleClickHandler(id)}>
                <CardHeader
                    ref={this.cardHeaderRef}
                    title={title}
                    viewOnly={viewOnly}
                    isEdited={isEdited}
                    handleCheckboxClick={this.handleCheckboxClick}
                    onEdit={this.onEdit}
                    onCancel={this.onCancel}
                    onSubmit={this.onSubmit}
                />
                <CardBody
                    ref={this.cardBodyRef}
                    descr={descr}
                    viewOnly={viewOnly}
                    isEdited={isEdited}
                    onCancel={this.onCancel}
                />
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
    onChange: PropTypes.func,
    id: PropTypes.string,
    history: PropTypes.any,
};

const mapDispatchToProps = {
    onChange: updateCard,
    onSelect: selectCard,
};

export default connect(null, mapDispatchToProps)(withLoadingDelay(Card));
