import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageURL || null}
          width="500px"
          height="auto"
        />
        {
          // Loop through the array of boxes
          boxes.map((box, i) => {
            const { leftCol, topRow, rightCol, bottomRow } = box;
            return (
              <div
                key={i}
                className="bounding-box"
                style={{
                  top: topRow,
                  right: rightCol,
                  bottom: bottomRow,
                  left: leftCol,
                }}
              ></div>
            );
          })
        }
      </div>
    </div>
  );
};

export default FaceRecognition;
