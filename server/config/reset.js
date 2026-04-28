import './dotenv.js'
import { pool } from '../config/database.js'


async function dropTables() {
  await pool.query(`
    DROP TABLE IF EXISTS game_scores CASCADE;
    DROP TABLE IF EXISTS registrations CASCADE;
    DROP TABLE IF EXISTS events CASCADE;
    DROP TABLE IF EXISTS drinks CASCADE;
    DROP TABLE IF EXISTS food CASCADE;
    DROP TABLE IF EXISTS arcade_games CASCADE;
  `)
  console.log('Tables dropped.')
}

async function createArcadeGamesTable() {
  await pool.query(`
    CREATE TABLE arcade_games (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      genre       VARCHAR(50),
      players     INT DEFAULT 1,
      description TEXT,
      rating      NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 10),
      image_url   TEXT,
      play_url    TEXT
    );
  `)
  console.log('arcade_games table created.')
}

async function createEventsTable() {
  await pool.query(`
    CREATE TABLE events (
      id          SERIAL PRIMARY KEY,
      title       VARCHAR(150) NOT NULL,
      description TEXT,
      event_date  DATE NOT NULL,
      start_time  TIME,
      end_time    TIME
    );
  `)
  console.log('events table created.')
}

async function createFoodTable() {
  await pool.query(`
    CREATE TABLE food (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      description TEXT,
      price       NUMERIC(6,2) NOT NULL,
      category    VARCHAR(50)
    );
  `)
  console.log('food table created.')
}

async function createDrinksTable() {
  await pool.query(`
    CREATE TABLE drinks (
      id           SERIAL PRIMARY KEY,
      name         VARCHAR(100) NOT NULL,
      description  TEXT,
      price        NUMERIC(6,2) NOT NULL,
      is_alcoholic BOOLEAN DEFAULT FALSE
    );
  `)
  console.log('drinks table created.')
}

async function createRegistrationsTable() {
  await pool.query(`
    CREATE TABLE registrations (
      id         SERIAL PRIMARY KEY,
      event_id   INT REFERENCES events(id) ON DELETE CASCADE,
      name       VARCHAR(150) NOT NULL,
      email      VARCHAR(150) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)
  console.log('registrations table created.')
}

async function createGameScoresTable() {
  await pool.query(`
    CREATE TABLE game_scores (
      id          SERIAL PRIMARY KEY,
      player_name VARCHAR(150) NOT NULL,
      game_id     INT NOT NULL REFERENCES arcade_games(id) ON DELETE CASCADE,
      score       INT NOT NULL CHECK (score >= 0),
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `)
  console.log('game_scores table created.')
}


async function seedArcadeGames() {
  await pool.query(`
    INSERT INTO arcade_games (name, genre, players, description, image_url, rating, play_url) VALUES
      ('Tetris',           'Puzzle',  1, 'Stack falling blocks and clear lines as fast as you can.',    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Typical_Tetris_Game.svg',      9.5, '/games/tetris/index.html'),
      ('Pac-Man',          'Classic', 1, 'Navigate mazes and eat pellets while avoiding ghosts.',        'https://blog.sciencemuseum.org.uk/wp-content/uploads/sites/12/2017/10/Pacman.gif',  9.2, '/games/pacman/index.html'),
      ('Pac-Man Plus',     'Classic', 1, 'Classic maze action with extra challenge and speed.',          'https://i.pinimg.com/originals/65/a7/d5/65a7d53c0c921de180b400a2a6892381.gif',                   8.9, '/games/pacmanplus/index.html'),
      ('Shot Rider',       'Shooter', 1, 'Vertical scrolling action with boss battles every 5 levels.',  'https://online-emulators.com/user/arcade/logos/shtrider.webp',                8.6, '/games/shoterider/index.html'),
      ('Ball Runner',      'Sports',  1, 'High-speed duel where precision dashes and goals decide the match.', 'https://tse3.mm.bing.net/th/id/OIP.KUNYiG0igpy6U8t3s9WXngHaDa?pid=Api&h=220&P=0',       8.5, '/games/ballRunner/index.html'),
      ('Galaga',           'Shooter', 1, 'Pilot your ship, dodge enemy fire, and chase the high score.', 'https://gifdb.com/images/high/galaga-nes-game-cover-vf5ny1ziet4mv4zt.gif',                          9.0, '/games/galaga/index.html'),
      ('Gyruss',           'Shooter', 1, 'Spiral into action with rotational gameplay and fast-paced combat.', 'https://www.c64-wiki.com/images/f/f0/Gyruss_Animation.gif',                         8.8, '/games/gyruus/index.html'),
      ('Bomb Jack',        'Arcade',  1, 'Collect bombs, dodge devils, and rack up points across levels.', 'https://tse2.mm.bing.net/th/id/OIP.o0OGA2idvfct7OKVNkGW2gHaHa?pid=Api&h=220&P=0',         8.7, '/games/bomjack/index.html'),
      ('Duck Hunt',        'Shooter', 1, 'Track the ducks, react quickly, and push for the highest score.', 'https://csdb.dk/gfx/releases/226000/226342.gif',        8.9, '/games/duckhunt/index.html'),
      ('Mortal Kombat II', 'Fighting',2, 'Brutal fighting game with fatalities and iconic characters.', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Mortal_Kombat_II_Poster_2026.jpg/250px-Mortal_Kombat_II_Poster_2026.jpg',9.0, '/games/mortal-kombat-ii/index.html'),
      ('Street Fighter',   'Fighting',2, 'Head-to-head fighting game with iconic characters.',           'https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/500x659/products/3228749/6215112/XPE160541__37798.1709700114.jpg?c=2',      8.8, '/games/street-fighter/index.html');
  `)
  console.log('arcade_games seeded.')
}

async function seedEvents() {
  await pool.query(`
    INSERT INTO events (title, description, event_date, start_time, end_time) VALUES
      ('Pac-Man Marathon',         'How long can you last? Compete for the highest Pac-Man score of the night.',        '2026-05-10', '18:00', '22:00'),
      ('Fighting Game Tournament', 'Compete in Street Fighter and Mortal Kombat II head-to-head for prizes.',           '2026-05-17', '15:00', '21:00'),
      ('Tetris Blitz Night',       'Speed and strategy — see who can survive the longest in our Tetris challenge.',     '2026-05-24', '19:00', '23:00'),
      ('High Score Challenge',     'Try to beat the house high scores on Pac-Man and Tetris for bragging rights.',      '2026-06-07', '14:00', '20:00'),
      ('Arcade Championship',      'Grand finals across all four games: Tetris, Pac-Man, Street Fighter, and MK II.',   '2026-06-21', '16:00', '22:00');
  `)
  console.log('events seeded.')
}

async function seedFood() {
  await pool.query(`
    INSERT INTO food (name, description, price, category) VALUES
      ('Arcade Nachos',      'Tortilla chips loaded with cheese, jalapenos, and salsa.',       11.99, 'Snacks'),
      ('Classic Burger',     'Beef patty with lettuce, tomato, and our house sauce.',         13.99, 'Mains'),
      ('Buffalo Wings',      'Crispy wings tossed in buffalo sauce, served with ranch.',      12.99, 'Snacks'),
      ('Loaded Fries',       'Golden fries topped with cheese, bacon, and green onions.',      9.99, 'Snacks'),
      ('Pepperoni Pizza',    'Personal pizza with mozzarella and pepperoni.',                 11.99, 'Mains'),
      ('Caesar Salad',       'Romaine, parmesan, croutons, and Caesar dressing.',              9.99, 'Salads'),
      ('Mac & Cheese Bites', 'Crispy fried mac and cheese bites with dipping sauce.',          8.99, 'Snacks'),
      ('Veggie Wrap',        'Grilled vegetables and hummus in a flour tortilla.',            10.99, 'Mains');
  `)
  console.log('food seeded.')
}

async function seedDrinks() {
  await pool.query(`
    INSERT INTO drinks (name, description, price, is_alcoholic) VALUES
      ('Fountain Soda',    'Choice of Coke, Sprite, or Dr Pepper — free refills.',  2.99, FALSE),
      ('Lemonade',         'Fresh-squeezed lemonade served over ice.',               3.99, FALSE),
      ('Iced Tea',         'Sweet or unsweetened black tea.',                        2.99, FALSE),
      ('Draft Beer',       'Rotating selection of local craft beers on tap.',        6.99, TRUE),
      ('Arcade Punch',     'Fruity house punch with rum and triple sec.',            8.99, TRUE),
      ('Classic Margarita','Tequila, lime juice, and triple sec on the rocks.',      8.99, TRUE),
      ('Whiskey & Cola',   'Your choice of whiskey mixed with Coke.',               7.99, TRUE),
      ('Sparkling Water',  'Chilled sparkling water.',                               2.49, FALSE),
      ('Energy Drink',     'Red Bull or Monster — keep your score up.',             3.99, FALSE),
      ('Virgin Mojito',    'Mint, lime, and sparkling water — no alcohol.',          4.99, FALSE);
  `)
  console.log('drinks seeded.')
}

const runReset = async () => {
    try {
        await dropTables()
        await createArcadeGamesTable()
        await createEventsTable()
        await createFoodTable()
        await createDrinksTable()
        await createRegistrationsTable()
    await createGameScoresTable()
        await seedArcadeGames()
        await seedEvents()
        await seedFood()
        await seedDrinks()
        console.log('✅ Database reset and seeded successfully!')
    } catch (err) {
        console.error('❌ Error resetting database:', err)
    } finally {
      await pool.end()
    }
}

runReset()


