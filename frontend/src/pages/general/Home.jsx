import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import API_BASE_URL from '../../config/api'

// Demo data describing the reels that will be shown on the home feed.

const styles = {
  wrapper: {
    height: '100vh',
    backgroundColor: '#000',
    position: 'relative',
  },
  reelContainer: {
    height: '100%',
    overflowY: 'auto',
    scrollSnapType: 'y mandatory',
    scrollSnapStop: 'always',
    paddingBottom: '132px',
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
    padding: '48px 24px 92px',
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
  bottomNav: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    background: '#020814',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '10px 14px calc(10px + env(safe-area-inset-bottom))',
    zIndex: 30,
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxWidth: '560px',
    margin: '0 auto',
    gap: '10px',
  },
  navIconButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    color: '#f8f8f8',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    padding: 0,
  },
  navAvatarButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.6)',
    padding: 0,
    background: 'transparent',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    color: '#111',
    background: '#ffd166',
    fontWeight: 700,
  },
  navLogoutButton: {
    minWidth: '86px',
    height: '36px',
    border: 'none',
    background: 'rgba(255, 79, 90, 0.95)',
    color: '#fff',
    borderRadius: '999px',
    padding: '0 12px',
    fontWeight: 700,
    letterSpacing: '0.02em',
    cursor: 'pointer',
  },
}

const Icon = ({ children }) => (
  <svg viewBox='0 0 24 24' width='26' height='26' fill='none' stroke='currentColor' strokeWidth='2.1' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    {children}
  </svg>
)

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = React.useState([]);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const videoRefs = React.useRef({});

  const storedUser = localStorage.getItem('userProfile');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = parsedUser?.fullName || parsedUser?.name || 'User';
  const userImage = parsedUser?.profilePicture || '';
  const userInitial = (userName?.trim()?.[0] || 'U').toUpperCase();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    axios.get(`${API_BASE_URL}/api/food`, {
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

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    const authRole = localStorage.getItem('authRole');
    const logoutUrl = authRole === 'foodpartner'
      ? `${API_BASE_URL}/api/auth/foodpartner/logout`
      : `${API_BASE_URL}/api/auth/user/logout`;

    try {
      await axios.get(logoutUrl, { withCredentials: true });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('authRole');
      localStorage.removeItem('token');
      localStorage.removeItem('userProfile');
      sessionStorage.removeItem('token');
      // Fallback cleanup for non-httpOnly cookies from older sessions.
      document.cookie = 'token=; Max-Age=0; path=/';
      document.cookie = 'token=; Max-Age=0; path=/; SameSite=Lax';
      setIsLoggingOut(false);
      navigate('/user/login');
    }
  };

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
                <Link
                  to={`/foodpartner/${item.foodpartner}`}
                  style={styles.button}
                  aria-label="Visit store"
                >
                  Visit store
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
      <nav style={styles.bottomNav} aria-label='User navigation'>
        <div style={styles.navContent}>
          <button type='button' style={styles.navIconButton} aria-label='Home' onClick={() => navigate('/home')}>
            <Icon>
              <path d='M3 10.5L12 3l9 7.5' />
              <path d='M5.5 9.5V21h13V9.5' />
            </Icon>
          </button>
          <button
            type='button'
            style={styles.navLogoutButton}
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label='Log out'
          >
            {isLoggingOut ? 'Logging out...' : 'Log out'}
          </button>
          <button type='button' style={styles.navIconButton} aria-label='Search'>
            <Icon>
              <circle cx='11' cy='11' r='6.5' />
              <path d='M20 20l-4-4' />
            </Icon>
          </button>
          <button type='button' style={styles.navIconButton} aria-label={userName}>
            <Icon>
              <circle cx='12' cy='8' r='3.2' />
              <path d='M5.5 20a6.5 6.5 0 0113 0' />
            </Icon>
          </button>
          <button type='button' style={styles.navAvatarButton} aria-label='Profile'>
            {userImage ? (
              <img src={userImage} alt='User profile' style={styles.avatarImage} />
            ) : (
              <div style={styles.avatarFallback} aria-hidden='true'>
                {userInitial}
              </div>
            )}
          </button>
        </div>
      </nav>
    </main>
  );
}

export default Home