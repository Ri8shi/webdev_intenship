const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    description: "A rich and creamy pasta tossed with garlic, parmesan, and herbs. Perfect for a quick and delicious meal.",
    image: "imges/garlic-pasta.jpeg",
    prepTime: "25 min",
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      "200g Pasta", "4 Garlic Cloves", "1 cup Cream",
      "1/2 cup Parmesan", "Salt", "Black Pepper",
      "Olive Oil", "Fresh Parsley"
    ],
    steps: [
      "Boil pasta in salted water and drain.",
      "Saute garlic in olive oil until fragrant.",
      "Add cream and parmesan, stir until smooth.",
      "Toss pasta in the sauce, season and garnish with parsley."
    ]
  },
  {
    "id": 2,
    "title": "Pav Bhaji",
    "description": "A iconic Indian street food featuring a spicy, mashed mixed-vegetable curry cooked on a flat griddle, served with buttery toasted buns.",
    "image": "imges/pav_bhaji.jpg",
    "prepTime": "20 min",
    "cookTime": "25 min",
    "servings": 2,
    "difficulty": "Medium",
    "ingredients": [
      "2 Large Potatoes, boiled and peeled",
      "1 cup Cauliflower Florets",
      "1/2 cup Green Peas",
      "1 Large Onion, finely chopped",
      "2 Tomatoes, finely chopped",
      "1/2 Green Bell Pepper, finely chopped",
      "2 tbsp Pav Bhaji Masala",
      "1 tbsp Ginger-Garlic Paste",
      "4 tbsp Butter",
      "1/2 tsp Kashmiri Red Chilli Powder",
      "4 Pav Buns",
      "Fresh Coriander and Lemon Wedges"
    ],
    "steps": [
      "Boil potatoes, cauliflower, and peas until completely soft, then mash them thoroughly with a potato masher.",
      "Heat 2 tablespoons of butter in a large pan, then sauté the onions and ginger-garlic paste until translucent.",
      "Add chopped bell peppers and tomatoes, cooking until the mixture becomes soft and mushy.",
      "Stir in pav bhaji masala, chilli powder, and salt, then cook for 2 minutes until aromatic.",
      "Add the mashed vegetables and a splash of water, simmering for 10 minutes while mashing occasionally to get a smooth consistency.",
      "Slice the pav buns horizontally and toast them on a hot griddle with a generous amount of butter before serving."
    ]
  },
  {
    id: 3,
    title: "Chocolate Cake",
    description: "A moist, decadent chocolate cake layered with rich chocolate ganache frosting. Perfect for any celebration.",
    image: "imges/cake.jpeg",
    prepTime: "30 min",
    cookTime: "45 min",
    servings: 8,
    difficulty: "Medium",
    ingredients: [
      "2 cups Flour", "2 cups Sugar", "3/4 cup Cocoa Powder",
      "2 Eggs", "1 cup Milk", "1/2 cup Vegetable Oil",
      "2 tsp Baking Soda", "1 cup Hot Water",
      "200g Dark Chocolate", "1 cup Heavy Cream"
    ],
    steps: [
      "Preheat oven to 350°F (175°C). Grease two 9-inch cake pans.",
      "Mix flour, sugar, cocoa, and baking soda. Add eggs, milk, and oil.",
      "Stir in hot water (batter will be thin). Pour into pans.",
      "Bake for 30-35 minutes until a toothpick comes out clean.",
      "For ganache, heat cream and pour over chopped chocolate. Stir until smooth.",
      "Let cakes cool, then frost with chocolate ganache."
    ]
  },
  {
    "id": 4,
    "title": "Chole Bhature",
    "description": "A beloved North Indian classic featuring spicy, tangy chickpea curry served alongside fluffy, deep-fried leavened bread.",
    "image": "imges/chole.jpeg",
    "prepTime": "30 min",
    "cookTime": "45 min",
    "servings": 4,
    "difficulty": "Hard",
    "ingredients": [
      "2 cups Chickpeas (Kabuli Chana), soaked overnight",
      "2 cups All-Purpose Flour (Maida)",
      "1/4 cup Semolina (Sooji)",
      "1/2 cup Yogurt",
      "2 Large Onions, finely chopped",
      "3 Tomatoes, pureed",
      "1 tbsp Ginger-Garlic Paste",
      "2 tbsp Chole Masala Powder",
      "1 tsp Cumin Seeds",
      "1/2 tsp Baking Soda",
      "Oil for deep frying and cooking",
      "Salt"
    ],
    "steps": [
      "Mix maida, sooji, yogurt, baking soda, salt, a tsp of oil, and water. Knead into a smooth dough and rest for 2 hours.",
      "Pressure cook the soaked chickpeas with salt, water, and a pinch of baking soda until soft (about 5-6 whistles).",
      "Heat oil in a pan, splutter cumin seeds, then saute onions and ginger-garlic paste until golden brown.",
      "Add tomato puree, chole masala, and salt. Cook until the oil separates from the spice mixture.",
      "Add the cooked chickpeas and a cup of their cooking water. Simmer on low heat for 15-20 minutes until the gravy thickens.",
      "Divide the dough into balls, roll into oval shapes, and deep fry in smoking hot oil until puffing up and golden brown."
    ]
  },
  {
    "id": 5,
    "title": "Paneer Tikka",
    "description": "Juicy grilled paneer cubes marinated in a spiced yogurt blend with crisp peppers and onions. A timeless, protein-packed vegetarian favorite.",
    "image": "imges/paneer.jpeg",
    "prepTime": "20 min",
    "cookTime": "15 min",
    "servings": 3,
    "difficulty": "Medium",
    "ingredients": [
      "400g Paneer, cut into large cubes",
      "1 Large Bell Pepper, cut into squares",
      "1 Large Red Onion, cut into petals",
      "1/2 cup Thick Yogurt (Hung Curd)",
      "1 tbsp Ginger-Garlic Paste",
      "1 tbsp Lemon Juice",
      "2 tsp Kashmiri Red Chilli Powder",
      "1 tsp Garam Masala",
      "1 tsp Kasuri Methi (Dried Fenugreek Leaves)",
      "1/2 tsp Carom Seeds (Ajwain)",
      "2 tbsp Mustard Oil (or Olive Oil)",
      "Salt"
    ],
    "steps": [
      "Whisk thick yogurt, ginger-garlic paste, lemon juice, oil, and all the spices together in a large bowl.",
      "Gently fold the paneer cubes, bell pepper squares, and onion petals into the marinade until fully coated.",
      "Marinate in the refrigerator for at least 30 minutes to let the flavors infuse.",
      "Thread the marinated paneer and vegetables alternately onto soaked wooden or metal skewers.",
      "Preheat your grill, air fryer, or grill pan to medium-high heat.",
      "Grill for 3-4 minutes per side, turning occasionally, until the edges are lightly charred and smoky."
    ]
  },
  {
    id: 6,
    title: "Fluffy Pancakes",
    description: "Light, fluffy pancakes with a golden exterior. Serve with maple syrup, fresh berries, or whipped cream.",
    image: "imges/pancake.jpeg",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "1.5 cups Flour", "2 tbsp Sugar", "1 tbsp Baking Powder",
      "1 cup Milk", "1 Egg", "3 tbsp Butter (melted)",
      "1 tsp Vanilla Extract", "Pinch of Salt"
    ],
    steps: [
      "Mix flour, sugar, baking powder, and salt in a bowl.",
      "Whisk milk, egg, melted butter, and vanilla together.",
      "Combine wet and dry ingredients, stir until just mixed (lumps are okay).",
      "Pour batter onto a hot, greased skillet. Flip when bubbles form on top.",
      "Cook until golden brown on both sides. Serve warm."
    ]
  },
  {
    "id": 7,
    "title": "Veggie Burger",
    "description": "A juicy homemade plant-based burger with melted cheese, fresh veggies, and a toasted brioche bun. Classic comfort food.",
    "image": "imges/burger.jpeg",
    "prepTime": "20 min",
    "cookTime": "10 min",
    "servings": 4,
    "difficulty": "Easy",
    "ingredients": [
      "4 Plant-Based Burger Patties (or Homemade Black Bean Patties)",
      "4 Brioche Buns",
      "4 Cheddar Slices",
      "1 Tomato",
      "Lettuce Leaves",
      "1 Red Onion",
      "Pickles",
      "Ketchup",
      "Mustard",
      "Salt",
      "Pepper",
      "1 tbsp Olive Oil"
    ],
    "steps": [
      "If making homemade patties, shape them into 4 equal-sized rounds. Season lightly with salt and pepper.",
      "Heat olive oil in a pan or preheat the grill over medium-high heat.",
      "Cook the veggie patties for 4-5 minutes per side until heated through and slightly crispy.",
      "Add a cheese slice on top of each patty in the last minute of cooking to melt.",
      "Toast the brioche buns lightly on the grill or pan.",
      "Assemble: bun, lettuce, veggie patty with cheese, tomato, onion, pickles, and sauce."
    ]
  },
  {
    id: 8,
    title: "Margherita Pizza",
    description: "A classic Italian Margherita pizza with a crispy thin crust, San Marzano tomato sauce, fresh mozzarella, and basil.",
    image: "imges/pizza.jpeg",
    prepTime: "40 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "2.5 cups Flour", "1 tsp Yeast", "1 tsp Sugar",
      "3/4 cup Warm Water", "2 tbsp Olive Oil",
      "1/2 cup Tomato Sauce", "200g Fresh Mozzarella",
      "Fresh Basil", "Salt"
    ],
    steps: [
      "Mix flour, yeast, sugar, and salt. Add warm water and olive oil to form dough.",
      "Knead for 8-10 minutes. Let rise for 30 minutes in a warm spot.",
      "Preheat oven to 475°F (245°C) with a baking sheet or pizza stone inside.",
      "Roll dough thin, spread tomato sauce, and add torn mozzarella.",
      "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
      "Top with fresh basil leaves, slice and serve immediately."
    ]
  }
];

const recipeGrid = document.getElementById('recipe-grid');
let activeCardId = null;
let currentPanelWrapper = null;

const chevronSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const clockSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

const printerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`;

let timerInterval = null;
let timerSeconds = 0;
let timerTotalSeconds = 0;
let timerState = 'idle';

function parseTotalSeconds(prepTime, cookTime) {
  const parse = (str) => {
    const num = parseInt(str);
    return isNaN(num) ? 0 : num * 60;
  };
  return parse(prepTime) + parse(cookTime);
}

function formatTime(totalSec) {
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const timeEl = document.getElementById('timer-time');
  if (timeEl) timeEl.textContent = formatTime(timerSeconds);
}

function updateTimerUI() {
  const section = document.getElementById('timer-section');
  const btnStart = document.getElementById('btn-start');
  const btnPause = document.getElementById('btn-pause');
  const btnReset = document.getElementById('btn-reset');
  if (!section) return;

  section.classList.remove('running', 'paused', 'completed');

  switch (timerState) {
    case 'idle':
      if (btnStart) { btnStart.style.display = ''; btnStart.textContent = 'Start Cooking'; }
      if (btnPause) btnPause.style.display = 'none';
      if (btnReset) btnReset.style.display = 'none';
      break;
    case 'running':
      section.classList.add('running');
      if (btnStart) btnStart.style.display = 'none';
      if (btnPause) { btnPause.style.display = ''; btnPause.textContent = 'Pause'; }
      if (btnReset) btnReset.style.display = '';
      break;
    case 'paused':
      section.classList.add('paused');
      if (btnStart) btnStart.style.display = 'none';
      if (btnPause) { btnPause.style.display = ''; btnPause.textContent = 'Resume'; }
      if (btnReset) btnReset.style.display = '';
      break;
    case 'completed':
      section.classList.add('completed');
      if (btnStart) btnStart.style.display = 'none';
      if (btnPause) btnPause.style.display = 'none';
      if (btnReset) { btnReset.style.display = ''; btnReset.textContent = 'Reset'; }
      break;
  }

  updateTimerDisplay();
}

function startTimer() {
  timerState = 'running';
  updateTimerUI();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      timerSeconds = 0;
      clearInterval(timerInterval);
      timerInterval = null;
      timerState = 'completed';
      updateTimerUI();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerState = 'paused';
  updateTimerUI();
}

function resumeTimer() {
  startTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = timerTotalSeconds;
  timerState = 'idle';
  updateTimerUI();
}

function cleanupTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  timerTotalSeconds = 0;
  timerState = 'idle';
}

function renderCards() {
  recipeGrid.innerHTML = '';

  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.setAttribute('data-recipe-id', recipe.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    card.setAttribute('aria-label', `View recipe: ${recipe.title}`);

    const hasImage = recipe.image && recipe.image.trim() !== '';

    card.innerHTML = `
      <div class="card-image ${hasImage ? '' : 'no-image'}">
        ${hasImage ? `<img src="${recipe.image}" alt="${recipe.title}" />` : ''}
      </div>
      <div class="card-footer">
        <span class="card-title">${recipe.title}</span>
        <span class="card-chevron">${chevronSVG}</span>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(recipe.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(recipe.id);
      }
    });

    recipeGrid.appendChild(card);
  });
}

function handleCardClick(recipeId) {

  if (activeCardId === recipeId) {
    closeDetail();
    return;
  }

  if (activeCardId !== null) {
    closeDetail(() => openDetail(recipeId));
  } else {
    openDetail(recipeId);
  }
}

function openDetail(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const card = recipeGrid.querySelector(`[data-recipe-id="${recipeId}"]`);
  if (!card) return;

  activeCardId = recipeId;
  card.classList.add('active');
  card.setAttribute('aria-expanded', 'true');

  const insertAfterEl = getRowEndElement(card);

  const wrapper = document.createElement('div');
  wrapper.classList.add('detail-panel-wrapper');
  wrapper.id = 'active-detail-panel';

  const hasImage = recipe.image && recipe.image.trim() !== '';

  timerTotalSeconds = parseTotalSeconds(recipe.prepTime, recipe.cookTime);
  timerSeconds = timerTotalSeconds;
  timerState = 'idle';

  wrapper.innerHTML = `
    <div class="recipe-detail">
      <div class="recipe-detail-inner">
        <div class="detail-image ${hasImage ? '' : 'no-image'}">
          ${hasImage ? `<img src="${recipe.image}" alt="${recipe.title}" />` : ''}
        </div>
        <div class="detail-content">
          <div class="detail-header">
            <h2 class="detail-title">${recipe.title}</h2>
            <div class="detail-header-actions">
              <button class="btn-print" id="btn-print" aria-label="Print this recipe">
                ${printerSVG} Print
              </button>
              <button class="detail-close" aria-label="Close recipe details" id="detail-close-btn">
                ${closeSVG}
              </button>
            </div>
          </div>
          <p class="detail-description">${recipe.description}</p>
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">prep time</span>
              <span class="meta-value">${recipe.prepTime}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">cook time</span>
              <span class="meta-value">${recipe.cookTime}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">servings</span>
              <span class="meta-value">${recipe.servings}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">difficulty</span>
              <span class="meta-value">${recipe.difficulty}</span>
            </div>
          </div>
          <div class="timer-section" id="timer-section">
            <div class="timer-display">
              <span class="timer-icon">${clockSVG}</span>
              <span class="timer-time" id="timer-time">${formatTime(timerTotalSeconds)}</span>
            </div>
            <div class="timer-controls">
              <button class="btn-start-cooking" id="btn-start">Start Cooking</button>
              <button class="btn-timer-secondary" id="btn-pause" style="display:none">Pause</button>
              <button class="btn-timer-secondary" id="btn-reset" style="display:none">Reset</button>
            </div>
          </div>
          <div class="detail-ingredients">
            <h3 class="detail-section-title">Ingredients</h3>
            <ul class="ingredient-list">
              ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class="detail-steps">
            <h3 class="detail-section-title">Steps</h3>
            <ol class="steps-list">
              ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;

  if (insertAfterEl.nextSibling) {
    recipeGrid.insertBefore(wrapper, insertAfterEl.nextSibling);
  } else {
    recipeGrid.appendChild(wrapper);
  }

  currentPanelWrapper = wrapper;

  wrapper.querySelector('#detail-close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    closeDetail();
  });

  wrapper.querySelector('#btn-print').addEventListener('click', (e) => {
    e.stopPropagation();
    window.print();
  });

  wrapper.querySelector('#btn-start').addEventListener('click', (e) => {
    e.stopPropagation();
    startTimer();
  });

  wrapper.querySelector('#btn-pause').addEventListener('click', (e) => {
    e.stopPropagation();
    if (timerState === 'running') {
      pauseTimer();
    } else if (timerState === 'paused') {
      resumeTimer();
    }
  });

  wrapper.querySelector('#btn-reset').addEventListener('click', (e) => {
    e.stopPropagation();
    resetTimer();
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wrapper.classList.add('open');

      setTimeout(() => {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  });
}

function closeDetail(callback) {
  if (!currentPanelWrapper) {
    if (callback) callback();
    return;
  }

  cleanupTimer();

  const activeCard = recipeGrid.querySelector(`.recipe-card.active`);
  if (activeCard) {
    activeCard.classList.remove('active');
    activeCard.setAttribute('aria-expanded', 'false');
  }

  currentPanelWrapper.classList.remove('open');

  const wrapper = currentPanelWrapper;

  const onTransitionEnd = () => {
    wrapper.removeEventListener('transitionend', onTransitionEnd);
    wrapper.remove();
    if (callback) callback();
  };

  wrapper.addEventListener('transitionend', onTransitionEnd);

  setTimeout(() => {
    if (wrapper.parentNode) {
      wrapper.remove();
      if (callback) callback();
    }
  }, 600);

  currentPanelWrapper = null;
  activeCardId = null;
}

function getRowEndElement(card) {
  const cards = Array.from(recipeGrid.querySelectorAll('.recipe-card'));
  const cardTop = card.getBoundingClientRect().top;
  let lastInRow = card;

  for (const c of cards) {
    const cTop = c.getBoundingClientRect().top;
    if (Math.abs(cTop - cardTop) < 10) {
      lastInRow = c;
    }
  }

  return lastInRow;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeCardId !== null) {
    closeDetail();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderCards();
});
