'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Room,
  RoomEvent,
  Track,
  VideoPresets,
  DisconnectReason,
  ConnectionState,
} from 'livekit-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiMonitor,
  FiPhoneOff,
  FiShield,
  FiClock,
  FiAlertTriangle,
  FiRefreshCw,
  FiLock,
  FiCheckCircle,
  FiMessageSquare,
  FiInfo,
  FiMaximize2,
  FiMinimize2,
  FiGrid,
  FiColumns,
  FiLayers,
  FiSend,
  FiX,
  FiRefreshCcw,
  FiSettings,
  FiVolume2,
} from 'react-icons/fi';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.ybconnect.in/api/v1';

type RoomStatus =
  | 'verifying'
  | 'waiting_window'
  | 'ready_lobby'
  | 'connecting'
  | 'in_call'
  | 'duplicate_kicked'
  | 'quota_exhausted'
  | 'ended'
  | 'error';

type LayoutMode = 'pip' | 'horizontal_split' | 'vertical_split';

interface ParticipantProfile {
  _id: string;
  name: string;
  designation: string;
  companyName?: string;
  profileImage?: string;
}

interface SessionMetadata {
  requestId: string;
  topic: string;
  scheduledAt: string;
  scheduledEndAt: string;
  hardCutoffAt?: string;
  durationMinutes: number;
  amount: number;
  bothConnectedSeconds?: number;
  expertPresentSeconds?: number;
  studentPresentSeconds?: number;
  expert: ParticipantProfile;
  student: ParticipantProfile;
}

interface ChatMessage {
  id: string;
  senderIdentity: string;
  senderName: string;
  text: string;
  timestamp: string;
  isLocal: boolean;
}

const QUICK_CHAT_CHIPS = [
  'Can you hear me clearly?',
  'Sharing my screen now',
  'Give me 1 minute please',
  'Network reconnecting, one sec',
];

const REACTION_EMOJIS = ['✋', '👍', '👏', '🔥', '💡'];

// ============================================================================
// REUSABLE WEBVIDEO TRACK RENDERER (Handles Layout Swaps & Remounts Cleanly)
// ============================================================================
function LiveKitVideoView({
  track,
  mirror = false,
  contain = false,
}: {
  track: Track | null;
  mirror?: boolean;
  contain?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !track) return;
    track.attach(el);
    return () => {
      track.detach(el);
    };
  }, [track]);

  if (!track) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`w-full h-full ${contain ? 'object-contain bg-black' : 'object-cover'} ${
        mirror ? '-scale-x-100' : ''
      }`}
    />
  );
}

// ============================================================================
// MAIN MEET STUDIO COMPONENT
// ============================================================================
function MeetRoomContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id') || '';
  const ticket = searchParams.get('ticket') || '';

  // Room & Auth Lifecycle State
  const [status, setStatus] = useState<RoomStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sessionData, setSessionData] = useState<SessionMetadata | null>(null);
  const [myRole, setMyRole] = useState<'expert' | 'student'>('student');
  const [myName, setMyName] = useState<string>('Participant');
  const [unlocksAtIso, setUnlocksAtIso] = useState<string | null>(null);
  const [countdownText, setCountdownText] = useState<string>('');

  // Hardware & Track States
  const [isMicEnabled, setIsMicEnabled] = useState<boolean>(true);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(true);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [localCamTrack, setLocalCamTrack] = useState<Track | null>(null);
  const [remoteCamTrack, setRemoteCamTrack] = useState<Track | null>(null);
  const [screenShareTrack, setScreenShareTrack] = useState<Track | null>(null);
  const [screenShareOwner, setScreenShareOwner] = useState<'local' | 'remote' | null>(null);

  // Device Selector State (Cameras & Microphones)
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState<string>('');
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState<string>('');
  const [deviceModalOpen, setDeviceModalOpen] = useState<boolean>(false);

  // Remote Participant State
  const [remoteConnected, setRemoteConnected] = useState<boolean>(false);
  const [remoteMicMuted, setRemoteMicMuted] = useState<boolean>(false);
  const [remoteCamMuted, setRemoteCamMuted] = useState<boolean>(true);
  const [localSpeaking, setLocalSpeaking] = useState<boolean>(false);
  const [remoteSpeaking, setRemoteSpeaking] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [audioBlocked, setAudioBlocked] = useState<boolean>(false);

  // Layout & UI Modals State
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('horizontal_split');
  const [isMainSwapped, setIsMainSwapped] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState<boolean>(false);

  // Interactive DataChannel State (Synced with Mobile App)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draftMessage, setDraftMessage] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [handRaised, setHandRaised] = useState<boolean>(false);
  const [remoteHandRaised, setRemoteHandRaised] = useState<boolean>(false);
  const [floatingReaction, setFloatingReaction] = useState<{
    emoji: string;
    sender: string;
  } | null>(null);

  // Fair-Play & Session Timers
  const [remainingSeconds, setRemainingSeconds] = useState<number>(1800);
  const [togetherSeconds, setTogetherSeconds] = useState<number>(0);
  const [expertWaitSeconds, setExpertWaitSeconds] = useState<number>(0);

  const roomRef = useRef<Room | null>(null);
  const remoteAudioContainerRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatOpenRef = useRef<boolean>(false);

  useEffect(() => {
    chatOpenRef.current = chatOpen;
    if (chatOpen) {
      setUnreadCount(0);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [chatOpen]);

  // Default to PiP on narrow mobile screens and Side-by-Side on laptops/desktops
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setLayoutMode('pip');
      } else {
        setLayoutMode('horizontal_split');
      }
    }
  }, []);

  const myInfo = myRole === 'expert' ? sessionData?.expert : sessionData?.student;
  const otherPeer = myRole === 'expert' ? sessionData?.student : sessionData?.expert;

  const formatMMSS = (sec: number) => {
    const absSec = Math.max(0, sec);
    const m = Math.floor(absSec / 60);
    const s = absSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Report join, 15s heartbeat, leave, or quota_error to backend
  const reportWebEvent = useCallback(
    async (action: 'join' | 'heartbeat' | 'leave' | 'quota_error', errorReason?: string) => {
      if (!requestId || !ticket) return;
      try {
        const res = await fetch(`${API_BASE_URL}/livekit/web-session-event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestId, ticket, action, errorReason }),
        });
        const json = await res.json();
        if (json?.success && json.data) {
          if (typeof json.data.bothConnectedSeconds === 'number') {
            setTogetherSeconds((prev) => Math.max(prev, json.data.bothConnectedSeconds));
          }
          if (typeof json.data.expertPresentSeconds === 'number') {
            setExpertWaitSeconds((prev) => Math.max(prev, json.data.expertPresentSeconds));
          }
        }
      } catch (e) {}
    },
    [requestId, ticket]
  );

  // Verify signed ticket and load session metadata
  const verifyTicketAndFetchSession = useCallback(async () => {
    if (!requestId || !ticket) {
      setStatus('error');
      setErrorMessage(
        'Missing session ID or security ticket. Please tap "Copy Laptop Link" inside the YB Connect mobile app.'
      );
      return;
    }

    try {
      setStatus('verifying');
      const res = await fetch(`${API_BASE_URL}/livekit/web-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, ticket }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        if (res.status === 503 || json.code === 'LIVEKIT_CONFIG_MISSING') {
          await reportWebEvent('quota_error', json.error || 'service_unavailable');
          setStatus('quota_exhausted');
          return;
        }
        setStatus('error');
        setErrorMessage(json.error || 'Unable to verify meeting link.');
        return;
      }

      const payload = json.data;
      setSessionData(payload.session);
      setMyRole(payload.role);
      setMyName(payload.participantName || 'Participant');
      setTogetherSeconds(Number(payload.session?.bothConnectedSeconds) || 0);
      setExpertWaitSeconds(Number(payload.session?.expertPresentSeconds) || 0);

      if (payload.session?.scheduledEndAt) {
        const diff = Math.floor(
          (new Date(payload.session.scheduledEndAt).getTime() - Date.now()) / 1000
        );
        setRemainingSeconds(diff);
      }

      if (payload.locked) {
        setUnlocksAtIso(payload.unlocksAt);
        setStatus('waiting_window');
        return;
      }

      setStatus('ready_lobby');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        'Network error connecting to YB Connect servers. Please check your internet connection.'
      );
    }
  }, [requestId, ticket, reportWebEvent]);

  useEffect(() => {
    verifyTicketAndFetchSession();
  }, [verifyTicketAndFetchSession]);

  // Countdown in Waiting Lobby (>5 mins before start)
  useEffect(() => {
    if (status !== 'waiting_window' || !unlocksAtIso) return;
    const timer = setInterval(() => {
      const diffMs = new Date(unlocksAtIso).getTime() - Date.now();
      if (diffMs <= 0) {
        clearInterval(timer);
        verifyTicketAndFetchSession();
      } else {
        const mins = Math.floor(diffMs / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        setCountdownText(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [status, unlocksAtIso, verifyTicketAndFetchSession]);

  // Sync tracks & participant states from the LiveKit Room instance
  const syncRoomTracks = useCallback((room: Room) => {
    // 1. Local Camera & Screen Share
    const localCamPub = room.localParticipant.getTrackPublication(Track.Source.Camera);
    setLocalCamTrack(
      localCamPub?.track && !localCamPub.isMuted ? (localCamPub.track as Track) : null
    );
    setIsCamEnabled(room.localParticipant.isCameraEnabled);
    setIsMicEnabled(room.localParticipant.isMicrophoneEnabled);
    setIsScreenSharing(room.localParticipant.isScreenShareEnabled);

    const localScreenPub = room.localParticipant.getTrackPublication(Track.Source.ScreenShare);

    // 2. Remote Participant Camera, Mic & Screen Share
    const remotes = Array.from(room.remoteParticipants.values());
    if (remotes.length > 0) {
      const remoteP = remotes[0];
      setRemoteConnected(true);
      setRemoteMicMuted(!remoteP.isMicrophoneEnabled);

      const remoteCamPub = remoteP.getTrackPublication(Track.Source.Camera);
      const hasActiveRemoteVid = Boolean(remoteCamPub?.track && !remoteCamPub.isMuted);
      setRemoteCamMuted(!hasActiveRemoteVid);
      setRemoteCamTrack(hasActiveRemoteVid ? (remoteCamPub!.track as Track) : null);

      const remoteScreenPub = remoteP.getTrackPublication(Track.Source.ScreenShare);
      if (remoteScreenPub?.track && !remoteScreenPub.isMuted) {
        setScreenShareTrack(remoteScreenPub.track as Track);
        setScreenShareOwner('remote');
      } else if (localScreenPub?.track && !localScreenPub.isMuted) {
        setScreenShareTrack(localScreenPub.track as Track);
        setScreenShareOwner('local');
      } else {
        setScreenShareTrack(null);
        setScreenShareOwner(null);
      }
    } else {
      setRemoteConnected(false);
      setRemoteCamTrack(null);
      setRemoteCamMuted(true);
      setRemoteHandRaised(false);

      if (localScreenPub?.track && !localScreenPub.isMuted) {
        setScreenShareTrack(localScreenPub.track as Track);
        setScreenShareOwner('local');
      } else {
        setScreenShareTrack(null);
        setScreenShareOwner(null);
      }
    }
  }, []);

  // Enumerate hardware cameras & microphones for laptop/PC switching
  const loadMediaDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const vids = devices.filter((d) => d.kind === 'videoinput');
      const auds = devices.filter((d) => d.kind === 'audioinput');
      setVideoDevices(vids);
      setAudioDevices(auds);
      if (vids.length > 0 && !selectedVideoDeviceId) setSelectedVideoDeviceId(vids[0].deviceId);
      if (auds.length > 0 && !selectedAudioDeviceId) setSelectedAudioDeviceId(auds[0].deviceId);
    } catch (e) {}
  }, [selectedVideoDeviceId, selectedAudioDeviceId]);

  // Connect to LiveKit Room
  const startCall = async () => {
    try {
      setStatus('connecting');

      const res = await fetch(`${API_BASE_URL}/livekit/web-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, ticket }),
      });
      const json = await res.json();

      if (!res.ok || !json.success || !json.data?.token || !json.data?.wsUrl) {
        if (res.status === 503 || res.status === 429) {
          await reportWebEvent('quota_error', 'token_endpoint_capacity');
          setStatus('quota_exhausted');
          return;
        }
        setStatus('error');
        setErrorMessage(json.error || 'Could not start video session.');
        return;
      }

      const { token, wsUrl, session } = json.data;
      if (session) setSessionData(session);

      if (roomRef.current) {
        await roomRef.current.disconnect();
      }

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          resolution: VideoPresets.h720.resolution,
        },
      });
      roomRef.current = room;

      room.on(RoomEvent.ParticipantConnected, () => syncRoomTracks(room));
      room.on(RoomEvent.ParticipantDisconnected, () => syncRoomTracks(room));
      room.on(RoomEvent.LocalTrackPublished, () => syncRoomTracks(room));
      room.on(RoomEvent.LocalTrackUnpublished, () => syncRoomTracks(room));
      room.on(RoomEvent.TrackMuted, () => syncRoomTracks(room));
      room.on(RoomEvent.TrackUnmuted, () => syncRoomTracks(room));

      room.on(RoomEvent.TrackSubscribed, (track) => {
        syncRoomTracks(room);
        if (track.kind === Track.Kind.Audio && remoteAudioContainerRef.current) {
          const audioEl = track.attach();
          remoteAudioContainerRef.current.appendChild(audioEl);
        }
      });

      room.on(RoomEvent.TrackUnsubscribed, (track) => {
        track.detach().forEach((el) => el.remove());
        syncRoomTracks(room);
      });

      room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
        const myId = room.localParticipant.identity;
        setLocalSpeaking(speakers.some((s) => s.identity === myId));
        setRemoteSpeaking(speakers.some((s) => s.identity !== myId));
      });

      room.on(RoomEvent.ConnectionStateChanged, (state) => {
        setIsReconnecting(state === ConnectionState.Reconnecting);
      });

      room.on(RoomEvent.AudioPlaybackStatusChanged, () => {
        setAudioBlocked(!room.canPlaybackAudio);
      });

      // Sync Chat, Emoji Reactions, and Hand Raise with Mobile App
      room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant) => {
        try {
          const rawString = new TextDecoder().decode(payload);
          const parsed = JSON.parse(rawString);

          if (parsed.type === 'chat' && typeof parsed.text === 'string') {
            const incomingMsg: ChatMessage = {
              id: String(parsed.id || `${Date.now()}_${Math.random()}`),
              senderIdentity: participant?.identity || 'remote',
              senderName: String(
                parsed.senderName || otherPeer?.name || 'Participant'
              ).slice(0, 60),
              text: parsed.text.trim().slice(0, 500),
              timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              }),
              isLocal: false,
            };
            setMessages((prev) => [...prev.slice(-99), incomingMsg]);
            if (!chatOpenRef.current) {
              setUnreadCount((c) => c + 1);
            } else {
              setTimeout(
                () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }),
                100
              );
            }
          } else if (parsed.type === 'reaction') {
            setFloatingReaction({
              emoji: parsed.emoji,
              sender: parsed.senderName || otherPeer?.name?.split(' ')[0] || 'Peer',
            });
            setTimeout(() => setFloatingReaction(null), 3200);
          } else if (parsed.type === 'hand_raise') {
            setRemoteHandRaised(Boolean(parsed.raised));
          }
        } catch (e) {}
      });

      room.on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
        if (reason === DisconnectReason.DUPLICATE_IDENTITY) {
          setStatus('duplicate_kicked');
          return;
        }
        reportWebEvent('leave');
        setStatus('ended');
      });

      await room.connect(wsUrl, token);
      setStatus('in_call');
      await reportWebEvent('join');

      try {
        await room.localParticipant.enableCameraAndMicrophone();
      } catch (mediaErr) {
        // Allow user into the call even if their PC lacks a webcam or mic permission was partially denied
      }

      syncRoomTracks(room);
      loadMediaDevices();
    } catch (err: any) {
      const msg = String(err?.message || '').toLowerCase();
      if (
        msg.includes('quota') ||
        msg.includes('limit') ||
        msg.includes('capacity') ||
        msg.includes('402') ||
        msg.includes('429') ||
        msg.includes('503') ||
        msg.includes('billing')
      ) {
        await reportWebEvent('quota_error', msg);
        setStatus('quota_exhausted');
        return;
      }
      setStatus('error');
      setErrorMessage(
        err?.message ||
          'Could not connect to the video room. Please allow browser camera and microphone permissions.'
      );
    }
  };

  // 15s Backend Heartbeat & 1s Fair-Play Session Timers
  useEffect(() => {
    if (status !== 'in_call') return;

    const heartbeatInterval = setInterval(() => {
      reportWebEvent('heartbeat');
    }, 15000);

    const clockInterval = setInterval(() => {
      if (myRole === 'expert' || remoteConnected) {
        setExpertWaitSeconds((prev) => prev + 1);
      }
      if (remoteConnected) {
        setTogetherSeconds((prev) => prev + 1);
      }

      if (sessionData?.scheduledEndAt) {
        const diffSec = Math.floor(
          (new Date(sessionData.scheduledEndAt).getTime() - Date.now()) / 1000
        );
        setRemainingSeconds(diffSec);
      }

      if (sessionData?.hardCutoffAt) {
        if (Date.now() > new Date(sessionData.hardCutoffAt).getTime()) {
          roomRef.current?.disconnect();
          setStatus('ended');
        }
      }
    }, 1000);

    const handleBeforeUnload = () => {
      reportWebEvent('leave');
      roomRef.current?.disconnect();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(clockInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [status, reportWebEvent, remoteConnected, myRole, sessionData]);

  // Send DataChannel Packet (Chat, Reaction, Hand Raise)
  const sendDataPacket = useCallback(async (dataObj: any) => {
    const room = roomRef.current;
    if (!room?.localParticipant) return;
    try {
      const bytes = new TextEncoder().encode(JSON.stringify(dataObj));
      await room.localParticipant.publishData(bytes, { reliable: true });
    } catch (e) {}
  }, []);

  const handleSendChat = async (overrideText?: string) => {
    const textToSend = (overrideText ?? draftMessage).trim();
    if (!textToSend) return;

    const msgId = `${Date.now()}_${Math.random()}`;
    const newMsg: ChatMessage = {
      id: msgId,
      senderIdentity: roomRef.current?.localParticipant.identity || 'me',
      senderName: myInfo?.name || myName || 'You',
      text: textToSend.slice(0, 500),
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      isLocal: true,
    };

    setMessages((prev) => [...prev.slice(-99), newMsg]);
    if (!overrideText) setDraftMessage('');
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);

    await sendDataPacket({
      type: 'chat',
      id: msgId,
      senderName: myInfo?.name || myName || 'Participant',
      text: textToSend.slice(0, 500),
    });
  };

  const handleSendReaction = async (emoji: string) => {
    setFloatingReaction({ emoji, sender: 'You' });
    setTimeout(() => setFloatingReaction(null), 2800);
    await sendDataPacket({
      type: 'reaction',
      emoji,
      senderName: (myInfo?.name || myName).split(' ')[0],
    });
  };

  const handleToggleHandRaise = async () => {
    const nextState = !handRaised;
    setHandRaised(nextState);
    await sendDataPacket({
      type: 'hand_raise',
      raised: nextState,
      senderName: (myInfo?.name || myName).split(' ')[0],
    });
  };

  // Hardware Controls
  const toggleMic = async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !isMicEnabled;
    await room.localParticipant.setMicrophoneEnabled(next);
    setIsMicEnabled(next);
    syncRoomTracks(room);
  };

  const toggleCam = async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !isCamEnabled;
    await room.localParticipant.setCameraEnabled(next);
    setIsCamEnabled(next);
    syncRoomTracks(room);
  };

  const flipOrSwitchCamera = async () => {
    const room = roomRef.current;
    if (!room) return;
    try {
      if (videoDevices.length > 1) {
        const currentIdx = videoDevices.findIndex((d) => d.deviceId === selectedVideoDeviceId);
        const nextDevice = videoDevices[(currentIdx + 1) % videoDevices.length];
        await room.switchActiveDevice('videoinput', nextDevice.deviceId);
        setSelectedVideoDeviceId(nextDevice.deviceId);
      } else {
        const nextMode = facingMode === 'user' ? 'environment' : 'user';
        const camPub = room.localParticipant.getTrackPublication(Track.Source.Camera);
        if (camPub?.videoTrack) {
          await camPub.videoTrack.restartTrack({ facingMode: nextMode });
          setFacingMode(nextMode);
        }
      }
      syncRoomTracks(room);
    } catch (e) {}
  };

  const toggleScreenShare = async () => {
    const room = roomRef.current;
    if (!room) return;
    try {
      const next = !isScreenSharing;
      await room.localParticipant.setScreenShareEnabled(next, { audio: true });
      setIsScreenSharing(next);
      syncRoomTracks(room);
    } catch (e) {
      setIsScreenSharing(false);
    }
  };

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const cycleLayoutMode = () => {
    if (layoutMode === 'horizontal_split') setLayoutMode('pip');
    else if (layoutMode === 'pip') setLayoutMode('vertical_split');
    else setLayoutMode('horizontal_split');
  };

  const confirmLeaveCall = async () => {
    setLeaveConfirmOpen(false);
    await reportWebEvent('leave');
    roomRef.current?.disconnect();
    setStatus('ended');
  };

  const durationMins = sessionData?.durationMinutes || 30;
  const requiredTalkSec = Math.round(durationMins * 60 * 0.7);
  const requiredWaitSec = durationMins <= 10 ? 420 : 600;
  const isLowTime = remainingSeconds > 0 && remainingSeconds <= 120;
  const isOvertime = remainingSeconds <= 0;

  // Render an Individual Participant Tile (Local or Remote)
  const renderParticipantTile = (target: 'local' | 'remote', isOverlayPip = false) => {
    const isLocal = target === 'local';
    const track = isLocal ? localCamTrack : remoteCamTrack;
    const hasVideo = isLocal ? isCamEnabled && Boolean(track) : !remoteCamMuted && Boolean(track);
    const micEnabled = isLocal ? isMicEnabled : !remoteMicMuted;
    const isSpeaking = isLocal ? localSpeaking : remoteSpeaking;
    const isRaised = isLocal ? handRaised : remoteHandRaised;

    const personName = isLocal
      ? `${myInfo?.name || myName} (You)`
      : otherPeer?.name || 'Participant';
    const personRole = isLocal
      ? myRole === 'expert'
        ? 'Mentor'
        : 'Student'
      : myRole === 'expert'
      ? 'Student'
      : 'Mentor';
    const initials = (isLocal ? myInfo?.name || myName : otherPeer?.name || 'U')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className={`relative w-full h-full bg-[#303134] overflow-hidden flex items-center justify-center select-none transition-all ${
          isOverlayPip ? 'rounded-2xl shadow-2xl' : 'rounded-2xl'
        } ${
          isSpeaking
            ? 'ring-2 ring-[#8AB4F8] border-2 border-[#8AB4F8]'
            : 'border border-[#3C4043]'
        }`}
      >
        {hasVideo && track ? (
          <LiveKitVideoView
            track={track}
            mirror={isLocal && facingMode === 'user'}
            contain={false}
          />
        ) : isLocal || remoteConnected ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div
              className={`${
                isOverlayPip ? 'w-12 h-12 text-base' : 'w-20 h-20 md:w-24 md:h-24 text-2xl'
              } rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center shadow-lg border-2 border-white/15 mb-3`}
            >
              {initials}
            </div>
            {!isOverlayPip && (
              <>
                <p className="text-[#E8EAED] font-bold text-sm md:text-base">{personName}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 bg-[#3C4043] text-[#E8EAED] text-[11px] font-semibold px-3 py-1 rounded-full">
                  <FiVideoOff className="w-3 h-3 text-slate-300" /> Camera is off
                </span>
              </>
            )}
          </div>
        ) : (
          /* Waiting for Partner State */
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm">
            <div className="relative mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#8AB4F8] p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#202124] flex items-center justify-center text-2xl font-extrabold text-[#8AB4F8]">
                  {initials}
                </div>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#F29900] border-2 border-[#303134]" />
            </div>
            <h3 className="text-[#E8EAED] text-lg font-bold">{otherPeer?.name}</h3>
            <p className="text-[#9AA0A6] text-xs mb-4">{otherPeer?.designation || personRole}</p>

            {!isOverlayPip && (
              <div className="bg-[#202124] border border-[#3C4043] rounded-2xl p-4 w-full space-y-2">
                <div className="w-5 h-5 border-2 border-[#8AB4F8] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-[#E8EAED] text-xs font-bold">
                  Waiting for {otherPeer?.name?.split(' ')[0] || 'partner'} to join...
                </p>
                <p className="text-[#9AA0A6] text-[11px] leading-relaxed">
                  {myRole === 'expert'
                    ? `Solo Wait Timer: ${formatMMSS(expertWaitSeconds)} / ${formatMMSS(
                        requiredWaitSec
                      )} required for student no-show payout protection.`
                    : 'Your attendance timer is active and synced with YB Connect.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom-Left Participant Name & Mic/Hand Pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-[#202124]/85 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 max-w-[85%] border border-white/10">
          {isSpeaking && <span className="w-2 h-2 rounded-full bg-[#8AB4F8] animate-ping" />}
          <span className="text-white text-[11px] font-semibold truncate">{personName}</span>
          {!micEnabled && (
            <span className="w-4 h-4 rounded-full bg-[#EA4335] flex items-center justify-center">
              <FiMicOff className="w-2.5 h-2.5 text-white" />
            </span>
          )}
          {isRaised && <span className="text-xs ml-0.5">✋</span>}
        </div>

        {/* Swap Corner Icon on Floating PiP */}
        {isOverlayPip && (
          <div className="absolute top-2 right-2 bg-[#202124]/80 p-1.5 rounded-full text-[#E8EAED] border border-white/10">
            <FiRefreshCcw className="w-3 h-3" />
          </div>
        )}
      </div>
    );
  };

  const mainTarget: 'local' | 'remote' = isMainSwapped ? 'local' : 'remote';
  const pipTarget: 'local' | 'remote' = isMainSwapped ? 'remote' : 'local';

  return (
    <div className="h-[100dvh] w-screen overflow-hidden bg-[#202124] text-[#E8EAED] flex flex-col font-sans select-none">
      {/* Hidden Container for Remote WebRTC Audio Streams */}
      <div ref={remoteAudioContainerRef} className="hidden" />

      {/* ====================================================================
          1. GOOGLE MEET / ZOOM STYLE TOP BAR
      ==================================================================== */}
      <header className="h-14 px-3 md:px-5 bg-[#202124] border-b border-[#3C4043]/60 flex items-center justify-between shrink-0 z-20">
        <button
          onClick={() => status === 'in_call' && setInfoOpen(true)}
          className="flex items-center gap-2.5 text-left min-w-0 max-w-[55%] md:max-w-[60%] hover:bg-[#303134] px-2.5 py-1.5 rounded-xl transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#303134] border border-[#3C4043] flex items-center justify-center shrink-0">
            <FiLock className="w-3.5 h-3.5 text-[#8AB4F8]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs md:text-sm font-bold text-[#E8EAED] truncate">
                {sessionData?.topic || 'YB Connect 1:1 Video Studio'}
              </span>
              {status === 'in_call' && (
                <FiInfo className="w-3.5 h-3.5 text-[#9AA0A6] shrink-0" />
              )}
            </div>
            <p className="text-[10px] md:text-[11px] text-[#9AA0A6] font-medium truncate">
              {durationMins}m Session • Talked {formatMMSS(togetherSeconds)}/
              {formatMMSS(requiredTalkSec)} (70% Rule)
            </p>
          </div>
        </button>

        {/* Right Top Controls */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {status === 'in_call' && (
            <>
              {audioBlocked && (
                <button
                  onClick={() => {
                    roomRef.current?.startAudio();
                    setAudioBlocked(false);
                  }}
                  className="bg-[#FDD663] text-[#202124] text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse cursor-pointer"
                >
                  <FiVolume2 className="w-3.5 h-3.5" /> Tap to Unmute Audio
                </button>
              )}

              {/* Live Countdown Pill */}
              <button
                onClick={() => setInfoOpen(true)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 tabular-nums cursor-pointer ${
                  isOvertime
                    ? 'bg-[#EA4335] text-white'
                    : isLowTime
                    ? 'bg-[#F29900] text-[#202124]'
                    : 'bg-[#303134] text-[#E8EAED] border border-[#3C4043]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    remoteConnected ? 'bg-[#34A853] animate-pulse' : 'bg-[#F29900]'
                  }`}
                />
                {isOvertime
                  ? `+${formatMMSS(Math.abs(remainingSeconds))}`
                  : formatMMSS(remainingSeconds)}
              </button>

              {/* Layout Switcher */}
              <button
                onClick={cycleLayoutMode}
                title="Switch Layout (Side-by-Side / PiP / Split)"
                className="w-9 h-9 rounded-full bg-[#303134] hover:bg-[#3C4043] flex items-center justify-center text-[#E8EAED] transition cursor-pointer"
              >
                {layoutMode === 'horizontal_split' ? (
                  <FiColumns className="w-4 h-4" />
                ) : layoutMode === 'vertical_split' ? (
                  <FiGrid className="w-4 h-4" />
                ) : (
                  <FiLayers className="w-4 h-4" />
                )}
              </button>

              {/* Camera / Mic Hardware Settings */}
              <button
                onClick={() => {
                  loadMediaDevices();
                  setDeviceModalOpen(true);
                }}
                title="Camera & Microphone Settings"
                className="w-9 h-9 rounded-full bg-[#303134] hover:bg-[#3C4043] hidden sm:flex items-center justify-center text-[#E8EAED] transition cursor-pointer"
              >
                <FiSettings className="w-4 h-4" />
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
                className="w-9 h-9 rounded-full bg-[#303134] hover:bg-[#3C4043] hidden sm:flex items-center justify-center text-[#E8EAED] transition cursor-pointer"
              >
                {isFullscreen ? (
                  <FiMinimize2 className="w-4 h-4" />
                ) : (
                  <FiMaximize2 className="w-4 h-4" />
                )}
              </button>
            </>
          )}
        </div>
      </header>

      {/* ====================================================================
          2. MAIN WORKSPACE AREA (ALL STATES + RESPONSIVE VIDEO STAGE)
      ==================================================================== */}
      <main className="flex-1 flex overflow-hidden relative px-2.5 md:px-4 py-2 gap-3">
        {/* STATE A: VERIFYING OR CONNECTING */}
        {(status === 'verifying' || status === 'connecting') && (
          <div className="m-auto text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#8AB4F8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[#E8EAED] font-bold text-sm">
              {status === 'verifying'
                ? 'Verifying 1:1 cryptographic session ticket...'
                : 'Joining encrypted video studio...'}
            </p>
          </div>
        )}

        {/* STATE B: WAITING WINDOW (>5 MINS BEFORE SCHEDULED START) */}
        {status === 'waiting_window' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="m-auto max-w-md w-full bg-[#303134] border border-[#3C4043] rounded-3xl p-6 text-center space-y-5 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#8AB4F8]/15 border border-[#8AB4F8]/30 flex items-center justify-center mx-auto text-[#8AB4F8]">
              <FiClock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8AB4F8]">
                Waiting Lobby
              </span>
              <h2 className="text-xl font-extrabold mt-1">
                Room Unlocks in {countdownText || '...'}
              </h2>
              <p className="text-xs text-[#9AA0A6] mt-2 leading-relaxed">
                Keep this tab open! The video room unlocks automatically 5 minutes before your
                scheduled session with{' '}
                <strong className="text-white">{otherPeer?.name || 'your partner'}</strong>.
              </p>
            </div>
            <div className="bg-[#202124] border border-[#3C4043] rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#9AA0A6]">Joining As:</span>
                <span className="font-bold text-white">
                  {myName} ({myRole === 'expert' ? 'Mentor' : 'Student'})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9AA0A6]">Duration:</span>
                <span className="font-bold text-[#34A853]">{durationMins} Minutes</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATE C: READY TO JOIN LOBBY */}
        {status === 'ready_lobby' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="m-auto max-w-lg w-full bg-[#303134] border border-[#3C4043] rounded-3xl p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#3C4043] pb-4">
              <div>
                <span className="text-[11px] font-extrabold text-[#34A853] uppercase tracking-wider">
                  ● Room Unlocked & Ready
                </span>
                <h2 className="text-lg md:text-xl font-extrabold mt-0.5">
                  Join as {myName} ({myRole === 'expert' ? 'Mentor' : 'Student'})
                </h2>
              </div>
              <FiShield className="w-8 h-8 text-[#8AB4F8] shrink-0" />
            </div>

            <div className="bg-[#202124] border border-[#3C4043] rounded-2xl p-4 space-y-2 text-xs">
              <p className="font-bold text-white text-sm">
                1:1 Session with {otherPeer?.name} ({otherPeer?.designation})
              </p>
              <p className="text-[#9AA0A6]">Topic: {sessionData?.topic}</p>
              <p className="text-[#FDD663] text-[11px] pt-1 leading-relaxed">
                🔒 Strict 1:1 Security: Only 1 active device is permitted per account. Joining on
                this browser automatically disconnects any open session on your phone.
              </p>
            </div>

            <button
              onClick={startCall}
              className="w-full py-3.5 rounded-full bg-[#8AB4F8] hover:bg-[#aecbfa] text-[#202124] font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <FiVideo className="w-4 h-4" /> Join {durationMins}m Video Session Now
            </button>
          </motion.div>
        )}

        {/* STATE D: ACTIVE VIDEO CALL WORKSPACE */}
        {status === 'in_call' && (
          <>
            <div className="flex-1 h-full relative flex flex-col overflow-hidden">
              {/* CASE 1: SCREEN SHARE ACTIVE (Presentation Stage + Filmstrip) */}
              {screenShareTrack ? (
                <div className="w-full h-full flex flex-col lg:flex-row gap-2.5 overflow-hidden">
                  <div className="flex-[3] relative bg-[#131314] border border-[#3C4043] rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-[#303134]/90 px-3.5 py-2 flex items-center justify-between border-b border-[#3C4043]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8AB4F8]">
                        <FiMonitor className="w-4 h-4" />
                        <span>
                          {screenShareOwner === 'local'
                            ? 'You are presenting your screen'
                            : `${otherPeer?.name?.split(' ')[0]} is presenting`}
                        </span>
                      </div>
                      {isScreenSharing && (
                        <button
                          onClick={toggleScreenShare}
                          className="bg-[#EA4335] hover:bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-lg cursor-pointer"
                        >
                          Stop Presenting
                        </button>
                      )}
                    </div>
                    <div className="flex-1 min-h-0">
                      <LiveKitVideoView track={screenShareTrack} contain={true} />
                    </div>
                  </div>

                  <div className="flex-1 lg:max-w-[280px] flex flex-row lg:flex-col gap-2.5 h-32 lg:h-full shrink-0">
                    <div className="flex-1">{renderParticipantTile('remote', false)}</div>
                    <div className="flex-1">{renderParticipantTile('local', true)}</div>
                  </div>
                </div>
              ) : layoutMode === 'horizontal_split' ? (
                /* CASE 2: SIDE-BY-SIDE SPLIT (Responsive: stacked on portrait phone, side-by-side on tablet/laptop) */
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="w-full h-full min-h-0">
                    {renderParticipantTile('remote', false)}
                  </div>
                  <div className="w-full h-full min-h-0">
                    {renderParticipantTile('local', false)}
                  </div>
                </div>
              ) : layoutMode === 'vertical_split' ? (
                /* CASE 3: VERTICAL SPLIT (Top / Bottom) */
                <div className="w-full h-full grid grid-rows-2 gap-2.5">
                  <div className="w-full h-full min-h-0">
                    {renderParticipantTile('remote', false)}
                  </div>
                  <div className="w-full h-full min-h-0">
                    {renderParticipantTile('local', false)}
                  </div>
                </div>
              ) : (
                /* CASE 4: FLOATING PICTURE-IN-PICTURE (Tap PiP to Swap Main & PiP) */
                <div className="w-full h-full relative">
                  {renderParticipantTile(mainTarget, false)}
                  <button
                    onClick={() => setIsMainSwapped(!isMainSwapped)}
                    title="Click to swap main and corner video"
                    className="absolute bottom-3.5 right-3.5 w-32 h-44 sm:w-48 sm:h-32 md:w-60 md:h-36 z-20 cursor-pointer focus:outline-none transition-transform hover:scale-[1.02]"
                  >
                    {renderParticipantTile(pipTarget, true)}
                  </button>
                </div>
              )}

              {/* Reconnecting Banner */}
              {isReconnecting && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#FDD663] text-[#202124] px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-lg z-30">
                  <div className="w-3.5 h-3.5 border-2 border-[#202124] border-t-transparent rounded-full animate-spin" />
                  Reconnecting to network...
                </div>
              )}

              {/* Floating Emoji Reaction Toast */}
              <AnimatePresence>
                {floatingReaction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="absolute bottom-5 left-5 bg-[#202124]/95 border border-[#5F6368] px-4 py-2 rounded-full flex items-center gap-2.5 shadow-2xl z-30"
                  >
                    <span className="text-2xl">{floatingReaction.emoji}</span>
                    <span className="text-xs font-bold text-[#E8EAED]">
                      {floatingReaction.sender}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* REAL-TIME CHAT DRAWER (Side Panel on Desktop, Full Drawer on Mobile) */}
            <AnimatePresence>
              {chatOpen && (
                <motion.aside
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="fixed inset-x-0 bottom-0 top-14 lg:static lg:w-88 bg-[#202124] lg:bg-[#303134] border-t lg:border border-[#3C4043] lg:rounded-2xl flex flex-col z-40 shadow-2xl"
                >
                  <div className="px-4 py-3 border-b border-[#3C4043] flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#E8EAED]">In-Call Messages</h3>
                      <p className="text-[11px] text-[#9AA0A6]">
                        Synced live with YB Connect mobile app
                      </p>
                    </div>
                    <button
                      onClick={() => setChatOpen(false)}
                      className="w-8 h-8 rounded-full bg-[#3C4043]/60 hover:bg-[#3C4043] flex items-center justify-center cursor-pointer"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Reply Chips */}
                  <div className="px-3 py-2 border-b border-[#3C4043]/60 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                    {QUICK_CHAT_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleSendChat(chip)}
                        className="bg-[#202124] hover:bg-[#3C4043] text-[#8AB4F8] border border-[#3C4043] px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap cursor-pointer transition"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center text-[#9AA0A6] text-xs px-4">
                        <FiMessageSquare className="w-8 h-8 mb-2 opacity-50" />
                        <p>No messages yet. Send a quick note or link to your partner!</p>
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs ${
                            m.isLocal
                              ? 'ml-auto bg-[#8AB4F8] text-[#202124] rounded-br-xs font-semibold'
                              : 'mr-auto bg-[#202124] text-[#E8EAED] border border-[#3C4043] rounded-bl-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 mb-0.5 text-[10px] opacity-75">
                            <span className="font-bold">{m.isLocal ? 'You' : m.senderName}</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <p className="leading-relaxed break-words">{m.text}</p>
                        </div>
                      ))
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Box */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChat();
                    }}
                    className="p-3 border-t border-[#3C4043] flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={draftMessage}
                      onChange={(e) => setDraftMessage(e.target.value)}
                      placeholder="Send a message..."
                      className="flex-1 bg-[#202124] text-[#E8EAED] placeholder-[#9AA0A6] text-xs rounded-full px-4 py-2.5 border border-[#3C4043] focus:outline-none focus:border-[#8AB4F8]"
                    />
                    <button
                      type="submit"
                      disabled={!draftMessage.trim()}
                      className="w-9 h-9 rounded-full bg-[#8AB4F8] disabled:opacity-40 text-[#202124] flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <FiSend className="w-4 h-4" />
                    </button>
                  </form>
                </motion.aside>
              )}
            </AnimatePresence>
          </>
        )}

        {/* STATE E: DUPLICATE IDENTITY KICKED (ANTI-LINK-SHARING GUARD) */}
        {status === 'duplicate_kicked' && (
          <div className="m-auto max-w-md w-full bg-[#303134] border border-[#F29900]/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <FiAlertTriangle className="w-12 h-12 text-[#F29900] mx-auto" />
            <h2 className="text-lg font-extrabold">Connected on Another Device</h2>
            <p className="text-xs text-[#9AA0A6] leading-relaxed">
              Your account joined this session from another tab or mobile device. For strict 1:1
              mentorship security, only one active connection is allowed per participant.
            </p>
            <button
              onClick={startCall}
              className="w-full py-3 rounded-full bg-[#8AB4F8] text-[#202124] font-extrabold text-xs cursor-pointer"
            >
              Switch Call to This Screen
            </button>
          </div>
        )}

        {/* STATE F: LIVEKIT FREE PLAN / QUOTA EXHAUSTED FALLBACK */}
        {status === 'quota_exhausted' && (
          <div className="m-auto max-w-md w-full bg-[#303134] border border-[#8AB4F8]/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <FiShield className="w-12 h-12 text-[#8AB4F8] mx-auto" />
            <h2 className="text-lg font-extrabold">
              High Video Server Traffic — Your Booking is 100% Protected
            </h2>
            <p className="text-xs text-[#9AA0A6] leading-relaxed">
              Our media server capacity is temporarily full. We have automatically paused no-show
              penalties on this booking so neither the student nor the mentor loses money or
              ratings.
            </p>
            <button
              onClick={verifyTicketAndFetchSession}
              className="w-full py-3 rounded-full bg-[#8AB4F8] text-[#202124] font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiRefreshCw className="w-4 h-4" /> Retry Video Connection
            </button>
          </div>
        )}

        {/* STATE G: CALL ENDED */}
        {status === 'ended' && (
          <div className="m-auto max-w-md w-full bg-[#303134] border border-[#3C4043] rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <FiCheckCircle className="w-12 h-12 text-[#34A853] mx-auto" />
            <h2 className="text-lg font-extrabold">You Left the Video Studio</h2>
            <p className="text-xs text-[#9AA0A6] leading-relaxed">
              Your accumulated talk time ({formatMMSS(togetherSeconds)}) has been saved to your YB
              Connect account. If the session window is still active, you can rejoin below.
            </p>
            <button
              onClick={verifyTicketAndFetchSession}
              className="w-full py-3 rounded-full bg-[#8AB4F8] text-[#202124] font-extrabold text-xs cursor-pointer"
            >
              Rejoin Video Studio
            </button>
          </div>
        )}

        {/* STATE H: ERROR */}
        {status === 'error' && (
          <div className="m-auto max-w-md w-full bg-[#303134] border border-[#EA4335]/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <FiAlertTriangle className="w-12 h-12 text-[#EA4335] mx-auto" />
            <h2 className="text-lg font-extrabold">Unable to Join Meeting</h2>
            <p className="text-xs text-[#9AA0A6] leading-relaxed">{errorMessage}</p>
            <button
              onClick={verifyTicketAndFetchSession}
              className="w-full py-3 rounded-full bg-[#8AB4F8] text-[#202124] font-extrabold text-xs cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      {/* ====================================================================
          3. REACTION STRIP + GOOGLE MEET / ZOOM BOTTOM CONTROL DOCK
      ==================================================================== */}
      {status === 'in_call' && (
        <footer className="px-3 pb-3 pt-1 bg-[#202124] flex flex-col items-center gap-2 shrink-0 z-20">
          {/* Quick Emoji Reaction Bar + Raise Hand */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {REACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendReaction(emoji)}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#303134] hover:bg-[#3C4043] flex items-center justify-center text-sm md:text-base transition cursor-pointer"
              >
                {emoji}
              </button>
            ))}
            <button
              onClick={handleToggleHandRaise}
              className={`h-8 md:h-9 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                handRaised
                  ? 'bg-[#FDD663] text-[#202124] font-extrabold'
                  : 'bg-[#303134] hover:bg-[#3C4043] text-[#E8EAED]'
              }`}
            >
              <span>✋</span>
              <span>{handRaised ? 'Lower Hand' : 'Raise Hand'}</span>
            </button>
          </div>

          {/* Main Control Pill */}
          <div className="bg-[#303134] border border-[#3C4043] px-4 py-2 rounded-full flex items-center gap-2.5 md:gap-3.5 shadow-xl">
            {/* 1. Mic Toggle */}
            <button
              onClick={toggleMic}
              title={isMicEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition cursor-pointer ${
                isMicEnabled
                  ? 'bg-[#3C4043] hover:bg-[#4e5357] text-white'
                  : 'bg-[#EA4335] text-white'
              }`}
            >
              {isMicEnabled ? <FiMic className="w-5 h-5" /> : <FiMicOff className="w-5 h-5" />}
            </button>

            {/* 2. Camera Toggle */}
            <button
              onClick={toggleCam}
              title={isCamEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition cursor-pointer ${
                isCamEnabled
                  ? 'bg-[#3C4043] hover:bg-[#4e5357] text-white'
                  : 'bg-[#EA4335] text-white'
              }`}
            >
              {isCamEnabled ? <FiVideo className="w-5 h-5" /> : <FiVideoOff className="w-5 h-5" />}
            </button>

            {/* 3. Flip / Switch Camera */}
            <button
              onClick={flipOrSwitchCamera}
              title="Switch Camera"
              className="w-11 h-11 rounded-full bg-[#3C4043] hover:bg-[#4e5357] text-white flex items-center justify-center transition cursor-pointer"
            >
              <FiRefreshCcw className="w-4 h-4" />
            </button>

            {/* 4. Screen Share */}
            <button
              onClick={toggleScreenShare}
              title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
              className={`h-11 px-3.5 rounded-full flex items-center gap-2 text-xs font-bold transition cursor-pointer ${
                isScreenSharing
                  ? 'bg-[#8AB4F8] text-[#202124]'
                  : 'bg-[#3C4043] hover:bg-[#4e5357] text-white'
              }`}
            >
              <FiMonitor className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isScreenSharing ? 'Stop Share' : 'Share Screen'}
              </span>
            </button>

            {/* 5. In-Call Chat Drawer Button */}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              title="In-Call Chat"
              className={`relative w-11 h-11 rounded-full flex items-center justify-center transition cursor-pointer ${
                chatOpen
                  ? 'bg-[#8AB4F8] text-[#202124]'
                  : 'bg-[#3C4043] hover:bg-[#4e5357] text-white'
              }`}
            >
              <FiMessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EA4335] text-white text-[10px] font-black flex items-center justify-center border-2 border-[#303134]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* 6. Leave Call Button */}
            <button
              onClick={() => setLeaveConfirmOpen(true)}
              title="Leave Call"
              className="h-11 px-5 rounded-full bg-[#EA4335] hover:bg-red-600 text-white font-extrabold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <FiPhoneOff className="w-4 h-4" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
        </footer>
      )}

      {/* ====================================================================
          MODAL 1: SESSION & FAIR-PLAY ATTENDANCE STATUS (MATCHES MOBILE)
      ==================================================================== */}
      <AnimatePresence>
        {infoOpen && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg w-full bg-[#202124] border border-[#3C4043] rounded-3xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#3C4043] pb-3">
                <h3 className="text-base font-extrabold text-[#E8EAED]">
                  Session & Attendance Status
                </h3>
                <button
                  onClick={() => setInfoOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#303134] flex items-center justify-center cursor-pointer"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#303134] rounded-2xl p-4 space-y-1">
                <p className="text-[10px] font-extrabold text-[#9AA0A6] uppercase tracking-wider">
                  SESSION TOPIC
                </p>
                <p className="text-sm font-extrabold text-white">{sessionData?.topic}</p>
                <p className="text-xs text-[#9AA0A6]">
                  Booked Package: {durationMins} Minutes • ₹{sessionData?.amount}
                </p>
              </div>

              <div className="bg-[#303134] rounded-2xl p-4 space-y-1">
                <p className="text-[10px] font-extrabold text-[#9AA0A6] uppercase tracking-wider">
                  1. SIMULTANEOUS TALK TIME (70% COMPLETION RULE)
                </p>
                <p
                  className={`text-base font-extrabold ${
                    togetherSeconds >= requiredTalkSec ? 'text-[#34A853]' : 'text-[#8AB4F8]'
                  }`}
                >
                  {formatMMSS(togetherSeconds)} / {formatMMSS(requiredTalkSec)} required
                </p>
                <p className="text-xs text-[#9AA0A6] leading-relaxed">
                  {togetherSeconds >= requiredTalkSec
                    ? '✅ 70% talk-time threshold reached! Session is verified as completed.'
                    : 'Saved across reconnects. Both Mentor and Student must talk together for at least 70% of the booked duration.'}
                </p>
              </div>

              <div className="bg-[#303134] rounded-2xl p-4 space-y-1">
                <p className="text-[10px] font-extrabold text-[#9AA0A6] uppercase tracking-wider">
                  2. MENTOR WAIT PROTECTION (IF STUDENT IS ABSENT / LATE)
                </p>
                <p
                  className={`text-base font-extrabold ${
                    expertWaitSeconds >= requiredWaitSec ? 'text-[#34A853]' : 'text-[#FDD663]'
                  }`}
                >
                  {formatMMSS(expertWaitSeconds)} / {formatMMSS(requiredWaitSec)} waited
                </p>
                <p className="text-xs text-[#9AA0A6] leading-relaxed">
                  {expertWaitSeconds >= requiredWaitSec
                    ? '✅ Mentor wait requirement met! Even if the student never joins or leaves early, mentor payout is protected.'
                    : `If the student does not show up, the mentor must join on time and stay for at least ${formatMMSS(
                        requiredWaitSec
                      )} to claim a student no-show payout.`}
                </p>
              </div>

              <div className="bg-[#303134] rounded-2xl p-4 space-y-2">
                <p className="text-[10px] font-extrabold text-[#9AA0A6] uppercase tracking-wider">
                  STAGE LAYOUT MODE
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'horizontal_split', label: 'Side-by-Side' },
                      { id: 'pip', label: 'Floating PiP' },
                      { id: 'vertical_split', label: 'Vertical Split' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setLayoutMode(opt.id);
                        setInfoOpen(false);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        layoutMode === opt.id
                          ? 'bg-[#8AB4F8] text-[#202124] border-[#8AB4F8]'
                          : 'bg-[#202124] text-[#E8EAED] border-[#3C4043]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MODAL 2: CAMERA & MICROPHONE DEVICE SELECTOR
      ==================================================================== */}
      <AnimatePresence>
        {deviceModalOpen && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full bg-[#202124] border border-[#3C4043] rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#3C4043] pb-3">
                <h3 className="text-base font-extrabold">Audio & Video Settings</h3>
                <button
                  onClick={() => setDeviceModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#303134] flex items-center justify-center cursor-pointer"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#9AA0A6] font-bold mb-1.5">Camera</label>
                  <select
                    value={selectedVideoDeviceId}
                    onChange={async (e) => {
                      const id = e.target.value;
                      setSelectedVideoDeviceId(id);
                      await roomRef.current?.switchActiveDevice('videoinput', id);
                    }}
                    className="w-full bg-[#303134] border border-[#3C4043] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  >
                    {videoDevices.map((d, i) => (
                      <option key={d.deviceId || i} value={d.deviceId}>
                        {d.label || `Camera ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#9AA0A6] font-bold mb-1.5">Microphone</label>
                  <select
                    value={selectedAudioDeviceId}
                    onChange={async (e) => {
                      const id = e.target.value;
                      setSelectedAudioDeviceId(id);
                      await roomRef.current?.switchActiveDevice('audioinput', id);
                    }}
                    className="w-full bg-[#303134] border border-[#3C4043] rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  >
                    {audioDevices.map((d, i) => (
                      <option key={d.deviceId || i} value={d.deviceId}>
                        {d.label || `Microphone ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setDeviceModalOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#8AB4F8] text-[#202124] font-extrabold text-xs cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MODAL 3: LEAVE CONFIRMATION (PROTECTS MENTOR WAIT TIME)
      ==================================================================== */}
      <AnimatePresence>
        {leaveConfirmOpen && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-sm w-full bg-[#303134] border border-[#3C4043] rounded-3xl p-6 space-y-4 text-center shadow-2xl"
            >
              <h3 className="text-base font-extrabold text-white">Leave Video Call?</h3>
              <p className="text-xs text-[#9AA0A6] leading-relaxed">
                {myRole === 'expert' && !remoteConnected && expertWaitSeconds < requiredWaitSec
                  ? `The student has not joined yet. Stay until your Solo Wait Time reaches ${formatMMSS(
                      requiredWaitSec
                    )} (currently ${formatMMSS(
                      expertWaitSeconds
                    )}) to secure a student no-show payout.`
                  : 'You can rejoin while the session time window is active. Your accumulated talk time is saved.'}
              </p>
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setLeaveConfirmOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-[#3C4043] text-white font-bold text-xs cursor-pointer"
                >
                  Stay in Call
                </button>
                <button
                  onClick={confirmLeaveCall}
                  className="flex-1 py-2.5 rounded-full bg-[#EA4335] text-white font-extrabold text-xs cursor-pointer"
                >
                  Leave Call
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MeetPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[100dvh] w-screen bg-[#202124] text-[#E8EAED] flex items-center justify-center font-bold text-sm">
          Loading YB Connect 1:1 Studio...
        </div>
      }
    >
      <MeetRoomContent />
    </Suspense>
  );
}