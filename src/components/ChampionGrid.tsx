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

  const championsList = useStore(state => {
    if (team === 'ally') {
      return state.allyChampionsList;
    } else if (team === 'enemy') {
      return state.enemyChampionsList;
    } else {
      return [];
    }
  });


  // Filtra i campioni in base al termine di ricerca e alla categoria selezionata
  const filteredChampions = championsList.filter((champion: Champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
    (category ? champion.tags.includes(category) : true)
  );

  return (
    <Grid container spacing={2}>
      {filteredChampions.map(champion => (
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
                <Typography variant="body2" color="textSecondary">
                  {champion.tags.join(', ')}
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
