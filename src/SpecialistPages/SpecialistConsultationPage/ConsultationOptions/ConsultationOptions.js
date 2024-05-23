import React, { useEffect, useRef } from 'react';

// ConsultationOptions Component
const ConsultationOptions = ({ localStream, remoteStream }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Set the local stream to the local video element
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Set the remote stream to the remote video element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="consultation-options">
      <div className="video-option">
        <div className="video-container">
          <video ref={localVideoRef} autoPlay playsInline className="local-video" />
          <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
        </div>
      </div>
      <div className="chat-option">
        chat
        {/* Chat component or placeholder goes here */}
      </div>
    </div>
  );
};

export default ConsultationOptions;
