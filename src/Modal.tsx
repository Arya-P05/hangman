import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button
          onClick={() => window.location.reload()}
          style={closeButtonStyles}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

// Styles (you can customize these)
const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyles: React.CSSProperties = {
  background: "white",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "300px",
  textAlign: "center",
  position: "relative",
};

const closeButtonStyles: React.CSSProperties = {
  marginTop: "10px",
  border: "none",
  background: "hsl(200, 100%, 50%)",
  color: "white",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Modal;
