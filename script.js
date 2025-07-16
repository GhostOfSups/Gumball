// Array of 50+ XRP facts
const xrpFacts = [
  "XRP was created by Ripple Labs in 2012 to facilitate fast cross-border payments.",
  "The XRP Ledger processes transactions in 3-5 seconds, faster than most cryptocurrencies.",
  "XRP's average transaction fee is less than $0.01, making it cost-effective.",
  "The XRP Ledger is decentralized, with over 150 validators worldwide.",
  "XRP is used by financial institutions for real-time payment settlements.",
  "The maximum supply of XRP is 100 billion, with no mining required.",
  "XRP's consensus protocol uses minimal energy compared to Bitcoin's proof-of-work.",
  "XRP can handle 1,500 transactions per second, scalable for global use.",
  "The XRP Ledger was the first blockchain to support tokenized assets.",
  "XRP was co-created by Jed McCaleb, Arthur Britto, and David Schwartz.",
  "RippleNet uses XRP to enable instant global payments for banks.",
  "XRP transactions are immutable, ensuring secure and transparent records.",
  "The XRP Ledger supports smart contracts via its Escrow feature.",
  "XRP's consensus algorithm is called Ripple Protocol Consensus Algorithm (RPCA).",
  "Over 70% of XRP is held in escrow to control its release into circulation.",
  "XRP is used by companies like MoneyGram for cross-border remittances.",
  "The XRP Ledger is open-source and maintained by a global community.",
  "XRP transactions require a small burn of XRP to prevent spam attacks.",
  "The XRP Ledger supports multi-currency transactions, not just XRP.",
  "XRP is traded on over 100 cryptocurrency exchanges worldwide.",
  "The XRP Ledger has been operational since June 2012 without downtime.",
  "XRP's market cap consistently ranks among the top 10 cryptocurrencies.",
  "The XRP Ledger allows for trust lines to manage credit relationships.",
  "XRP is designed to bridge different currencies for seamless exchange.",
  "The XRP Ledger's validators do not receive mining rewards, unlike Bitcoin.",
  "XRP transactions are confirmed by a network of trusted nodes.",
  "The XRP Ledger supports decentralized exchange (DEX) features.",
  "XRP can be used for micropayments due to its low fees.",
  "The XRP Ledger has a built-in anti-spam mechanism called the reserve fee.",
  "XRP is accepted by some merchants as a payment method.",
  "The XRP Ledger supports payment channels for high-throughput transactions.",
  "XRP's ledger is transparent, with all transactions publicly viewable.",
  "The XRP community hosts an annual event called Apex: XRP Ledger Developer Summit.",
  "XRP is used in Ripple's On-Demand Liquidity (ODL) solution.",
  "The XRP Ledger allows users to issue custom tokens for various use cases.",
  "XRP transactions are cryptographically signed for security.",
  "The XRP Ledger has processed over 2.5 billion transactions since inception.",
  "XRP is named after the 'ripple' effect of fast, global payments.",
  "The XRP Ledger supports multi-signing for enhanced account security.",
  "XRP has been integrated into some central bank digital currency (CBDC) pilots.",
  "The XRP Ledger's consensus requires agreement from 80% of validators.",
  "XRP is used by Santander Bank for its One Pay FX service.",
  "The XRP Ledger supports atomic transactions for reliable exchanges.",
  "XRP's low energy consumption makes it eco-friendly compared to Bitcoin.",
  "The XRP Ledger allows for freezing of assets for regulatory compliance.",
  "XRP is supported by wallets like Xumm and Ledger Nano.",
  "The XRP Ledger has a feature called 'Checks' for secure payment requests.",
  "XRP transactions are settled on a public ledger, not a private database.",
  "The XRP Ledger supports cross-currency payments with automatic conversion.",
  "XRP is used in some charitable initiatives, like Ripple's donations to education.",
  "The XRP Ledger has a native feature for issuing stablecoins.",
  "XRP's transaction speed makes it suitable for real-time trading.",
  "The XRP Ledger has a community-driven governance model.",
  "XRP is listed on major exchanges like Binance, Coinbase, and Kraken.",
  "The XRP Ledger supports hooks for programmable smart contracts.",
  "XRP's design prioritizes scalability for global financial systems.",
];

// Initialize points and player name
let points = parseInt(localStorage.getItem('xrpPoints')) || 0;
let playerName = localStorage.getItem('playerName') || prompt('Enter your name for the leaderboard:', 'Player') || 'Player';
if (!localStorage.getItem('playerName')) {
  localStorage.setItem('playerName', playerName);
}

// Function to play sound with fallback
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) {
    sound.play().catch(() => console.log(`Sound ${soundId} not found or failed to play`));
  }
}

// Function to spin the gumball machine
function spinMachine() {
  const gumballImg = document.getElementById('gumball-img');
  const rewardDisplay = document.getElementById('reward-display');
  const pointsDisplay = document.getElementById('points');

  // Play coin sound
  playSound('coin-sound');

  // Add spin animation
  gumballImg.classList.add('spin');
  rewardDisplay.textContent = 'Spinning...';

  setTimeout(() => {
    // Play gumball drop sound
    playSound('gumball-sound');

    // Remove spin animation
    gumballImg.classList.remove('spin');

    // Select a random XRP fact
    const randomFact = xrpFacts[Math.floor(Math.random() * xrpFacts.length)];
    rewardDisplay.textContent = randomFact;

    // Update points
    points += 10;
    pointsDisplay.textContent = points;
    localStorage.setItem('xrpPoints', points);

    // Update leaderboard
    updateLeaderboard();
  }, 1000);
}

// Function to reset points
function resetPoints() {
  points = 0;
  localStorage.setItem('xrpPoints', points);
  document.getElementById('points').textContent = points;
  updateLeaderboard();
}

// Function to update leaderboard
function updateLeaderboard() {
  const leaderboardList = document.getElementById('leaderboard-list');
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
  // Update or add current player's score
  const playerIndex = leaderboard.findIndex(entry => entry.name === playerName);
  if (playerIndex >= 0) {
    leaderboard[playerIndex].score = points;
  } else {
    leaderboard.push({ name: playerName, score: points });
  }

  // Sort and limit to top 5
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);

  // Save to localStorage
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

  // Display leaderboard
  leaderboardList.innerHTML = '';
  if (leaderboard.length > 0) {
    leaderboard.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score} points`;
      leaderboardList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No scores yet!';
    leaderboardList.appendChild(li);
  }
}

// Fetch XRP price from CoinGecko API
async function fetchXrpPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd');
    const data = await response.json();
    const price = data.ripple.usd;
    document.getElementById('xrp-price').textContent = `$${price.toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching XRP price:', error);
    document.getElementById('xrp-price').textContent = 'Unavailable';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchXrpPrice();
  document.getElementById('points').textContent = points;
  updateLeaderboard(); // Ensure leaderboard is initialized on load
});
