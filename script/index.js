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

  gameNumber: 0,
  userChoice: "none",
  botChoice: "none",

  init: () => {
    game.togglePlayBtn();
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

    if (user === bot) {
      elemCompare.textContent = "made an equality with";
      elemCompare.style.color = "blue";
    } else {
      if (game.results[user] && game.results[user][bot]) {
        elemCompare.textContent = game.results[user][bot];
        if (elemCompare.textContent.includes(" ")) {
          elemCompare.style.color = "red";
        } else {
          elemCompare.style.color = "green";
        }
      }
    }
    game.displayFaceToFace();
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
