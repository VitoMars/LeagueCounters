import axios from 'axios';
import { Champion } from '../models/Champion';

// const API_KEY = 'RGAPI-83c723f1-c85c-4ab2-9b21-cb98df5a01bc';
// const BASE_URL = 'https://euw1.api.riotgames.com/lol';
// const ChampROT = "/platform/v3/champion-rotations"
// const ChampList = "https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion.json"

export const getChampionsList = async (latestPatch: string) => {
  try {
    const champListUrl = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/champion.json`;
    const response = await axios.get(champListUrl);
    // const championsList = response.data

    const championsList: Champion[] = Object.values(response.data.data)

    return championsList;
  } catch (error) {
    console.error('Error fetching champion list:', error);
    throw error;
  }
};
