import React from 'react';

const Loader = () => {
    return (
        <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div className="loader"></div>
        </div>
    );
};

export default Loader;