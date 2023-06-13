import mongoose from 'mongoose';

// Define the game schema
const gameSchema = new mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  week: Number,
  homeTeamScore: {
    type: Number,
    default: null,
  },
  awayTeamScore: {
    type: Number,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
const Game = mongoose.model('Game', gameSchema);

export default Game;
