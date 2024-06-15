import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useStore } from '../store';
import { Champion } from '../models/Champion';

interface ChampionGridProps {
  team: 'ally' | 'enemy';
  searchTerm: string;
  category: string;
}

const ChampionGrid: React.FC<ChampionGridProps> = ({ team, searchTerm, category }) => {
  const latestPatch = useStore(state => state.latestPatch);
  const championsList = useStore(state => state.championsList);

  const filteredChampions = championsList.filter((champion: Champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
    (category ? champion.tags.includes(category) : true)
  );

  return (
    <Grid container spacing={2}>
      {filteredChampions.map(champion => (
        <Grid key={champion.id} item xs={6} sm={4} md={3}>
          <CardActionArea sx={{ height: '100%' }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              {latestPatch && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${champion.id}.png`}
                  alt={champion.name}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {champion.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {champion.tags.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChampionGrid;
