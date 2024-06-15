// src/components/ChampionGrid.tsx
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { getChampionsList } from '../services/getChampionsList';
import { Champion } from '../models/Champion';
import { useStore } from '../store';

const ChampionGrid: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);

  // const champions = useStore((state) => state.championsList);

  const latestPatch = useStore((state) => state.latestPatch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latestPatch) {
          const data = await getChampionsList(latestPatch);
          const championList: Champion[] = data; // Estrai solo i dati dei campioni

          console.log("championList", championList)

          setChampions(championList);
        }
      } catch (error) {
        console.error('Error fetching champion list:', error);
      }
    };

    fetchData();
  }, [latestPatch]);

  return (
    <Grid container spacing={2}>
      {champions.map(champion => (
        <Grid key={champion.id} item xs={6} sm={4} md={3}>
          <Card>
            <CardActionArea>
              {latestPatch && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${champion.id}.png`}
                  alt={champion.name}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {champion.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChampionGrid;
