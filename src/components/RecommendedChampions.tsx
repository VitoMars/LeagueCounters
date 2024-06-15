// src/components/RecommendedChampions.tsx
import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ChampionCard from './ChampionCard'; // Importa il componente ChampionCard

import { useStore } from '../store';
import { Champion } from '../models/Champion'; // Assumi che esista un modello Champion

const RecommendedChampions: React.FC = () => {
  const { allyTeam, enemyTeam, recommendedChampions, setRecommendedChampions } = useStore(state => ({
    allyTeam: state.allyTeam,
    enemyTeam: state.enemyTeam,
    recommendedChampions: state.recommendedChampions,
    setRecommendedChampions: state.setRecommendedChampions,
  }));

  // Simula il calcolo dei campioni consigliati (da implementare)
  useEffect(() => {
    // Esempio di logica per calcolare i campioni consigliati
    const calculateRecommendedChampions = () => {
      // Logica per calcolare i campioni consigliati
      const recommendedChampions: Champion[] = []; // Sostituisci con la tua logica di raccomandazione
      setRecommendedChampions(recommendedChampions);
    };

    calculateRecommendedChampions();
  }, [allyTeam, enemyTeam]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Campioni Consigliati
        </Typography>
        <Grid container spacing={2}>
          {/* Esempio di visualizzazione dei campioni consigliati */}
          {recommendedChampions.map(champion => (
            <Grid key={champion.id} item xs={6} md={4}>
              <ChampionCard champion={champion} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RecommendedChampions;
