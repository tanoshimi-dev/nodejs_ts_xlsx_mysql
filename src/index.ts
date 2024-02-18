//const PORT = process.env.PORT
//const path = require('path');
const PORT = 3000
const HOST = '0.0.0.0';

// const express = require("express");
// const mysql = require('mysql');
// const XLSX = require('xlsx')
// const app = express();

import path from 'path';
import express from 'express';
//import mysql from 'mysql';
import mysql from 'mysql2';
import XLSX from 'XLSX';
const app = express();

const connection = mysql.createConnection({
  host: 'e2e.db.mysql',
  user: 'root',
  password: 'rootDev3',
  database: 'e2e-db'
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/",(req, res) => {
  //res.send("hello Nice!");
  res.render('home');
});

app.get("/db",(req, res) => {
  console.log('db connectiing..');
  connection.query(
    'SELECT * FROM test',
    (error, results) => {
      console.log('db',results);
    }
  );
  res.render('db');
});


app.get("/xlsx",(req, res) => {
  console.log('xlsx reading...', path.join(__dirname, 'data'));
  console.log('xlsx reading...', path.resolve(__dirname,"../data"));
  
  //const workbook = XLSX.read('./data/example.xlsx', {type:"binary"});
  const workbook = XLSX.readFile('./data/example.xlsx');
  // console.log('workbook=', workbook);
  const sheet = workbook.Sheets['Sheet1'] // <2>
  const rows = XLSX.utils.sheet_to_json(sheet, {
    raw: false,}) // <3>

  console.log(JSON.stringify(rows, null, 2))
  
  
  res.render('xlsx');

});


app.get("/rand",(req, res) => {
  const randVal = Math.floor(Math.random()*10) + 1;
  res.render('random', { rand: randVal } );
});




app.listen(PORT, HOST, () => {
  console.log(`Application listening on http://${HOST}:${PORT}`);
});

