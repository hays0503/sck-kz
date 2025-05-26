'use client';

import Hls, { ManifestParsedData } from 'hls.js';
import React, { useEffect, useRef, memo } from 'react';
import { CSSProperties } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import Head from 'next/head';

interface VideoSliderProps {
  hlsSrc: string;
  poster?: string;
  onVideoEnd?: () => void;
  storageKey?: string;
  isActive: boolean;
}

function VideoSlider({
  hlsSrc,
  poster,
  onVideoEnd,
  storageKey,
  isActive,
}: VideoSliderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(hlsSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (a, b:ManifestParsedData) => {
        // debugger;
        video.muted = true;
        video.playsInline = true;
        const totalduration = b?.levels?.[0]?.details?.totalduration??0;
        if (isActive) {
          const savedTimeStr = storageKey ? sessionStorage.getItem(storageKey) : null;
          const savedTime = savedTimeStr ? parseFloat(savedTimeStr) : 0;
          if (savedTime > 0 && savedTime < totalduration) {
            video.currentTime = savedTime;
          }
          video.play().catch(console.warn);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSrc;
      video.muted = true;
      video.playsInline = true;

      video.addEventListener('loadedmetadata', () => {
        if (isActive) {
          const savedTimeStr = storageKey ? sessionStorage.getItem(storageKey) : null;
          const savedTime = savedTimeStr ? parseFloat(savedTimeStr) : 0;
          if (savedTime > 0 && savedTime < video.duration) {
            video.currentTime = savedTime;
          }
          video.play().catch(console.warn);
        }
      });
    }

    const handleEnded = () => {
      if (onVideoEnd) onVideoEnd();
      // video.currentTime = 0;
      // video.play().catch(console.warn);
    };

    const handleTimeUpdate = () => {
      if (storageKey) {
        const currentTime = video.currentTime.toString()
        if(currentTime === '0') return
        sessionStorage.setItem(storageKey,currentTime);
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (!isActive) {
      video.pause();
      // if (storageKey) {
        // sessionStorage.setItem(storageKey, video.currentTime.toString());
      // }
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [hlsSrc, onVideoEnd, storageKey, isActive]);

  return (
    <div style={styles.videoContainer}>
      <Head>
        <link
          rel="preload"
          href={hlsSrc}
          as="fetch"
          crossOrigin="anonymous"
        />
    </Head>
      <video
        ref={videoRef}
        style={styles.video}
        poster={poster}
        preload="metadata"
        muted
        playsInline
      />
    </div>
  );
}

export default memo(VideoSlider);

const styles: Record<string, CSSProperties> = {
  videoContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
  },
};