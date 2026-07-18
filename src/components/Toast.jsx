import React from 'react';

const Toast = ({
  message,
  type = 'success',
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{
        zIndex: 9999,
      }}
    >
      <div
        className={`toast show text-bg-${type}`}
      >
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>

          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;