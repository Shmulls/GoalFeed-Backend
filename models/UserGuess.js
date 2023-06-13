import mongoose from 'mongoose';

const userGuessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
  homeTeamScore: Number,
  awayTeamScore: Number,
});

const UserGuess = mongoose.model('UserGuess', userGuessSchema);
export default UserGuess;
