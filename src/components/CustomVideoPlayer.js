import React, { useRef, useState, useEffect } from "react";
import { FaExpand, FaPause, FaPlay } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const StrictVideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || {};

  // Track playback position and attempts to seek
  const lastValidTime = useRef(0);
  const playbackStartTime = useRef(null);
  const expectedPlaybackTime = useRef(0);

  // Calculate remaining access days
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const purchaseDate = new Date(course.purchaseDate + "T00:00:00Z");
  purchaseDate.setUTCHours(0, 0, 0, 0);
  const daysSincePurchase = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(21 - daysSincePurchase, 0);

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Throttle function for performance optimization
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // Update time and duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      if (!duration) setDuration(video.duration);
    };

    const handleBuffering = () => {
      setBuffering(true);
    };

    const handlePlaying = () => {
      setBuffering(false);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', () => {
      setDuration(video.duration);
    });
    video.addEventListener('waiting', handleBuffering);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('waiting', handleBuffering);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [duration]);

  // Strict playback enforcement
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset tracking when video loads
    const handleLoadedData = () => {
      lastValidTime.current = 0;
      expectedPlaybackTime.current = 0;
      playbackStartTime.current = null;
    };

    // Prevent seeking by resetting to last valid time
    const handleSeeking = () => {
      if (Math.abs(video.currentTime - lastValidTime.current) > 0.5) {
        video.currentTime = lastValidTime.current;
        showSeekWarning();
      }
    };

    // Enforce forward-only playback
    const handleTimeUpdate = throttle(() => {
      if (buffering) return; // Don't enforce during buffering

      const now = Date.now();

      // Initialize playback timing
      if (!playbackStartTime.current) {
        playbackStartTime.current = now;
        expectedPlaybackTime.current = 0;
        lastValidTime.current = 0;
        return;
      }

      // Calculate expected time based on realtime playback
      const elapsed = (now - playbackStartTime.current) / 1000;
      expectedPlaybackTime.current = Math.min(elapsed, video.duration);

      // If user tries to skip forward or backward
      const threshold = isPlaying ? 2 : 0.5; // More tolerant during playback
      if (Math.abs(video.currentTime - expectedPlaybackTime.current) > threshold) {
        video.currentTime = expectedPlaybackTime.current;
        showSeekWarning();
      }

      lastValidTime.current = video.currentTime;
    }, 500);

    // Show warning when seeking is attempted
    const showSeekWarning = () => {
      setShowWarning(true);
      const timer = setTimeout(() => setShowWarning(false), 2000);
      return () => clearTimeout(timer);
    };

    // Block right-click and other video element manipulations
    const handleContextMenu = (e) => {
      e.preventDefault();
      showSeekWarning();
    };

    // Fullscreen change handler
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [buffering, isPlaying]);

  // Strict keyboard controls (only allow play/pause)
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Block all seeking-related keys
      const seekKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'j', 'l'];
      if (seekKeys.includes(event.key)) {
        event.preventDefault();
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 2000);
        return;
      }

      // Only allow basic play/pause controls
      if (event.code === "Space" || event.key === "k") {
        event.preventDefault();
        togglePlayPause();
      }

      // Fullscreen controls
      if (event.key === "f") {
        event.preventDefault();
        handleFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initialize playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowThumbnail(false);
          lastValidTime.current = 0;
          playbackStartTime.current = Date.now();
        })
        .catch(console.error);
    }
  }, [course]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          playbackStartTime.current = Date.now() - (lastValidTime.current * 1000);
        })
        .catch(console.error);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullScreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) container.requestFullscreen();
      else if (container.mozRequestFullScreen) container.mozRequestFullScreen();
      else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
      else if (container.msRequestFullscreen) container.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  const handleVideoEnd = () => {
    const updatedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
    const updatedCourse = updatedCourses.find(c => c.id === course.id);

    if (updatedCourse) {
      if (remainingDays > 0) {
        updatedCourse.completed = updatedCourse.total;
      } else {
        updatedCourse.status = "Expired";
      }
      localStorage.setItem("purchasedCourses", JSON.stringify(updatedCourses));
    }

    alert("Course completed successfully!");
    navigate("/allcourses");
  };

  // Calculate progress percentage
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const remainingTime = duration - currentTime;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden"
    >
      {/* Thumbnail Image */}
      {showThumbnail && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src={course?.image || "https://via.placeholder.com/1280x720?text=Video+Thumbnail"}
            alt={course?.title || "Sample Video"}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlayPause}
          />
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-300"
            aria-label="Play video"
          >
            <div className="bg-black bg-opacity-50 text-white p-4 rounded-full">
              <FaPlay className="text-2xl" />
            </div>
          </button>
        </div>
      )}

      {/* Strictly Controlled Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        src={course?.video || "https://www.w3schools.com/html/mov_bbb.mp4"}
        muted
        autoPlay
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onClick={togglePlayPause}
        onPlay={() => {
          setShowThumbnail(false);
          setIsPlaying(true);
          playbackStartTime.current = Date.now();
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleVideoEnd}
      />

      {/* Buffering Indicator */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-16 left-0 right-0 h-1.5 bg-gray-700 bg-opacity-50">
        <div
          className="h-full bg-blue-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="absolute bottom-20 left-4 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
        {formatTime(remainingTime)} remaining
      </div>

      {/* Play/Pause overlay button */}
      {!showThumbnail && !buffering && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <div className="bg-gray-700 bg-opacity-50 text-white p-3 rounded-full">
            {isPlaying ? (
              <FaPause className="text-xl" />
            ) : (
              <FaPlay className="text-xl" />
            )}
          </div>
        </button>
      )}

      {/* Warning message when seeking attempted */}
      {showWarning && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md z-10">
          Skipping is not allowed - watch sequentially
        </div>
      )}

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent flex items-center justify-between px-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="text-white hover:text-blue-400 transition-colors duration-200"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <FaPause className="text-xl" />
          ) : (
            <FaPlay className="text-xl" />
          )}
        </button>

        {/* Time Display (mobile) */}
        <div className="text-white text-sm font-medium md:hidden">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={handleFullScreen}
          className="text-white hover:text-blue-400 transition-colors duration-200"
          aria-label="Fullscreen"
        >
          <FaExpand className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default StrictVideoPlayer;