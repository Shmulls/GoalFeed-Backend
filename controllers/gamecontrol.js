import User from "../models/User.js";
import Game from "../models/Games.js";
import UserGuess from "../models/UserGuess.js";

/* get all the active games */
export const getactivegame = async (req, res) => {
  try {
    const activeGames = await Game.find({ isActive: true });
    res.json(activeGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint to get the guessing history for a user
export const getactivegameiguess = async (req, res) => {
  try {
    // Find all user guesses for the authenticated user
    const userGuesses = await UserGuess.find({
      userId: req.user.userId,
    }).populate("gameId");

    // Filter user guesses based on active games
    const activeUserGuesses = userGuesses.filter(
      (guess) => guess.gameId && guess.gameId.isActive
    );
    res.json(activeUserGuesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Endpoint to make a guess for a game
export const makeguess = async (req, res) => {
  const { gameId, homeTeamScore, awayTeamScore } = req.body;
  try {
    // Check if the game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    // Check if the game has already ended
    if (game.homeTeamScore !== null || game.awayTeamScore !== null) {
      return res.status(400).json({ message: "Game has already ended" });
    }
    // Check if the user has already made a guess for this game
    const existingGuess = await UserGuess.findOne({
      userId: req.user.userId,
      gameId,
    });

    // If an existing guess is found, update it
    if (existingGuess) {
      existingGuess.homeTeamScore = homeTeamScore;
      existingGuess.awayTeamScore = awayTeamScore;
      await existingGuess.save();
      return res.status(200).json({ message: "Guess updated successfully" });
    }
    // Create a new user guess
    const userGuess = new UserGuess({
      userId: req.user.userId,
      gameId,
      homeTeamScore,
      awayTeamScore,
    });
    await userGuess.save();

    res.status(201).json({ message: "Guess created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//add game as meneger
export const addgame = (req, res) => {
  const { homeTeam, awayTeam, week } = req.body;

  const game = new Game({
    homeTeam,
    awayTeam,
    week,
  });

  game
    .save()
    .then(() => {
      res.json({ message: "Game added successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};

//to get all the game that done
export const getendedgame = async (req, res) => {
  try {
    // Find all user guesses for the authenticated user
    const userGuesses = await UserGuess.find({
      userId: req.user.userId,
    }).populate("gameId");

    // Filter the user guesses to include only ended games and calculate points
    const endedGames = userGuesses
      .filter((guess) => {
        return (
          guess.gameId.isActive === false && // Check if the game is not active (ended)
          guess.homeTeamScore !== null &&
          guess.awayTeamScore !== null // Check if the user provided a guess for home and away team scores
        );
      })
      .map((guess) => {
        const points = calculatePoints(guess);

        return {
          gameId: guess.gameId._id,
          homeTeam: guess.gameId.homeTeam,
          awayTeam: guess.gameId.awayTeam,
          endGameHomeTeamScore: guess.gameId.homeTeamScore,
          endGameAwayTeamScore: guess.gameId.awayTeamScore,
          userHomeTeamScore: guess.homeTeamScore,
          userAwayTeamScore: guess.awayTeamScore,
          points: points,
        };
      });

    res.json(endedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const calculatePoints = (guess) => {
  let points = 0;

  // Check if the user guessed the result correctly (3 points)
  if (
    guess.homeTeamScore === guess.gameId.homeTeamScore &&
    guess.awayTeamScore === guess.gameId.awayTeamScore
  ) {
    points = 3;
  }

  // Check if the user guessed the winning identity (1 point)
  else if (
    (guess.homeTeamScore > guess.awayTeamScore &&
      guess.gameId.homeTeamScore > guess.gameId.awayTeamScore) ||
    (guess.homeTeamScore < guess.awayTeamScore &&
      guess.gameId.homeTeamScore < guess.gameId.awayTeamScore) ||
    (guess.homeTeamScore === guess.awayTeamScore &&
      guess.gameId.homeTeamScore === guess.gameId.awayTeamScore)
  ) {
    points = 1;
  }

  return points;
};
