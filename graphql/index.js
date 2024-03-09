var express = require('express');
var { createHandler } = require('graphql-http/lib/use/express');
var { buildSchema } = require('graphql');
var { ruruHTML } = require('ruru/server');
const { v4: uuidv4 } = require('uuid');
const { newGame } = require('../dist/tictactoe');

const games = {};

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello(name: String, greeting: String): String,
    game(id: String!): Game!
  }

  type Mutation {
    newGame: Game!,
    doMove(id: ID, player: String, row: Int, col: Int): Game!
  }

  type Move {
    player: String,
    position: [Int]
  }

  type Game {
    id: ID,
    winner: String,
    firstPlayer: String,
    board: [[String]],
    history: [Move]
  }
`);

const transformExport = (gameExport) => ({
  ...gameExport,
  history: gameExport.history.map(([player, position]) => ({
    player,
    position,
  })),
});

// The root provides a resolver function for each API endpoint
var root = {
  hello: ({ name = 'world', greeting = 'Hello' }) => {
    return `${greeting} ${name}!`;
  },
  game: ({ id }) => {
    const game = games[id];
    return { id: id, ...games[id].export() };
  },
  newGame: () => {
    const gameId = uuidv4();
    games[gameId] = newGame();
    const gameExport = games[gameId].export();
    return { id: gameId, ...transformExport(gameExport) };
  },
  doMove: ({ id, player, row, col }) => {
    const game = games[id];
    game.nextMove(player, [row, col]);
    const gameExport = games[id].export();
    return { id, ...transformExport(gameExport) };
  },
};

var app = express();

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.get('/home', (_req, res) => {
  res.type('html');
  const quote = '\\\\\\' + '"';
  res.end(`
<html>
<body>
<p>Hello World</p>
<script>
let doit = (async (name="default") => {
let test = await fetch("http://localhost:4000/graphql", {
    "headers": {
        "content-type": "application/json",
    },
    "body": \`{\\"query\\":\\"query {  hello(name: ${quote}\${name}${quote})}\\"}\`,
    "method": "POST",
});
let output = await test.json();
console.log(output.data.hello);
});
doit();
</script>
<button onClick="doit('foo')">Foo</button>
<button onClick="doit('bar')">Bar</button>
</body>
</html>
    `);
});

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
