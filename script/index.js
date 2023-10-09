const game = {
  choice: ["Rock", "Paper", "Scissors", "Spock", "Lizard"],
  
  results: {
    paper: {
      rock: "covers",
      spock: "refutes",
      lizard: "is eaten by",
      scissors: "is cut by",
    },
    rock: {
      scissors: "crushes",
      lizard: "crushes",
      paper: "is covered by",
      spock: "is vaporized by",
    },
    scissors: {
      paper: "cuts",
      lizard: "decapitates",
      rock: "is crushed by",
      spock: "is smashed by",
    },
    spock: {
      scissors: "smashes",
      rock: "vaporizes",
      paper: "is disproved by",
      lizard: "is poisoned by",
    },
    lizard: {
      spock: "poisons",
      paper: "eats",
      rock: "is crushed by",
      scissors: "is decapitated by",
    },
  },

  gameNumber: 1,
  userChoice: "none",
  botChoice: "none",
  botScore: 0,
  userScore: 0,
  score: [],

  init: () => {
    game.togglePlayBtn();
    console.table(game.score);

  },

  togglePlayBtn: () => {
    const startGame = document.getElementById("play");
    startGame.addEventListener("click", () => {
      startGame.style.display = "none";
      game.displayUserChoices();
    });
  },

  displayUserChoices: () => {
    const btnsUser = document.querySelectorAll(".button--user");
    btnsUser.forEach((btn) => {
      btn.classList.remove("hidden");
      btn.addEventListener("click", (event) => {
        game.userChoice = event.currentTarget.textContent;
        btnsUser.forEach((btn) => {
          btn.classList.add("hidden");
        });
        if (game.gameNumber > 0) {
          const scoreBtn = document.getElementById("score__btn");
          scoreBtn.classList.remove("hidden");
          scoreBtn.addEventListener("click", game.displayScore);
        }
        game.compareResult();
        game.gameNumber++;
      });
    });
  },

  generateBotChoice: () => {
    const randomNumber = Math.floor(Math.random() * game.choice.length);
    game.botChoice = game.choice[randomNumber];
  },

  compareResult: () => {
    game.generateBotChoice();
    const elemCompare = document.getElementById("compare");
    const bot = game.botChoice.toLowerCase();
    const user = game.userChoice.toLowerCase();
    let currentStatus = "none";

    if (user === bot) {
      elemCompare.textContent = "made an equality";
      elemCompare.style.color = "blue";
      currentStatus = "equal";
    } else {
      if (game.results[user] && game.results[user][bot]) {
        elemCompare.textContent = game.results[user][bot];
        if (elemCompare.textContent.includes(" ")) {
          elemCompare.style.color = "red";
          currentStatus = "lose";
          game.botScore++;
        } else {
          elemCompare.style.color = "green";
          currentStatus = "won";
          game.userScore++;
        }
      }
    }
    game.pushScore(currentStatus);
    game.displayFaceToFace();
  },

  pushScore: (status) => {
    const currentGame = {
      gameNumber:game.gameNumber,
      userChoice: game.userChoice,
      botChoice: game.botChoice,
      status: status,
      userScore: game.userScore,
      botScore: game.botScore,
    };
    game.score.push(currentGame);
  },

  displayFaceToFace: () => {
    const resultDiv = document.getElementById("displayResult");
    resultDiv.classList.remove("hidden");
    const elemUser = document.getElementById("userChoice");
    elemUser.textContent = `Your ${game.userChoice}`;
    const elemBot = document.getElementById("botChoice");
    elemBot.textContent = `bot's ${game.botChoice}`;
    game.replay();
  },

  displayScore: () => {
    const scoreArticle = document.getElementById("displayScore");
    scoreArticle.innerHTML = "";
  
    if (game.score.length > 0) {
      const previousGame = game.score[game.score.length - 1];
      const scoreP = document.createElement("p");
      scoreP.textContent = `Game ${previousGame.gameNumber}: You ${previousGame.status} with ${previousGame.userChoice} against ${previousGame.botChoice}. Score: You ${previousGame.userScore} || ${previousGame.botScore} Bot`;
      scoreArticle.appendChild(scoreP);
    }
  
    game.replay();
    const scoreBtn = document.getElementById("score__btn");
    if (scoreBtn) {
      scoreBtn.classList.add("hidden");
    }
  },

  replay: () => {
    
    const elemCompare = document.getElementById("compare");
    const elemUser = document.getElementById("userChoice");
    const elemBot = document.getElementById("botChoice");
    const replayButton = document.getElementById("replay");
    replayButton.classList.remove("hidden");
    replayButton.addEventListener("click", () => {
      replayButton.classList.add("hidden");
      elemUser.textContent = "";
      elemBot.textContent = "";
      elemCompare.textContent = "";

      game.displayUserChoices();
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  game.init();
});
