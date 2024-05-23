import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ConsultationOptions.css';

// ConsultationOptions Component
const ConsultationOptions = ({ localStream, remoteStream, setRemoteStream }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <Container className="consultation-options my-4">
      <Row>
        <Col md={6} className="text-center mb-3">
          <video className="video-preview" ref={localVideoRef} autoPlay playsInline></video>
          <div className="video-label">Your Video</div>
        </Col>
        <Col md={6} className="text-center mb-3">
          <video className="video-preview" ref={remoteVideoRef} autoPlay playsInline></video>
          <div className="video-label">Specialist Video</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="chat-option">
            <h5>Chat</h5>
            {/* Chat component or placeholder goes here */}
            <div className="chat-placeholder">Chat functionality coming soon...</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ConsultationOptions;
