import { create } from "zustand";

import { Post, SortOrder } from "../../entities/models";

interface PostsFilterState {
  posts: Post[];
  filteredPosts: Post[];
  search: string;
  sortOrder: SortOrder;
  applyFilters: () => void;
  setPosts: (posts: Post[]) => void;
  setSearch: (value: string) => void;
  setSortOrder: (value: SortOrder) => void;
}

const usePostsFilterStore = create<PostsFilterState>((set, get) => ({
  posts: [],
  filteredPosts: [],
  search: "",
  sortOrder: SortOrder.TitleAsc,

  applyFilters: () => {
    const { posts = [], search, sortOrder } = get();

    let result = [...posts];

    if (search.trim()) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      switch (sortOrder) {
        case SortOrder.TitleAsc:
          return a.title.localeCompare(b.title);
        case SortOrder.TitleDesc:
          return b.title.localeCompare(a.title);
        case SortOrder.IdAsc:
          return a.id - b.id;
        case SortOrder.IdDesc:
          return b.id - a.id;
        default:
          return 0;
      }
    });

    set({ filteredPosts: result });
  },

  setPosts: (posts) => {
    set({ posts });
    get().applyFilters();
  },

  setSearch: (value) => {
    set({ search: value });
    get().applyFilters();
  },

  setSortOrder: (value) => {
    set({ sortOrder: value });
    get().applyFilters();
  },
}));

export default usePostsFilterStore;
