const games = [
    {
        id: 'snake',
        title: 'Snake',
        description: 'The classic Nokia-style arcade game. Eat food, grow longer, avoid walls and yourself.',
        icon: '🐍',
        path: './games/snake/index.html',
        color: '#10b981' // emerald
    },
    {
        id: 'memory',
        title: 'Memory Match',
        description: 'Test your brain power by finding the matching pairs of cards in the fewest moves.',
        icon: '🎴',
        path: './games/memory/index.html',
        color: '#6366f1' // indigo
    },
    {
        id: 'tictactoe',
        title: 'Tic Tac Toe',
        description: 'Classic X and O passing game. Play against a friend on the same device.',
        icon: '❌',
        path: './games/tictactoe/index.html',
        color: '#f43f5e' // rose
    },
    {
        id: 'breakout',
        title: 'Breakout',
        description: 'Smash through the colorful brick walls by bouncing the ball off your paddle.',
        icon: '🧱',
        path: './games/breakout/index.html',
        color: '#f59e0b' // amber
    },
    {
        id: 'pong',
        title: 'Ping Pong',
        description: 'The grandfather of video games. Compete in high-speed digital table tennis.',
        icon: '🏓',
        path: './games/pong/index.html',
        color: '#8b5cf6' // violet
    },
    {
        id: '2048',
        title: '2048',
        description: 'Slide matching numbers together to reach the legendary 2048 tile.',
        icon: '🔢',
        path: './games/2048/index.html',
        color: '#f97316' // orange
    },
    {
        id: 'flappybird',
        title: 'Flappy Bird',
        description: 'Tap to flap your wings and navigate through the treacherous pipe gaps.',
        icon: '🐦',
        path: './games/flappybird/index.html',
        color: '#eab308' // yellow
    },
    {
        id: 'connectfour',
        title: 'Connect Four',
        description: 'Drop your discs into the grid and be the first to connect four in a row.',
        icon: '🔴',
        path: './games/connectfour/index.html',
        color: '#ef4444' // red
    },
    {
        id: 'whackamole',
        title: 'Whack a Mole',
        description: 'Quickly smash the moles as they pop out of their holes. Fast reflexes needed!',
        icon: '🔨',
        path: './games/whackamole/index.html',
        color: '#84cc16' // lime
    },
    {
        id: 'rockpaperscissors',
        title: 'RPS',
        description: 'Rock, Paper, Scissors! Outsmart the UI in this visually engaging classic.',
        icon: '✊',
        path: './games/rockpaperscissors/index.html',
        color: '#06b6d4' // cyan
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('games-grid');

    // Inject Game Cards
    games.forEach((game, index) => {
        const card = document.createElement('a');
        card.href = game.path;
        card.className = 'game-card fade-in-up';
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <div class="card-thumbnail" style="background: radial-gradient(circle at top right, ${game.color}30, transparent 70%);">
                <div class="game-icon-wrapper" style="color: ${game.color}; border-color: ${game.color}50; background: ${game.color}15; box-shadow: 0 8px 25px ${game.color}30;">
                    ${game.icon}
                </div>
            </div>
            <div class="card-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="play-badge">Play Now →</div>
            </div>
        `;

        // Add subtle hover glow based on game's accent color
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 15px 40px -10px ${game.color}50`;
            card.style.borderColor = `${game.color}80`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.borderColor = '';
        });

        grid.appendChild(card);
    });

    // Theme Toggle basic dummy implementation (expandable later)
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    });
});
