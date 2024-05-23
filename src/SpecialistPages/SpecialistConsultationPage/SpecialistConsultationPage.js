import Header from "./Header/Header";
import ConsultationHeader from "./ConsultationHeader/ConsultationHeader";
import ConsultationOptions from "./ConsultationOptions/ConsultationOptions";
import Footer from "./Footer/Footer";
import { useState, useEffect, useRef } from 'react';
// socket.io reference 
import io from 'socket.io-client';

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

const SpecialistConsultationPage = () => {
  // State for local and remote streams
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const peerConnectionRef = useRef(null); // Reference to peer connection
  const socketRef = useRef(null); // Reference to socket connection
  const appointmentIdRef = useRef(null); // Reference to appointmentId

  // Function to create and set up the peer connection
  const setupPeerConnection = async (stream) => {
    const pc = new RTCPeerConnection(servers);

    // Add event listener for when remote track is received
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
      });
    };

    // Add local stream tracks to the connection
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    // Add event listener for ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
        // Send candidate to signaling server
        socketRef.current.emit('candidate', { candidate: event.candidate, room: appointmentIdRef.current });
      }
    };

    peerConnectionRef.current = pc;
  };

  useEffect(() => {
    // Function to initialize media devices (camera and microphone)
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setLocalStream(stream); // Set local stream state
        setupPeerConnection(stream); // Set up the peer connection
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    // Set up socket connection once
    if (!socketRef.current) {
      const socket = io('http://localhost:8080');
      socketRef.current = socket;

      // Get appointment ID from URL parameters using react router
      const appointmentId = new URLSearchParams(window.location.search).get('appointmentId');
      appointmentIdRef.current = appointmentId; // Store appointmentId in ref
      console.log('Appointment ID:', appointmentId);

      // Send appointment ID to the server
      if (appointmentId) {
        socket.emit('join-room', appointmentId);
      }

      socket.on('created', () => {
        console.log('Created room');
        initializeMedia();
      });

      socket.on('joined', () => {
        console.log('Joined room');
        initializeMedia();
      });

      socket.on('ready', () => {
        peerConnectionRef.current.createOffer().then(offer => {
          peerConnectionRef.current.setLocalDescription(offer);
          socket.emit('offer', { sdp: offer, room: appointmentIdRef.current });
        });
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
  }, []); // Empty dependency array to run only once

  return (
    <div className="consultation-page">
      <Header />
      <ConsultationHeader specialty="Speciality" doctorName="Name Surname" />
      <ConsultationOptions localStream={localStream} remoteStream={remoteStream} setRemoteStream={setRemoteStream} />
      <Footer />
    </div>
  );
}

export default SpecialistConsultationPage;
