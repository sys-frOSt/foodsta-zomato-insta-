import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../../config/api'

const ProfileFoodPartner = () => {
  const navigate = useNavigate();
  const profileAvatarUrl = 'https://images.unsplash.com/photo-1773394343278-21f63954867e?q=80&w=695&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const { id } = useParams();
  const [foodPartnerData, setFoodPartnerData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [hoveredVideo, setHoveredVideo] = React.useState(null);

  const getInitials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const getVideoUrl = (video) => {
    if (typeof video === 'string') return video;
    return video?.video || video?.url || '';
  };

  useEffect(() => {
    if (id) {
      // Fetch specific food partner data
      axios.get(`${API_BASE_URL}/api/foodpartner/${id}`, {
        withCredentials: true,
      })
        .then(response => {
          setFoodPartnerData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching food partner:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const styles = {
    container: {
      backgroundColor: '#0f1115',
      minHeight: '100vh',
      padding: '20px 16px 96px',
      color: '#fff',
    },
    pageWrap: {
      width: '100%',
      maxWidth: '920px',
      margin: '0 auto',
    },
    profileCard: {
      backgroundColor: '#1b1e27',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '18px',
      padding: '24px 18px',
      marginBottom: '18px',
    },
    profileHeader: {
      display: 'flex',
      gap: '18px',
      alignItems: 'center',
      marginBottom: '18px',
    },
    profileImage: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)',
      padding: '3px',
      flexShrink: 0,
    },
    profileImageInner: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: '#263238',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      fontWeight: 700,
      color: '#fff',
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    infoSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    titleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
    },
    profileTitle: {
      fontSize: '22px',
      margin: 0,
      lineHeight: 1.15,
    },
    badge: {
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.08em',
      backgroundColor: '#204a2f',
      border: '1px solid #2f7a46',
      borderRadius: '999px',
      padding: '4px 8px',
    },
    handle: {
      margin: 0,
      color: '#a0a7b6',
      fontSize: '14px',
    },
    address: {
      margin: 0,
      fontSize: '14px',
      color: '#d8deea',
      lineHeight: 1.4,
    },
    actionRow: {
      display: 'flex',
      gap: '10px',
      marginTop: '6px',
    },
    actionButtonPrimary: {
      border: 'none',
      borderRadius: '8px',
      padding: '8px 14px',
      backgroundColor: '#2c7ef8',
      color: '#fff',
      fontWeight: 600,
      fontSize: '13px',
    },
    actionButton: {
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: '8px',
      padding: '8px 14px',
      backgroundColor: 'transparent',
      color: '#fff',
      fontWeight: 600,
      fontSize: '13px',
    },
    statsContainer: {
      display: 'flex',
      gap: '14px',
      marginTop: '18px',
      paddingTop: '16px',
      borderTop: '1px solid rgba(255,255,255,0.12)',
    },
    statItem: {
      textAlign: 'center',
      flex: 1,
      backgroundColor: '#161922',
      borderRadius: '10px',
      padding: '12px 8px',
    },
    statLabel: {
      fontSize: '12px',
      color: '#9ea6b8',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    statValue: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#fff',
    },
    videosGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
    },
    videoItem: {
      aspectRatio: '1',
      backgroundColor: '#1a1f2d',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.12)',
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    videoItemHover: {
      transform: 'scale(1.05)',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      backgroundColor: '#11141d',
    },
    videoOverlay: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.22)',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.04em',
    },
    emptyPosts: {
      textAlign: 'center',
      color: '#96a0b5',
      border: '1px dashed rgba(255,255,255,0.16)',
      borderRadius: '10px',
      padding: '20px',
    },
    bottomNav: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      background: '#020814',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '10px 14px calc(10px + env(safe-area-inset-bottom))',
      zIndex: 30,
    },
    navContent: {
      width: '100%',
      maxWidth: '920px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
    },
    navButton: {
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.04)',
      color: '#fff',
      borderRadius: '999px',
      padding: '8px 14px',
      fontWeight: 600,
      cursor: 'pointer',
    },
    navHomeButton: {
      border: 'none',
      background: 'rgba(44, 126, 248, 0.95)',
      color: '#fff',
      borderRadius: '999px',
      padding: '8px 16px',
      fontWeight: 700,
      cursor: 'pointer',
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (!foodPartnerData) {
    return <div style={styles.container}>No food partner found</div>;
  }

  const videos = Array.isArray(foodPartnerData.videos) ? foodPartnerData.videos : [];
  const displayName = foodPartnerData.name || 'Food Partner';
  const profileHandle = `@${displayName.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <div style={styles.container}>
      <div style={styles.pageWrap}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.profileImage}>
              <div style={styles.profileImageInner}>
                <img src={profileAvatarUrl} alt={displayName} style={styles.avatarImage} />
              </div>
            </div>
            <div style={styles.infoSection}>
              <div style={styles.titleRow}>
                <h2 style={styles.profileTitle}>{displayName}</h2>
                <span style={styles.badge}>FOOD PARTNER</span>
              </div>
              <p style={styles.handle}>{profileHandle}</p>
              <p style={styles.address}>{foodPartnerData.address || 'Address not available'}</p>
              <div style={styles.actionRow}>
                <button type="button" style={styles.actionButtonPrimary}>Follow</button>
                <button type="button" style={styles.actionButton}>Message</button>
              </div>
            </div>
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>posts</div>
              <div style={styles.statValue}>{videos.length}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>total meals</div>
              <div style={styles.statValue}>{foodPartnerData.totalMeals || 0}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>rating</div>
              <div style={styles.statValue}>{foodPartnerData.rating || '0'}</div>
            </div>
          </div>
        </div>

        {videos.length === 0 ? (
          <div style={styles.emptyPosts}>No posts uploaded yet</div>
        ) : (
          <div style={styles.videosGrid}>
            {videos.map((video, index) => {
              const videoUrl = getVideoUrl(video);

              return (
                <div
                  key={video._id || index}
                  style={{
                    ...styles.videoItem,
                    ...(hoveredVideo === index ? styles.videoItemHover : {}),
                  }}
                  onMouseEnter={() => setHoveredVideo(index)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      style={styles.video}
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <div style={styles.videoOverlay}>NO VIDEO</div>
                  )}
                  {videoUrl && <div style={styles.videoOverlay}>View post</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <nav style={styles.bottomNav} aria-label='Profile navigation'>
        <div style={styles.navContent}>
          <button type='button' style={styles.navButton} onClick={() => navigate(-1)}>
            Back
          </button>
          <button type='button' style={styles.navHomeButton} onClick={() => navigate('/home')}>
            Home
          </button>
        </div>
      </nav>
    </div>
  );
}

export default ProfileFoodPartner