import { useCallback, useEffect, useRef } from 'react';
import { useVideoStore } from '../store/videoStore';
import { VideoPlayer } from './VideoPlayer';
import styles from './Feed.module.css';

export const Feed = () => {
  const { items, activeIndex, setActiveIndex, loadMore } = useVideoStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = window.setTimeout(() => {
      const newIndex = Math.round(container.scrollTop / window.innerHeight);

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }

      if (newIndex >= items.length - 3) {
        loadMore();
      }
    }, 100);
  }, [activeIndex, setActiveIndex, items.length, loadMore]);

  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const shouldPreload = (index: number) => {
    return Math.abs(index - activeIndex) <= 2;
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onScroll={handleScroll}
    >
      {items.map((item, index) => {
        const shouldRender = Math.abs(index - activeIndex) <= 3;

        if (!shouldRender) {
          return <div key={item.id} className={styles.placeholder} />;
        }

        return (
          <VideoPlayer
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            shouldPreload={shouldPreload(index)}
          />
        );
      })}
    </div>
  );
};
