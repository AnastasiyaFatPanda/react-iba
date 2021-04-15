import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
    height: 250px;
    margin: 15px;
    width: 250px;
`;

const withLoadingDelay = (WrappedComponent) => props => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
    }, []);

    return isLoaded
        ? (<WrappedComponent {...props} />)
        : (<SpinnerDiv className="spinner-border" role="status" />);
}

export default withLoadingDelay;
