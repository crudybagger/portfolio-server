let express = require('express');
let app = express();
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});

// process.env.PORT = 5050;
app.listen(process.env.PORT || 5050, () => {
  console.log('Server Started on PORT ', process.env.PORT || 5050);
});
