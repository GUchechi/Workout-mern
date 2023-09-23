const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this workout?</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
