import axios from "axios";

export const getLatestPatch = async () => {
  try {
    const latestPatchURL = "https://ddragon.leagueoflegends.com/api/versions.json"
    const response = await axios.get(latestPatchURL);
    const latestPatch = response.data[0];

    return latestPatch;
  } catch (error) {
    console.error('Error getLatestPatch:', error);
    throw error;
  }
};