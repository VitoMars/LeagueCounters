import { Champion } from '../models/Champion';

interface TeamDisplayProps {
  team: Champion[];
  teamName: string;
}

const TeamDisplay = ({ team, teamName }: TeamDisplayProps) => {
  return (
    <div className="team-display">
      <h3>{teamName}</h3>
      <ul>
        {team.map(champion => (
          <li key={champion.id}>{champion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDisplay;