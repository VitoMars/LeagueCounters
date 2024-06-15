// src/components/ChampionSelection.tsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import ChampionCard from './ChampionCard'; // Importa il componente ChampionCard

import { useStore } from '../store';
import { Champion } from '../models/Champion'; // Assumi che esista un modello Champion

const ChampionSelection: React.FC = () => {
  const { addToAllyTeam, addToEnemyTeam, allyTeam, enemyTeam } = useStore(state => ({
    addToAllyTeam: state.addToAllyTeam,
    addToEnemyTeam: state.addToEnemyTeam,
    allyTeam: state.allyTeam,
    enemyTeam: state.enemyTeam,
  }));

  // Funzione per gestire il click su un campione
  const handleChampionClick = (champion: Champion, isEnemy: boolean) => {
    if (isEnemy) {
      addToEnemyTeam(champion);
    } else {
      addToAllyTeam(champion);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>
          Seleziona campioni per il tuo team
        </Typography>
        {/* Esempio di visualizzazione dei campioni disponibili */}
        <Grid container spacing={2}>
          {/* Sostituisci con la logica per ottenere e mostrare i campioni disponibili */}
          {allyTeam.map(champion => (
            <Grid key={champion.id} item xs={6} md={4}>
              <ChampionCard champion={champion} onClick={() => handleChampionClick(champion, false)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>
          Seleziona campioni per il team avversario
        </Typography>
        <Grid container spacing={2}>
          {/* Esempio di visualizzazione dei campioni disponibili */}
          {enemyTeam.map(champion => (
            <Grid key={champion.id} item xs={6} md={4}>
              <ChampionCard champion={champion} onClick={() => handleChampionClick(champion, true)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChampionSelection;
