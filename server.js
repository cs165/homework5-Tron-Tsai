const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet. See HW5 spec for more information.
const SPREADSHEET_ID = '1Hfet-aKJ0ctnxGQJiQTsIJjEkbhJTPNpwl_S_oMaIlo';

const app = express();
const jsonParser = bodyParser.json();
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

app.use(express.static('public'));

async function onGet(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;
  console.log(rows);

  // TODO(you): Finish onGet.
  var all = [];
  var part = {};
    for (var i=1; i < rows.length; i++) {
        part = {[rows[0][0].toString()]: rows[i][0].toString(), [rows[0][1].toString()]: rows[i][1].toString()};
        all.push(part);
    }
    res.json(all);

}
app.get('/api', onGet);

async function onPost(req, res) {
  const messageBody = req.body;
  
  // TODO(you): Implement onPost.
  console.log(messageBody);
  sheet.appendRow([messageBody.name,messageBody.email]);
  res.json({response: "success"});
}
app.post('/api', jsonParser, onPost);

async function onPatch(req, res) {
  const column  = req.params.column;
  const value  = req.params.value;
  const messageBody = req.body;

  // TODO(you): Implement onPatch.

  res.json( { status: 'unimplemented'} );
}
app.patch('/api/:column/:value', jsonParser, onPatch);

async function onDelete(req, res) {
  const column  = req.params.column;
  const value  = req.params.value;
  // TODO(you): Implement onDelete.
 const result = await sheet.getRows();
  const rows = result.rows;
  console.log(column);
  console.log(value);
  console.log(rows[0][0].toString());
  console.log(rows[0][1].toString());
  console.log(rows[0][1]);
  console.log(com == rows[0][0]);
  console.log(com == rows[0][0]);
  var cnum=-1;
  var com;
  for (var i=0; i < rows[0].length; i++) {
    console.log(i);
    com = rows[0][i];
    if(com==column){
      cnum = i;
      break;
    }
  }
  var den=-1;
if(cnum != -1){
  for (var i=1; i < rows.length; i++) {
    com = rows[i][cnum];
    if(com==value){
      den = i;
      break;
    }
  }
}
sheet.deleteRow(den);
  res.json({response: "success"});
}
app.delete('/api/:column/:value',  onDelete);


// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
