'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Room,
  RoomEvent,
  Track,
  VideoPresets,
  DisconnectReason,
  RemoteParticipant,
  RemoteTrackPublication,
} from 'livekit-client';
import { motion } from 'framer-motion';
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
} from 'react-icons/fi';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ybconnect.in/api/v1';

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

function MeetRoomContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id') || '';
  const ticket = searchParams.get('ticket') || '';

  const [status, setStatus] = useState<RoomStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sessionData, setSessionData] = useState<any>(null);
  const [myRole, setMyRole] = useState<'expert' | 'student'>('student');
  const [myName, setMyName] = useState<string>('');
  const [unlocksAtIso, setUnlocksAtIso] = useState<string | null>(null);
  const [countdownText, setCountdownText] = useState<string>('');

  const [isMicEnabled, setIsMicEnabled] = useState<boolean>(true);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(true);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [remoteConnected, setRemoteConnected] = useState<boolean>(false);
  const [remoteName, setRemoteName] = useState<string>('Waiting for participant...');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const roomRef = useRef<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteAudioContainerRef = useRef<HTMLDivElement | null>(null);
  const credentialsRef = useRef<{ token: string; wsUrl: string } | null>(null);

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
        if (json.success && json.data?.bothConnectedSeconds !== undefined) {
          setElapsedSeconds(json.data.bothConnectedSeconds);
        }
      } catch (e) {}
    },
    [requestId, ticket]
  );

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
      setElapsedSeconds(payload.session?.bothConnectedSeconds || 0);

      if (payload.locked) {
        setUnlocksAtIso(payload.unlocksAt);
        setStatus('waiting_window');
        return;
      }

      credentialsRef.current = {
        token: payload.token,
        wsUrl: payload.wsUrl,
      };
      setStatus('ready_lobby');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network error connecting to YB Connect servers. Please check your internet.');
    }
  }, [requestId, ticket, reportWebEvent]);

  useEffect(() => {
    verifyTicketAndFetchSession();
  }, [verifyTicketAndFetchSession]);

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

  const attachLocalPreview = useCallback(() => {
    const room = roomRef.current;
    if (!room || !localVideoRef.current) return;
    const camPub = room.localParticipant.getTrackPublication(Track.Source.Camera);
    if (camPub?.track) {
      camPub.track.attach(localVideoRef.current);
    }
  }, []);

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

      const { token, wsUrl } = json.data;

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          resolution: VideoPresets.h720.resolution,
        },
      });
      roomRef.current = room;

      const syncRemoteParticipants = () => {
        const remotes = Array.from(room.remoteParticipants.values());
        if (remotes.length > 0) {
          setRemoteConnected(true);
          setRemoteName(remotes[0].name || remotes[0].identity || 'Connected');
        } else {
          setRemoteConnected(false);
          setRemoteName('Waiting for other participant...');
        }
      };

      room.on(RoomEvent.ParticipantConnected, () => {
        syncRemoteParticipants();
      });

      room.on(RoomEvent.ParticipantDisconnected, () => {
        syncRemoteParticipants();
      });

      room.on(
        RoomEvent.TrackSubscribed,
        (track, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
          syncRemoteParticipants();
          if (track.kind === Track.Kind.Video && remoteVideoRef.current) {
            track.attach(remoteVideoRef.current);
          } else if (track.kind === Track.Kind.Audio && remoteAudioContainerRef.current) {
            const audioEl = track.attach();
            remoteAudioContainerRef.current.appendChild(audioEl);
          }
        }
      );

      room.on(RoomEvent.TrackUnsubscribed, (track) => {
        track.detach().forEach((el) => el.remove());
      });

      room.on(RoomEvent.LocalTrackPublished, () => {
        attachLocalPreview();
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
      syncRemoteParticipants();
      await reportWebEvent('join');

      await room.localParticipant.enableCameraAndMicrophone();
      setIsCamEnabled(true);
      setIsMicEnabled(true);
      setTimeout(attachLocalPreview, 300);
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
          'Could not connect to camera/microphone or media server. Please allow browser camera/mic permissions.'
      );
    }
  };

  useEffect(() => {
    if (status !== 'in_call') return;

    const heartbeatInterval = setInterval(() => {
      reportWebEvent('heartbeat');
    }, 15000);

    const localClockInterval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
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
      clearInterval(localClockInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [status, reportWebEvent, sessionData]);

  const toggleMic = async () => {
    if (!roomRef.current) return;
    const next = !isMicEnabled;
    await roomRef.current.localParticipant.setMicrophoneEnabled(next);
    setIsMicEnabled(next);
  };

  const toggleCam = async () => {
    if (!roomRef.current) return;
    const next = !isCamEnabled;
    await roomRef.current.localParticipant.setCameraEnabled(next);
    setIsCamEnabled(next);
    if (next) setTimeout(attachLocalPreview, 200);
  };

  const toggleScreenShare = async () => {
    if (!roomRef.current) return;
    try {
      const next = !isScreenSharing;
      await roomRef.current.localParticipant.setScreenShareEnabled(next);
      setIsScreenSharing(next);
    } catch (e) {
      setIsScreenSharing(false);
    }
  };

  const leaveCall = async () => {
    await reportWebEvent('leave');
    roomRef.current?.disconnect();
    setStatus('ended');
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const partnerPerson =
    myRole === 'expert' ? sessionData?.student : sessionData?.expert;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <header className="h-16 px-6 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg shadow-lg shadow-blue-600/30">
            YB
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              YB Connect 1:1 Studio
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <FiLock className="w-3 h-3" /> Encrypted 1:1 Lock
              </span>
            </h1>
            <p className="text-xs text-slate-400 truncate max-w-md">
              {sessionData?.topic || 'Verified Mentorship Video Session'}
            </p>
          </div>
        </div>

        {status === 'in_call' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  remoteConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <FiClock className="text-blue-400" />
              <span>
                Overlap: {formatTimer(elapsedSeconds)} / {sessionData?.durationMinutes || 30}:00m
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        {(status === 'verifying' || status === 'connecting') && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-300 font-semibold">
              {status === 'verifying'
                ? 'Verifying 1:1 cryptographic session ticket...'
                : 'Connecting to encrypted video room...'}
            </p>
          </div>
        )}

        {status === 'waiting_window' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-5 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
              <FiClock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Waiting Lobby
              </span>
              <h2 className="text-xl font-extrabold mt-1">
                Room Unlocks in {countdownText || '...'}
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Keep this laptop tab open! The video room automatically unlocks 5 minutes before
                your scheduled time with{' '}
                <strong className="text-white">{partnerPerson?.name || 'your partner'}</strong>.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Your Role:</span>
                <span className="font-bold text-white uppercase">{myRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="font-bold text-emerald-400">
                  {sessionData?.durationMinutes || 30} Minutes
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'ready_lobby' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  ● Room Unlocked & Ready
                </span>
                <h2 className="text-xl font-extrabold mt-0.5">
                  Join as {myName} ({myRole === 'expert' ? 'Mentor' : 'Student'})
                </h2>
              </div>
              <FiShield className="w-8 h-8 text-blue-400" />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs text-slate-300">
              <p className="font-bold text-white">
                Session with: {partnerPerson?.name} ({partnerPerson?.designation})
              </p>
              <p className="text-slate-400">Topic: {sessionData?.topic}</p>
              <p className="text-amber-400/90 text-[11px] pt-1">
                🔒 Strict 1:1 Policy: Only 1 active device is permitted per user. Joining here will
                automatically disconnect any open call on your mobile phone.
              </p>
            </div>

            <button
              onClick={startCall}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-extrabold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiVideo className="w-4 h-4" /> Join {sessionData?.durationMinutes || 30}m Video
              Session Now
            </button>
          </motion.div>
        )}

        {status === 'in_call' && (
          <div className="w-full max-w-6xl h-[calc(100vh-8.5rem)] flex flex-col gap-4">
            <div className="relative flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className={`w-full h-full object-cover ${
                  remoteConnected ? 'block' : 'hidden'
                }`}
              />

              <div ref={remoteAudioContainerRef} className="hidden" />

              {!remoteConnected && (
                <div className="text-center space-y-3 p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-2xl font-black text-blue-400">
                    {partnerPerson?.name?.[0] || 'U'}
                  </div>
                  <h3 className="text-lg font-bold">
                    Waiting for {partnerPerson?.name || 'other participant'} to join...
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your attendance timer is active and being recorded by YB Connect. Stay in the
                    room so your session attendance is verified.
                  </p>
                </div>
              )}

              <div className="absolute top-4 left-4 bg-slate-950/75 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    remoteConnected ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                {remoteConnected ? partnerPerson?.name || remoteName : 'Waiting for partner...'}
              </div>

              <div className="absolute bottom-4 right-4 w-48 md:w-64 aspect-video bg-slate-950 border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover mirror"
                />
                <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-bold">
                  You ({myName}) {!isCamEnabled && '• Cam Off'}
                </div>
              </div>
            </div>

            <div className="h-16 bg-slate-900 border border-slate-800 rounded-2xl px-6 flex items-center justify-center gap-4">
              <button
                onClick={toggleMic}
                className={`p-3.5 rounded-xl font-bold transition cursor-pointer ${
                  isMicEnabled
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-red-500/20 border border-red-500/40 text-red-400'
                }`}
                title={isMicEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicEnabled ? <FiMic className="w-5 h-5" /> : <FiMicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleCam}
                className={`p-3.5 rounded-xl font-bold transition cursor-pointer ${
                  isCamEnabled
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-red-500/20 border border-red-500/40 text-red-400'
                }`}
                title={isCamEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isCamEnabled ? (
                  <FiVideo className="w-5 h-5" />
                ) : (
                  <FiVideoOff className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={toggleScreenShare}
                className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                  isScreenSharing
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <FiMonitor className="w-4 h-4" />
                {isScreenSharing ? 'Stop Share' : 'Share Screen'}
              </button>

              <button
                onClick={leaveCall}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer ml-4"
              >
                <FiPhoneOff className="w-4 h-4" /> Leave
              </button>
            </div>
          </div>
        )}

        {status === 'duplicate_kicked' && (
          <div className="max-w-md w-full bg-slate-900 border border-amber-500/40 rounded-2xl p-6 text-center space-y-4">
            <FiAlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
            <h2 className="text-lg font-extrabold">Switched to Another Device</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your account joined this session from another tab or device. For strict 1:1 security,
              only one active connection is allowed per participant.
            </p>
            <button
              onClick={startCall}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs cursor-pointer"
            >
              Use This Laptop Instead
            </button>
          </div>
        )}

        {status === 'quota_exhausted' && (
          <div className="max-w-md w-full bg-slate-900 border border-blue-500/40 rounded-2xl p-6 text-center space-y-4">
            <FiShield className="w-12 h-12 text-blue-400 mx-auto" />
            <h2 className="text-lg font-extrabold">
              High Video Server Traffic — Your Booking is 100% Protected
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our media server capacity is temporarily full. We have automatically paused no-show
              penalties on this booking so neither the student nor the mentor loses money or
              ratings.
            </p>
            <button
              onClick={verifyTicketAndFetchSession}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiRefreshCw className="w-4 h-4" /> Retry Video Connection
            </button>
          </div>
        )}

        {status === 'ended' && (
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <FiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-lg font-extrabold">You Left the Video Room</h2>
            <p className="text-xs text-slate-400">
              Your attendance time has been synced to your YB Connect account. If the session is
              still active, you can rejoin below.
            </p>
            <button
              onClick={verifyTicketAndFetchSession}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs cursor-pointer"
            >
              Rejoin Room
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-6 text-center space-y-4">
            <FiAlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
            <h2 className="text-lg font-extrabold">Unable to Join Session</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{errorMessage}</p>
            <button
              onClick={verifyTicketAndFetchSession}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export file default function MeetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          Loading YB Connect 1:1 Studio...
        </div>
      }
    >
      <MeetRoomContent />
    </Suspense>
  );
}