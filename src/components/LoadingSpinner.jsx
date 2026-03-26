import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
                <div className="spinner"></div>
                <p className="spinner-text">Loading transactions...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
