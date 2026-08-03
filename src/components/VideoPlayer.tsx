import { memo } from 'react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import styles from './VideoPlayer.module.css';
import type { VideoItem } from '../store/videoStore';

interface VideoPlayerProps {
  item: VideoItem;
  isActive: boolean;
  shouldPreload: boolean;
}

export const VideoPlayer = memo(({ item, isActive, shouldPreload }: VideoPlayerProps) => {
  const { videoRef, isBuffering, progress } = useVideoPlayer({
    src: item.url,
    isActive,
  });

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        className={styles.video}
        src={item.url}
        loop
        playsInline
        preload={shouldPreload ? 'auto' : 'metadata'}
        muted={false}
      />

      {isBuffering && (
        <div className={styles.buffering}>Загрузка...</div>
      )}

      <div className={styles.overlay}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.author}>{item.author}</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <span>♥</span>
          <span className={styles.actionText}>{(item.likes / 1000).toFixed(1)}K</span>
        </button>
        <button className={styles.actionButton}>
          <span>💬</span>
          <span className={styles.actionText}>125</span>
        </button>
        <button className={styles.actionButton}>
          <span>↗</span>
          <span className={styles.actionText}>Поделиться</span>
        </button>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}, (prev, next) => prev.isActive === next.isActive && prev.item.id === next.item.id);

VideoPlayer.displayName = 'VideoPlayer';
