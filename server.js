// Installiere notwendige Pakete:
// npm install express morgan body-parser

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Verwende morgan als Logging-Middleware
app.use(morgan('combined'));

// Verwende body-parser für JSON-Body Parsing
app.use(bodyParser.json());

// Routen
app.get('/', (req, res) => {
  res.send('Yay, es funktioniert!!!');
});

app.get('/data', (req, res) => {
  res.json({ message: 'GET request to /data' });
});

app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'POST request to /data', data: data });
});

app.put('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'PUT request to /data', data: data });
});

app.delete('/data', (req, res) => {
  res.json({ message: 'DELETE request to /data' });
});

// Zentrale Fehlerbehandlungs-Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Middleware um nicht gefundene Routen zu behandeln
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
