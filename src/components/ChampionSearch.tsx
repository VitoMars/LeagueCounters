import React, { useState } from 'react';
import { Grid, TextField, Typography, Divider, Box, Paper, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandRock as FighterIcon,
  faHatWizard as MageIcon,
  faMask as AssassinIcon,
  faCrosshairs as MarksmanIcon,
  faShieldAlt as TankIcon,
  faHandsHelping as SupportIcon
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import ChampionGrid from './ChampionGrid';
// import { useStore } from '../store';

const ChampionSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // const { addToAllyTeam, addToEnemyTeam, categories } = useStore(state => ({
  //   addToAllyTeam: state.addToAllyTeam,
  //   addToEnemyTeam: state.addToEnemyTeam,
  //   categories: state.categories,
  // }));

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const categoryIcons = [
    { name: 'Fighter', icon: <FontAwesomeIcon icon={FighterIcon} /> },
    { name: 'Mage', icon: <FontAwesomeIcon icon={MageIcon} /> },
    { name: 'Assassin', icon: <FontAwesomeIcon icon={AssassinIcon} /> },
    { name: 'Marksman', icon: <FontAwesomeIcon icon={MarksmanIcon} /> },
    { name: 'Tank', icon: <FontAwesomeIcon icon={TankIcon} /> },
    { name: 'Support', icon: <FontAwesomeIcon icon={SupportIcon} /> }
  ];

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Grid container spacing={4}>
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
          <Box display="flex" justifyContent="center" mb={2}>
            {categoryIcons.map(category => (
              <Tooltip key={category.name} title={category.name} placement="bottom">
                <IconButton
                  key={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  color={selectedCategory === category.name ? 'primary' : 'default'}
                >
                  {category.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box border={2} borderRadius={5} borderColor="#3f51b5" p={2}>
            <Typography variant="h6" gutterBottom align="center">
              PICKS FOR YOUR TEAM
            </Typography>
            <Divider />
            <ChampionGrid team="ally" searchTerm={searchTerm} category={selectedCategory} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box border={2} borderRadius={5} borderColor="#f50057" p={2}>
            <Typography variant="h6" gutterBottom align="center">
              PICKS FOR THE ENEMY TEAM
            </Typography>
            <Divider />
            <ChampionGrid team="enemy" searchTerm={searchTerm} category={selectedCategory} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChampionSearch;
