const Laps = ({ time }) => {
  return (
    <div className="d-flex justify-content-end">
      <div className="d-flex flex-column align-items-center">
        <span>{Math.floor(time / 3600000)}:</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default Laps;
