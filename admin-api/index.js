const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

const client = redis.createClient({ url: 'redis://redis:6379' });

client.on('error', err => console.log('Redis Client Error', err));

app.get('/', async (req, res) => {
  await client.connect();
  await client.set('msg', 'Hello from Admin API!');
  const val = await client.get('msg');
  res.send(val);
});

app.listen(port, () => console.log(`Admin API running on port ${port}`));