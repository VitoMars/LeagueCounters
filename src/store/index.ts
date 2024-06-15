import { create } from 'zustand';
import { Champion } from '../models/Champion';
import { Category } from '../models/Category';

interface StoreState {
  latestPatch: string;
  championsList: Champion[];
  allyTeam: Champion[];
  enemyTeam: Champion[];
  categories: Category[];
  recommendedChampions: Champion[];
  setLatestPatch: (patch: string) => void;
  setChampionsList: (champion: Champion[]) => void;
  addToAllyTeam: (champion: Champion) => void;
  addToEnemyTeam: (champion: Champion) => void;
  setCategories: (categories: Category[]) => void;
  setRecommendedChampions: (champions: Champion[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  latestPatch: '',
  championsList: [],
  allyTeam: [],
  enemyTeam: [],
  categories: [],
  recommendedChampions: [],
  setLatestPatch: (latestPatch) => set({ latestPatch }),
  setChampionsList: (championsList) => set({ championsList }),
  addToAllyTeam: (champion) => set((state) => ({
    allyTeam: [...state.allyTeam, champion],
  })),
  addToEnemyTeam: (champion) => set((state) => ({
    enemyTeam: [...state.enemyTeam, champion],
  })),
  setCategories: (categories) => set({ categories }),
  setRecommendedChampions: (recommendedChampions) => set({ recommendedChampions }),
}));