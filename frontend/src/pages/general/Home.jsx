import React from 'react'

// Demo data describing the reels that will be shown on the home feed.
const reels = [
  {
    id: 'fp-1',
    src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    description: 'Discover local cafés offering curated meal plans and exclusive morning bundles tailored to your routine.',
    storeUrl: '#',
  },
  {
    id: 'fp-2',
    src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    description: 'Order from community kitchens that prepare seasonal dishes with same-day delivery and zero-plastic packaging.',
    storeUrl: '#',
  },
  {
    id: 'fp-3',
    src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    description: 'Support independent grocers featuring farm-to-table produce, pantry staples, and chef-led tasting flights.',
    storeUrl: '#',
  },
]

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
  return (
    <main style={styles.wrapper}>
      <div style={styles.reelContainer}>
        {reels.map((reel) => (
          <section key={reel.id} style={styles.reelSlide}>
            <video
              style={styles.video}
              src={reel.src}
              autoPlay
              loop
              muted
              playsInline
            />
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                <p style={styles.description}>{reel.description}</p>
                <a
                  href={reel.storeUrl}
                  style={styles.button}
                  target="_blank"
                  rel="noopener noreferrer"
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
  )
}

export default Home