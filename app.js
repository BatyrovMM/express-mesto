const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const routes = require('./routes/index.js');

app.use(express.static(`${__dirname}/public`));
app.use('/', routes);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
