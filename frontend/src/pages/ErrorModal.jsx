import "./ErrorModal.css";

const ErrorModal = ({ show, message, onClose }) => {
    if (!show) return null;
    return (
        <div className="modal_overlay color_green">
            <div className="modal_content flex_row flex_all_center">
                <div>Error</div>
                <div className="modal_message">{message}</div>
                <div className="modal_button flex_row flex_all_center" onClick={onClose}>Close</div>
            </div>
        </div>
    );
};

export default ErrorModal;