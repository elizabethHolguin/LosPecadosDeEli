const express = require('express');
const app = express();

app.use(express.static('./dist/pecadoseli'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/pecadoseli/'}
  );
});

app.listen(process.env.PORT || 8080);