const app = require('./config/app'),
      { port } = require('./config')
      
app.listen(port, () => console.log(`API running on ${port}`));
