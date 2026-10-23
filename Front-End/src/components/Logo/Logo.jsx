import Tilt from "react-parallax-tilt";
import logo from "../../assets/vecteezy_face-recognition.png";
import "./Logo.css";
// <a href="https://www.vecteezy.com/free-png/face-scan">Face Scan PNGs by Vecteezy</a>

const Logo = () => {
  return (
    <div className="center ma4 mt0">
      <Tilt
        className="tilt shadow-2 background-stripes track-on-window"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.75}
        glarePosition="all"
        scale={1.02}
        trackOnWindow={true}
        glareBorderRadius="20px"
        tiltReverse={true}
      >
        <div className="inner-element">
          <img src={logo} alt="logo"/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
