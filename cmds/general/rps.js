const toValue = {
  "r": "rock",
  "rock": "rock",
  "rocks": "rock",
  "🤘": "rock",
  "🤛": "rock",
  "🤜": "rock",
  "👊": "rock",
  "✊": "rock",
  "p": "paper",
  "paper": "paper",
  "papers": "paper",
  "📜": "paper",
  "📃": "paper",
  "📰": "paper",
  "📄": "paper",
  "🗞": "paper",
  "🧻": "paper",
  "✋": "paper",
  "🤚": "paper",
  "🖐": "paper",
  "s": "scissors",
  "sc": "scissors",
  "scissor": "scissors",
  "scissors": "scissors",
  "✂": "scissors",
  "l": "lizard",
  "lizard": "lizard",
  "lizards": "lizard",
  "🦎": "lizard",
  "👌": "lizard",
  "✌": "scissors",
  "sp": "spock",
  "spock": "spock",
  "🖖": "spock",
  "v": "volcano",
  "volcano": "volcano",
  "volcanoes": "volcano",
  "🌋": "volcano"
};

const fromValue = {
  "rock": {
    "left": "🤜",
    "right": "🤛"
  },
  "paper": {
    "left": "✋",
    "right": "🤚"
  },
  "scissors": {
    "left": "✌",
    "right": "✌"
  },
  "lizard": {
    "left": "👌",
    "right": "👌"
  },
  "spock": {
    "left": "🖖",
    "right": "🖖"
  },
  "volcano": {
    "left": "🌋",
    "right": "🌋"
  }
};

const beats = {
  "rock": "scissors",
  "paper": "rock",
  "scissors": "paper"
}

const values = ["rock", "paper", "scissors"];
const eggs = ["lizard", "spock"];

module.exports.run = function(client, message, args) {
  let player = toValue[args[0]];
  let bot = values[Math.floor(Math.random() * values.length)];
  let content;

  const shoot = (a, b) =>
    (fromValue[a] != null ? fromValue[a].left : a) + "   vs.   " +
    (fromValue[b] != null ? fromValue[b].right : b);
  const title = "Rock, paper, scissors, shoot!";
  const anyTitle = "Rock, paper, anything, shoot!";

  const nothing = "Oh, it looks like you didn't play anything...";
  const anything = "Hahaha! Don't you know, volcanoes always win rock paper scissors anything!"
  const lizardSpock = "...Wait a second. This isn't rock paper scissors lizard spock!";
  const hint = "Hint: Try using R, P, or S.";

  const draw = "Uh oh, looks like we had a draw!";
  const playerWin = "You won! Congratulations! Good game.";
  const botWin = "I won! Yay!";

  if (args[0] == null)
    content = `${title}...\n${nothing}\n${hint}`;
  else if (player == null)
    content = `${anyTitle}\n\n${shoot(args[0], "volcano")}\n\n${anything}`;
  else if (player == "volcano")
    content = `${anyTitle}\n\n${shoot("volcano", "volcano")}\n\n${draw}`;
  else if (eggs.includes(player))
    content = `${title}\n\n${shoot(player, bot)}\n\n${lizardSpock}`;
  else {
    content = `${title}\n\n${shoot(player, bot)}\n\n`;
    if (beats[player] == bot)
      content += playerWin;
    else if (beats[bot] == player)
      content += botWin;
    else
      content += draw;
  }
  message.channel.send(content);
}

module.exports.info = {
  name: 'rockpaperscissors',
  aliases: ['rps']
}
