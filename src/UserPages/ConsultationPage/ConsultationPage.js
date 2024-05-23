import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import Header from "./Header/Header";
import ConsultationHeader from "./ConsultationHeader/ConsultationHeader";
import ConsultationOptions from "./ConsultationOptions/ConsultationOptions";
import Footer from "./Footer/Footer";
import io from 'socket.io-client';
import './ConsultationPage.css';  // Import custom CSS

// Google and Mozilla ICE servers for development 
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
    {
      urls: ["stun:stun.services.google.com"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const ConsultationPage = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [isCaller, setIsCaller] = useState(false);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const hasCreatedOffer = useRef(false);
  const appointmentIdRef = useRef(null);

  const setupPeerConnection = async (stream) => {
    const pc = new RTCPeerConnection(servers);

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
      });
    };

    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
        socketRef.current.emit('candidate', { candidate: event.candidate, room: appointmentIdRef.current });
      }
    };

    peerConnectionRef.current = pc;

    if (!hasCreatedOffer.current) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      hasCreatedOffer.current = true;
      console.log('Offer:', offer);
      socketRef.current.emit('offer', { sdp: offer, room: appointmentIdRef.current });
    }
  };

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setLocalStream(stream);
        setupPeerConnection(stream);
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    if (!socketRef.current) {
      const socket = io('http://localhost:8080');
      socketRef.current = socket;

      const appointmentId = new URLSearchParams(window.location.search).get('appointment');
      appointmentIdRef.current = appointmentId;
      console.log('Appointment ID:', appointmentId);

      if (appointmentId) {
        socket.emit('join-room', appointmentId);
      }

      socket.on('created', () => {
        console.log('Created room');
        setIsCaller(true);
        initializeMedia();
      });

      socket.on('joined', () => {
        console.log('Joined room');
        setIsCaller(false);
        initializeMedia();
      });

      socket.on('ready', () => {
        if (!isCaller) {
          peerConnectionRef.current.createAnswer().then(answer => {
            peerConnectionRef.current.setLocalDescription(answer);
            socket.emit('answer', { sdp: answer, room: appointmentIdRef.current });
          });
        }
      });

      socket.on('candidate', (candidate) => {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on('offer', (offer) => {
        peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        peerConnectionRef.current.createAnswer().then(answer => {
          peerConnectionRef.current.setLocalDescription(answer);
          socket.emit('answer', { sdp: answer, room: appointmentIdRef.current });
        });
      });

      socket.on('answer', (answer) => {
        peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      });
    }
  }, []);

  const handleReserve = () => {
    window.location.href = process.env.REACT_APP_USER_RESERVE_URL;
  };

  const handleAppointments = () => {
    window.location.href = process.env.REACT_APP_USER_APPOINTMENTS_URL;
  };

  const handleLogout = () => {
    window.location.href = process.env.REACT_APP_USER_LOGOUT_URL;
  };

  return (
    <div className="consultation-page">
      <Header onReserve={handleReserve} onAppointments={handleAppointments} onLogout={handleLogout} client={`user user`} />
      <ConsultationHeader specialty="Specialty" doctorName="Name Surname" />
      <ConsultationOptions localStream={localStream} remoteStream={remoteStream} setRemoteStream={setRemoteStream} />
      <Footer />
    </div>
  );
};

export default ConsultationPage;
