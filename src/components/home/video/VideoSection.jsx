import React, { useRef, useEffect, useState } from 'react';
import './video.scss';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1. The "Security Camera" (Observer) setup
    const options = {
      root: null, // Watch the viewport
      rootMargin: '0px',
      threshold: 0.4, // Trigger when 40% of the video is visible
    };

    const handlePlay = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Video is in view: Play it
          videoRef.current.play().catch(error => {
            // Autoplay policies might block this if not muted
            console.log("Autoplay prevented:", error);
          });
          setIsPlaying(true);
        } else {
          // Video left the view: Pause it
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handlePlay, options);

    // 2. Start watching
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // 3. Cleanup when component goes away
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="video-section-container">
        <h2 className="video-title">How we create our cakes</h2>

        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="bg-video"
            autoPlay
            muted       
            loop        
            playsInline 
            src="https://www.pexels.com/download/video/3325985/"
          >
            Your browser does not support the video tag.
          </video>

        </div>
      </section>
    </>
  );
};

export default VideoSection;
