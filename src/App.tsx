import { useEffect } from 'react';
import ChampionSelection from './components/ChampionSelection';
import RecommendedChampions from './components/RecommendedChampions';
import ChampionSearch from './components/ChampionSearch'; // Importa il componente ChampionSearch
import { Container, Typography } from '@mui/material';
import ChampionGrid from './components/ChampionGrid';
import { getLatestPatch } from './services/getLatestPatch';
import { getChampionsList } from './services/getChampionsList';
import { useStore } from './store';
import { Champion } from './models/Champion';

const App = () => {
  const setLatestPatch = useStore((state) => state.setLatestPatch);
  const setChampionsList = useStore((state) => state.setChampionsList);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const latestPatch: string = await getLatestPatch();
        // console.log("latestPatch", latestPatch);
        setLatestPatch(latestPatch);

        const championList: Champion[] = await getChampionsList(latestPatch);
        console.log("championList", championList);
        setChampionsList(championList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAndSetData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Seleziona i Campioni di League of Legends
      </Typography>
      <ChampionSelection />
      <RecommendedChampions />
      <ChampionSearch />
      <ChampionGrid />
    </Container>
  );
};

export default App;
