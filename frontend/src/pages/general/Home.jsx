import React, { useEffect } from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'

// Demo data describing the reels that will be shown on the home feed.

const styles = {
  wrapper: {
    height: '100vh',
    backgroundColor: '#000',
  },
  reelContainer: {
    height: '100%',
    overflowY: 'auto',
    scrollSnapType: 'y mandatory',
    scrollSnapStop: 'always',
  },
  reelSlide: {
    position: 'relative',
    height: '100vh',
    scrollSnapAlign: 'start',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '48px 24px 32px',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  overlayContent: {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  description: {
    color: '#fff',
    fontSize: '1.1rem',
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button: {
    alignSelf: 'flex-start',
    padding: '12px 20px',
    borderRadius: '999px',
    backgroundColor: '#ff4f5a',
    color: '#fff',
    fontWeight: 600,
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    transition: 'transform 150ms ease, opacity 150ms ease',
  },
}

const Home = () => {
  const [videos, setVideos] = React.useState([]);
  const videoRefs = React.useRef({});

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    axios.get('http://localhost:3000/api/food', {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(response => {
        setVideos(response.data.foodItems);
      })
      .catch(error => {
        console.error('Error fetching food items:', error);
      });
  }, []);

  // Intersection Observer to play/pause videos based on visibility
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const video = videoRefs.current[entry.target.id];
        if (video) {
          if (entry.isIntersecting) {
            video.play().catch(err => console.log('Play error:', err));
          } else {
            video.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Video must be 50% visible
    });

    Object.keys(videoRefs.current).forEach((key) => {
      const videoElement = videoRefs.current[key];
      if (videoElement) {
        observer.observe(videoElement);
      }
    });

    return () => {
      Object.keys(videoRefs.current).forEach((key) => {
        const videoElement = videoRefs.current[key];
        if (videoElement) {
          observer.unobserve(videoElement);
        }
      });
    };
  }, [videos]);

  return (
    <main style={styles.wrapper}>
      <div style={styles.reelContainer}>
        {videos.map((item) => (
          <section key={item._id} style={styles.reelSlide}>
            <video
              id={`video-${item._id}`}
              ref={(el) => {
                if (el) videoRefs.current[`video-${item._id}`] = el;
              }}
              style={styles.video}
              src={item.video}
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                <p style={styles.description}>{item.description}</p>
                <a
                  href={`/foodpartner/${item.foodpartner}`}
                  style={styles.button}
                  aria-label="Visit store"
                >
                  Visit store
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Home