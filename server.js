const express = require('express');
const people = require('./people.json');
const quize = require('./quiz.json');
const ans = 0;
const app = express();
 

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/protected', function(req, res) {
  backURL=req.header('Referer') || '/';
  // do your thang
  res.redirect(backURL);
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    people: people.profiles,
    quiz:quize.number

  });
});

app.get('/question', (req, res) => {
  if(req.query.question > 108){
    res.render('numberfailed', {
      title: "No question number",
      qnumber : req.query.question
    });
  }
    res.render('profile', {
    title: `Question Number : ${req.query.question}`,
    qnumber : req.query.question
    });
});

app.get('/answer', (req, res) => {
const quiz =  quize.number.find(q => q.qnum == req.query.qq);
var qa = req.query.answer;
if(quiz.ans == qa){
 res.render('anstrue', {
    title: "TRUE"
  });
}else{
  res.render('ansfale', {
    title: "FALSE",
    qq: req.query.qq
  });
}
});


app.set('port', process.env.PORT || 7000);

app.listen(app.get('port'), function(){
          console.log('Express server listening on port ' + app.get('port'));
          });
