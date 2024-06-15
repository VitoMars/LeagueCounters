import React, { useState } from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../store';
import { Champion } from '../models/Champion';

interface ChampionGridProps {
  team: 'ally' | 'enemy';
  searchTerm: string;
  category: string;
}

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChampionGrid: React.FC<ChampionGridProps> = ({ team, searchTerm, category }) => {
  const latestPatch = useStore(state => state.latestPatch);
  const championsList = useStore(state => state.championsList);

  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const filteredChampions = championsList.filter((champion: Champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
    (category ? champion.tags.includes(category) : true)
  );

  const handleCardClick = (champion: Champion) => {
    setSelectedChampion(champion);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePick = () => {
    if (selectedChampion) {
      // Logica per fare il pick
      console.log(`Hai scelto di fare il pick di ${selectedChampion.name}`);
      setOpenModal(false);
    }
  };

  const handleBan = () => {
    if (selectedChampion) {
      // Logica per fare il ban
      console.log(`Hai scelto di fare il ban di ${selectedChampion.name}`);
      setOpenModal(false);
    }
  };

  return (
    <Grid container spacing={2}>
      {filteredChampions.map(champion => (
        <Grid key={champion.id} item xs={6} sm={4} md={3}>
          <Card
            onClick={() => handleCardClick(champion)}
            sx={{ height: '100%', cursor: 'pointer' }}
          >
            <CardActionArea sx={{ height: '100%' }}>
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
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
      >
        <DialogTitle>{selectedChampion?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Cosa vuoi fare con questo campione?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePick} color="primary" variant="contained">
            Pick
          </Button>
          <Button onClick={handleBan} color="error" variant="contained">
            Ban
          </Button>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'inherit',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </Grid>
  );
};

export default ChampionGrid;
