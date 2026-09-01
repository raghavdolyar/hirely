import './loader.scss';

export const Loader = ({ fullPage = false, className = '' }) => {
  if (fullPage) {
    return (
      <div className={`loader-container full-page ${className}`}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={`loader-container ${className}`}>
      <div className="spinner inline"></div>
    </div>
  );
};
