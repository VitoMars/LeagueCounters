// src/components/ChampionSearch.tsx
import React, { useState } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';
import ChampionCard from './ChampionCard'; // Assicurati di avere il componente ChampionCard importato correttamente

import { useStore } from '../store';
import { Champion } from '../models/Champion'; // Assumi che esista un modello Champion

const ChampionSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Champion[]>([]);

  const { addToAllyTeam, addToEnemyTeam, championsList } = useStore(state => ({
    addToAllyTeam: state.addToAllyTeam,
    addToEnemyTeam: state.addToEnemyTeam,
    championsList: state.championsList, // Ottieni la lista di campioni dallo store
  }));

  // Funzione per gestire la ricerca dei campioni
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().trim();
    setSearchTerm(value);

    // Filtra i campioni dalla lista dello store
    const filteredChampions = championsList.filter((champion: Champion) =>
      champion.name.toLowerCase().includes(value)
    );

    setSearchResults(filteredChampions);
  };

  // Funzione per aggiungere un campione al team (alleato o nemico)
  const handleAddToTeam = (champion: Champion, isEnemy: boolean) => {
    if (isEnemy) {
      addToEnemyTeam(champion);
    } else {
      addToAllyTeam(champion);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Ricerca e Selezione dei Campioni
        </Typography>
        <TextField
          fullWidth
          label="Cerca Campione"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Mostra i risultati della ricerca */}
          {searchResults.map(champion => (
            <Grid key={champion.id} item xs={6} sm={4} md={3}>
              <ChampionCard champion={champion} onClick={() => handleAddToTeam(champion, false)} />
              <Button variant="contained" color="secondary" onClick={() => handleAddToTeam(champion, true)}>
                Aggiungi al Team Avversario
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChampionSearch;
