import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import marked from 'marked';
import { google, youtube, twitter, reddit, github, snapchat } from './trending';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

app.get('/', (req, res) => res.send(renderIndex()));

app.get('/google', (req, res) => google.getAll(r => res.send(r)));

app.get('/youtube', (req, res) => youtube.getAll(r => res.send(r)));

app.get('/twitter', (req, res) => twitter.getAll(r => res.send(r)));

app.get('/reddit', (req, res) => reddit.getAll(r => res.send(r)));

app.get('/github', (req, res) => github.getAll(req.query.lang, req.query.since, r => res.send(r)));
app.get('/github/developers', (req, res) => github.getDevelopers(req.query.lang, req.query.since, r => res.send(r)));

app.get('/snapchat', (req, res) => snapchat.getAll(r => res.send(r)));
app.get('/snapchat/:username', (req, res) => snapchat.getForUser(req.params.username, r => res.send(r)));

app.listen(port, () => console.log(`API running on port ${port}!`));

/**
 *
 */
function renderIndex() {
  const file = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8');
  const font = `
    <head>
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
      <style>body { padding: 10%; font-family: 'Roboto', sans-serif; }</style>
    </head>
  `;
  return font + marked(`${file}`);
}
