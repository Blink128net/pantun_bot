const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

const CATEGORIES = ['lucu', 'galau', 'cinta', 'gombal', 'bijak'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'rahasia123',
  resave: false,
  saveUninitialized: true,
}));

// Middleware auth
function isAuthenticated(req, res, next) {
  if (req.session.loggedIn) next();
  else res.redirect('/login');
}

// === LOGIN ===
app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.loggedIn = true;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Login gagal' });
  }
});

// === DASHBOARD ===
app.get('/', isAuthenticated, (req, res) => {
  res.render('index', { categories: CATEGORIES });
});

// === LIHAT KATEGORI ===
app.get('/kategori/:nama', isAuthenticated, (req, res) => {
  const nama = req.params.nama;
  const file = path.join(__dirname, `../data/pantun_${nama}.json`);
  const pantun = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
  res.render('kategori', { nama, pantun });
});

// === TAMBAH PANTUN ===
app.post('/kategori/:nama/tambah', isAuthenticated, (req, res) => {
  const { isi } = req.body;
  const nama = req.params.nama;
  const file = path.join(__dirname, `../data/pantun_${nama}.json`);
  let pantun = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
  pantun.push(isi);
  fs.writeFileSync(file, JSON.stringify(pantun, null, 2));
  res.redirect(`/kategori/${nama}`);
});

// === HAPUS PANTUN ===
app.post('/kategori/:nama/hapus/:index', isAuthenticated, (req, res) => {
  const { nama, index } = req.params;
  const file = path.join(__dirname, `../data/pantun_${nama}.json`);
  let pantun = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
  pantun.splice(index, 1);
  fs.writeFileSync(file, JSON.stringify(pantun, null, 2));
  res.redirect(`/kategori/${nama}`);
});

app.listen(port, () => {
  console.log(`🚀 Web dashboard jalan di http://localhost:${port}`);
});
