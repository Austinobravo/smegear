"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createProgress, getProgress, updateProgress } from "@/lib/progressService";

type PlayerProps = {
  src: string;
  title: string;
  lessonId: string;
  previousLessonId?: string;
  userId: string;
};

export default function Player({
  src,
  title,
  lessonId,
  previousLessonId,
  userId,
}: PlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  // gating / completion
  const [showModal, setShowModal] = useState(false);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  // live % watched
  const [percent, setPercent] = useState(0);

  const timeKey = `time:${lessonId}`;
  const pctKey = `pct:${lessonId}`;

  const startCurrentProgress = useCallback(async () => {
    const res = await createProgress(userId, lessonId);
    setProgressId(res.data.id);
  }, [lessonId, userId]);

  const handlePlay = useCallback(async () => {
    if (started) return;
    setStarted(true);

    if (!previousLessonId) {
      await startCurrentProgress();
      return;
    }
    try {
      const { data } = await getProgress(userId, previousLessonId);
      if (data?.completed) {
        await startCurrentProgress();
      } else {
        setShowModal(true);
      }
    } catch {
      setShowModal(true);
    }
  }, [previousLessonId, startCurrentProgress, started, userId]);

  const handleEnded = useCallback(async () => {
    const v = ref.current;
    if (v) {
      localStorage.setItem(timeKey, String(Math.floor(v.duration || 0)));
      localStorage.setItem(pctKey, "100");
      setPercent(100);
    }
    if (progressId) {
      try {
        await updateProgress(progressId);
      } catch (e) {
        console.error(e);
      }
    }
  }, [progressId, timeKey, pctKey]);

  const proceedAnyway = useCallback(async () => {
    await startCurrentProgress();
    setShowModal(false);
  }, [startCurrentProgress]);

  const goToPreviousLesson = useCallback(() => {
    if (previousLessonId) window.location.href = `/lesson/${previousLessonId}`;
  }, [previousLessonId]);

  // wire events + resume + % calc
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const saved = Number(localStorage.getItem(timeKey) || 0);
    const savedPct = Number(localStorage.getItem(pctKey) || 0);
    if (savedPct > 0) setPercent(Math.min(100, Math.max(0, Math.floor(savedPct))));
    if (saved > 0) {
      const seek = () => {
        try {
          v.currentTime = saved;
        } catch {}
        v.removeEventListener("loadedmetadata", seek);
      };
      v.addEventListener("loadedmetadata", seek);
    }

    const saveTimeAndPct = () => {
      // persist current time
      localStorage.setItem(timeKey, String(Math.floor(v.currentTime || 0)));
      // compute % based on duration (handles seeking)
      const dur = v.duration || 0;
      const pct = dur > 0 ? Math.floor((v.currentTime / dur) * 100) : 0;
      setPercent(pct);
      localStorage.setItem(pctKey, String(pct));
    };

    v.addEventListener("timeupdate", saveTimeAndPct);
    v.addEventListener("seeked", saveTimeAndPct);
    v.addEventListener("play", handlePlay);
    v.addEventListener("ended", handleEnded);

    return () => {
      v.removeEventListener("timeupdate", saveTimeAndPct);
      v.removeEventListener("seeked", saveTimeAndPct);
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("ended", handleEnded);
    };
  }, [handleEnded, handlePlay, timeKey, pctKey]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-black">
        <video
          ref={ref}
          key={src}
          className="h-full w-full"
          controls
          playsInline
          preload="metadata"
          src={src}
          aria-label={title}
        />
      </div>

      {/* simple readout of seek-based % */}
      <div className="w-full max-w-3xl mt-2 text-sm text-muted-foreground">
        Watched: <span className="font-medium">{percent}%</span>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded shadow-md w-[90%] max-w-sm">
            <p className="mb-3 text-sm">You have a pending previous lesson.</p>
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={proceedAnyway}
              >
                Proceed Anyway
              </button>
              <button
                className="bg-gray-600 text-white px-3 py-1 rounded"
                onClick={goToPreviousLesson}
              >
                Continue Previous Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
