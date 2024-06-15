import axios from 'axios';
import { Champion } from '../models/Champion';

export const getChampionsList = async (latestPatch: string) => {
  try {
    const champListUrl = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/champion.json`;
    const response = await axios.get(champListUrl);
    const championsList: Champion[] = Object.values(response.data.data)

    return championsList;
  } catch (error) {
    console.error('Error fetching champion list:', error);
    throw error;
  }
};
