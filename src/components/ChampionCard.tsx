// src/components/ChampionCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Champion } from '../models/Champion'; // Assumi che esista un modello Champion

interface ChampionCardProps {
  champion: Champion;
  onClick?: () => void;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ champion, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {champion.name}
        </Typography>
        {/* Altre informazioni del campione da visualizzare */}
      </CardContent>
    </Card>
  );
};

export default ChampionCard;
