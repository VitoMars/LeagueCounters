import React, { useEffect } from 'react';
import ChampionSearch from './components/ChampionSearch';
import { Container, Typography } from '@mui/material';
// import ChampionGrid from './components/ChampionGrid';
import { getLatestPatch } from './services/getLatestPatch';
import { getChampionsList } from './services/getChampionsList';
import { useStore } from './store';

const App: React.FC = () => {
  const setLatestPatch = useStore(state => state.setLatestPatch);
  const setChampionsList = useStore(state => state.setChampionsList);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const latestPatch = await getLatestPatch();
        setLatestPatch(latestPatch);

        const championList = await getChampionsList(latestPatch);
        console.log("championList", championList);
        setChampionsList(championList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAndSetData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom>
        League Counters
      </Typography>
      <ChampionSearch />

      {/* <Typography variant="h4" gutterBottom>
        Mio Team
      </Typography>
      <ChampionGrid team="ally" searchTerm='' />

      <Typography variant="h4" gutterBottom>
        Team Avversario
      </Typography>
      <ChampionGrid team="enemy" searchTerm='' /> */}
    </Container>
  );
};

export default App;
