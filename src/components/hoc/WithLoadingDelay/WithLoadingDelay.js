import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
    height: 250px;
    margin: 15px;
    width: 250px;
`;

const WithLoadingDelay = props => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
    }, []);

    return isLoaded ? (
        props.children
    ) : (
        <SpinnerDiv className="spinner-border" role="status" />
    );
};

WithLoadingDelay.propTypes = {
    children: PropTypes.element.isRequired,
};

export default WithLoadingDelay;
