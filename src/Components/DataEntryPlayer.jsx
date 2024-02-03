import React, { Component, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import JEEFACETRANSFERAPI from "../WebGL/jeelizFaceTransfer.module";
class DataEntryPlayer extends Component {
  constructor() {
    super();
    this.state = {
      FaceDetect: "....",
    };
  }

  OpenWebGLCamera = () => {
    JEEFACETRANSFERAPI.init({
      canvasId: "canvasID",
      NNCPath: "models/",
      hysteresis: 0.1,
      isMirror: true,
      callbackReady: (err) => {
        if (err) {
          console.log("Error");
        } else {
          this.getFaceMovement();
        }
      },
    });
  };

  getFaceMovement = () => {
    setInterval(() => {
      let FaceMovement = JEEFACETRANSFERAPI.get_morphTargetInfluences();
      if (JEEFACETRANSFERAPI.is_detected()) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
    }, 0);
  };

  componentDidMount() {
    this.OpenWebGLCamera();
  }

  playVideo = () => {
    this.player.play();
  };

  pauseVideo = () => {
    this.player.pause();
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Row className="d-flex  mt-3 justify-content-center">
            <Col md={8} lg={8}>
              <Player
                ref={(player) => {
                  this.player = player;
                }}
                src={this.props.file}
              >
                <BigPlayButton position="center" />
              </Player>
            </Col>
          </Row>

          <Row className="d-flex  mt-3 justify-content-center">
            <Col md={4} lg={4}>
              <canvas className="canvasClass" id="canvasID" />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default DataEntryPlayer;
