import { create } from 'zustand';

export interface VideoItem {
  id: string;
  url: string;
  title: string;
  author: string;
  likes: number;
}

interface VideoStore {
  items: VideoItem[];
  activeIndex: number;
  isLoading: boolean;
  setActiveIndex: (index: number) => void;
  loadMore: () => Promise<void>;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  items: [
    {
      id: '1',
      url: 'public/video-1.mp4',
      title: 'Nice view',
      author: '@author-1',
      likes: 12500,
    },
    {
      id: '2',
      url: 'public/video-2.mp4',
      title: 'Dog 1',
      author: '@author-2',
      likes: 8900,
    },
    {
      id: '3',
      url: 'public/video-3.mp4',
      title: 'Dog 2',
      author: '@author-3',
      likes: 15600,
    },
    {
      id: '4',
      url: 'public/video-4.mp4',
      title: 'Dog 3',
      author: '@author-4',
      likes: 9800,
    },
    {
      id: '5',
      url: 'public/video-5.mp4',
      title: 'Dog 4',
      author: '@author-5',
      likes: 21300,
    },
  ],
  activeIndex: 0,
  isLoading: false,
  setActiveIndex: (index) => set({ activeIndex: index }),
  loadMore: async () => {
    const { items, isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: `${items.length + i + 1}`,
      url: items[i % items.length].url,
      title: `Video ${items.length + i + 1}`,
      author: '@user',
      likes: Math.floor(Math.random() * 20000),
    }));

    set({ items: [...items, ...newItems], isLoading: false });
  },
}));
