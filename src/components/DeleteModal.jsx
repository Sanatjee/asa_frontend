import React from 'react';

const DeleteModal = ({
  show,
  title = 'Delete',
  message,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: 'block',
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {title}
              </h5>

              <button
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-label-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={
                  onConfirm
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  );
};

export default DeleteModal;