import { create } from 'zustand';
import { Champion } from '../models/Champion';

interface StoreState {
  latestPatch: string;
  championsList: Champion[];
  allyTeam: Champion[];
  enemyTeam: Champion[];
  recommendedChampions: Champion[];
  setLatestPatch: (patch: string) => void;
  setChampionsList: (champion: Champion[]) => void;
  addToAllyTeam: (champion: Champion) => void;
  addToEnemyTeam: (champion: Champion) => void;
  setRecommendedChampions: (champions: Champion[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  latestPatch: '',
  championsList: [],
  allyTeam: [],
  enemyTeam: [],
  recommendedChampions: [],
  setLatestPatch: (patch) => set({ latestPatch: patch }),
  setChampionsList: (list) => set({ championsList: list }),
  addToAllyTeam: (champion) => set((state) => ({
    allyTeam: [...state.allyTeam, champion],
  })),
  addToEnemyTeam: (champion) => set((state) => ({
    enemyTeam: [...state.enemyTeam, champion],
  })),
  setRecommendedChampions: (champions) => set({ recommendedChampions: champions }),
}));