import '../config/dotenv.js'
import { pool } from '../config/database.js'


async function dropTables() {
  await pool.query(`
    DROP TABLE IF EXISTS event_games CASCADE;
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
      image_url   TEXT
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

async function createEventGamesTable() {
  await pool.query(`
    CREATE TABLE event_games (
      event_id  INT REFERENCES events(id) ON DELETE CASCADE,
      game_id   INT REFERENCES arcade_games(id) ON DELETE CASCADE,
      PRIMARY KEY (event_id, game_id)
    );
  `)
  console.log('event_games table created.')
}


async function seedArcadeGames() {
  await pool.query(`
    INSERT INTO arcade_games (name, genre, players, description, image_url) VALUES
      ('Pac-Man',              'Classic', 1, 'Navigate mazes and eat pellets while avoiding ghosts.',       'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pac-Man_GIF_recreation.gif'),
      ('Street Fighter II',    'Fighting',2, 'Head-to-head fighting game with iconic characters.',          'https://upload.wikimedia.org/wikipedia/en/4/4e/Street_Fighter_II_SNES.jpg'),
      ('Galaga',               'Shooter', 1, 'Classic fixed shooter — defend against waves of insects.',   'https://upload.wikimedia.org/wikipedia/en/4/49/Galaga.png'),
      ('Mortal Kombat II',     'Fighting',2, 'Brutal fighting game with fatalities and iconic characters.','https://upload.wikimedia.org/wikipedia/en/9/9f/Mortal_Kombat_II_arcade_flyer.jpg'),
      ('Donkey Kong',          'Platform',1, 'Jump over barrels and climb ladders to rescue Pauline.',     'https://upload.wikimedia.org/wikipedia/en/a/a5/Donkey-Kong-Gameplay.gif'),
      ('Tetris',               'Puzzle',  1, 'Stack falling blocks and clear lines as fast as you can.',   'https://upload.wikimedia.org/wikipedia/commons/9/9c/Typical_Tetris_Game.svg'),
      ('Time Crisis',          'Shooter', 2, 'Light-gun shooter with a pedal-based cover system.',         'https://upload.wikimedia.org/wikipedia/en/8/89/Time_Crisis_flyer.png'),
      ('Dance Dance Revolution','Rhythm', 2, 'Step on arrows in time with the music.',                     'https://upload.wikimedia.org/wikipedia/en/4/44/DDR_logo.png');
  `)
  console.log('arcade_games seeded.')
}

async function seedEvents() {
  await pool.query(`
    INSERT INTO events (title, description, event_date, start_time, end_time) VALUES
      ('Retro Night',           'An evening celebrating classic arcade games from the 80s and 90s.',       '2026-05-10', '18:00', '22:00'),
      ('Fighting Game Tournament','Compete in Street Fighter II and Mortal Kombat II for prizes.',         '2026-05-17', '15:00', '21:00'),
      ('Free Play Friday',      'Unlimited free play on all machines every Friday night.',                 '2026-05-24', '19:00', '23:59'),
      ('High Score Challenge',  'Try to beat the house high scores on Pac-Man, Galaga, and Tetris.',      '2026-06-07', '14:00', '20:00'),
      ('DDR Battle',            'Dance Dance Revolution showdown — beginner and expert brackets.',          '2026-06-14', '17:00', '21:00');
  `)
  console.log('events seeded.')
}

async function seedFood() {
  await pool.query(`
    INSERT INTO food (name, description, price, category) VALUES
      ('Arcade Nachos',      'Tortilla chips loaded with cheese, jalapeños, and salsa.',      11.99, 'Snacks'),
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

async function seedEventGames() {
  await pool.query(`
    INSERT INTO event_games (event_id, game_id) VALUES
      (1, 1), (1, 3), (1, 5), (1, 6),
      (2, 2), (2, 4),
      (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8),
      (4, 1), (4, 3), (4, 6),
      (5, 8);
  `)
  console.log('event_games seeded.')
}
