import { create } from 'zustand';

const useStore = create((set) => ({
  bookmarkedJobs: [],
  toggleBookmark: (job) =>
    set((state) => {
      const isBookmarked = state.bookmarkedJobs.some((bJob) => bJob.id === job.id);
      return {
        bookmarkedJobs: isBookmarked
          ? state.bookmarkedJobs.filter((bJob) => bJob.id !== job.id)
          : [...state.bookmarkedJobs, job],
      };
    }),
}));

export default useStore;
