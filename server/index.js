/*
//CLI: npm install express body-parser --save
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;   
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
// middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// apis
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
// apis
app.use('/api/customer', require('./api/customer.js'));
app.use('/api/admin', require('./api/admin.js'));

 // deployment
 const path = require('path');
// '/admin' serve the files at client-admin/build/* as static files
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'))
});
// '/' serve the files at client-customer/build/* as static files
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
  });

  
const path = require("path");

app.use('/admin', express.static(path.join(__dirname, '../client-admin/build')));
app.use('/', express.static(path.join(__dirname, '../client-customer/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-customer/build/index.html'));
}); */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// ===== middleware =====
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ===== test =====
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// ===== api =====
app.use('/api/customer', require('./api/customer.js'));
app.use('/api/admin', require('./api/admin.js'));

// ===== deploy frontend =====
app.use('/admin', express.static(path.join(__dirname, '../client-admin/build')));
app.use('/', express.static(path.join(__dirname, '../client-customer/build')));

// fix reload
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-customer/build/index.html'));
});

// ===== start server (PHẢI Ở CUỐI) =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});