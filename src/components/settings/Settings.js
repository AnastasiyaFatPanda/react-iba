
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { SettingsActions } from '../../redux/reducers/settingsReducer';

const ViewOnlyCheckbox = styled.div`
    padding-top: 2rem;
    margin 10px;

    color: ${props => (props.inputSelected ? 'LightSteelBlue' : 'LightGray')};
    &:hover {
        color: ${props => (props.inputSelected ? 'CornflowerBlue' : 'Black')};
    }
`;

const Settings = ({ readOnly, readOnlyHandle }) => (
    <>
        <h2>Settings</h2>
        <ViewOnlyCheckbox inputSelected={readOnly}>
            <input
                id="viewOnlyCheckbox"
                className="form-check-input"
                checked={readOnly}
                type="checkbox"
                onChange={readOnlyHandle}
            />
            <label
                className="form-check-label"
                htmlFor="viewOnlyCheckbox"
            >
                View only
            </label>
        </ViewOnlyCheckbox>
    </>
)

Settings.propTypes = {
    readOnly: PropTypes.bool,
    readOnlyHandle: PropTypes.func,
};

const mapStateToProps = state => ({
    readOnly: state.settingsReducer.readOnly,
});

const mapDispatchToProps = {
    readOnlyHandle: SettingsActions.toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);