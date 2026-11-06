"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { videoTour } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { Reveal } from "./Reveal";

export function VideoSection() {
  const { messages } = useI18n();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlay = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = () => {
      const video = videoRef.current;
      if (!video) return false;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return true;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          shouldPlay.current = false;
          videoRef.current?.pause();
          setPlaying(false);
          return;
        }
        setReady(true);
        if (reduced) return;
        shouldPlay.current = true;
        play();
      },
      { threshold: 0.45 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !shouldPlay.current) return;
    const video = videoRef.current;
    if (!video) return;
    const start = () => {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    if (video.readyState >= 2) start();
    else video.addEventListener("canplay", start, { once: true });
    return () => video.removeEventListener("canplay", start);
  }, [ready]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) {
      shouldPlay.current = true;
      setReady(true);
      return;
    }
    if (video.paused) {
      shouldPlay.current = true;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      shouldPlay.current = false;
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="bathroom-tour-title">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            {messages.video.eyebrow}
          </p>
          <h2 id="bathroom-tour-title" className="mt-3 font-display text-3xl font-medium text-balance text-navy md:text-4xl">
            {messages.video.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-muted">{messages.video.body}</p>
        </Reveal>
        <div ref={frameRef} className="mx-auto w-full max-w-[280px]">
          <div className="relative aspect-[464/832] overflow-hidden border border-navy/15 bg-paper">
            {ready ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={videoTour.poster}
                muted
                playsInline
                loop
                preload="metadata"
                aria-label={messages.video.title}
              >
                <source src={videoTour.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={videoTour.poster}
                alt={messages.video.posterAlt}
                fill
                sizes="280px"
                className="object-cover"
              />
            )}
            <button
              type="button"
              onClick={togglePlayback}
              className="absolute right-3 bottom-3 inline-flex h-11 items-center gap-2 bg-white/95 px-3 text-sm font-medium text-navy"
            >
              {playing ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
              {playing ? messages.video.pause : messages.video.play}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
