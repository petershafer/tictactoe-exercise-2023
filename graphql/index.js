var express = require('express');
var { createHandler } = require('graphql-http/lib/use/express');
var { buildSchema } = require('graphql');
var { ruruHTML } = require('ruru/server');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello(name: String, greeting: String): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: ({ name = 'world', greeting = 'Hello' }) => {
    return `${greeting} ${name}!`;
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
