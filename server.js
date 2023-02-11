'use strict';

const express = require('express');
const axios = require('axios');

const PORT = 3000;
const app = express();

class Digimon {
  constructor(name, image, level) {
    this.name = name;
    this.image = image;
    this.level = level;
  }
}

app.get('/alldigimon', async (req, res) => {
  try {
    const response = await axios.get('https://digimon-api.vercel.app/api/digimon');
    console.log(response.data);
    let digimons = [];
    for (const key in response.data) {
      digimons.push(new Digimon(response.data[key].name, response.data[key].img, response.data[key].level));
    }
    res.status(200).json(digimons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/ultimatedigimon', async (req, res) => {
  try {
    const response = await axios.get('https://digimon-api.vercel.app/api/digimon/level/ultimate');
    console.log(response.data);
    let digimons = [];
    for (const key in response.data) {
      digimons.push(new Digimon(response.data[key].name, response.data[key].img, response.data[key].level));
    }
    res.status(200).json(digimons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test', (request, response) => {
  response.send('alive!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});