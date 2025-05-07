import React, { useState, useRef } from "react";

const AudioRecorder = ({
  onRecordingComplete,
}: {
  onRecordingComplete: (blob: Blob) => void;
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioChunks = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    audioChunks.current = [];

    recorder.ondataavailable = (e) => audioChunks.current.push(e.data);

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
      onRecordingComplete(audioBlob);

      // Force metadata loading for duration display
      if (audioRef.current) {
        audioRef.current.src = audioURL;
        audioRef.current.load();
      }
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <button
        onClick={handleClick}
        className={`${
          isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold py-2 px-4 rounded-lg transition`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioURL && (
        <div>
          <p className="mt-2">Preview your recording:</p>
          <audio
            controls
            ref={audioRef}
            src={audioURL}
            preload="metadata"
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
