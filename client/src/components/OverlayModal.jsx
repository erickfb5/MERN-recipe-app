import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

 const OverlayModal = ({ message, path = "" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(path);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="modal" id="savingModal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{message || ""}</h3>
        </div>
        {message.includes("found") && <ToastContainer />}
      </div>
    </div>
  );
};

export default OverlayModal