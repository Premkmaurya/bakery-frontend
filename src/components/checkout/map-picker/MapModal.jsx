import "./MapModal.scss";

const MapModal = ({ children }) => {
  return (
    <div className="map-modal">
      <div className="map-modal-content">{children}</div>
    </div>
  );
};

export default MapModal;
