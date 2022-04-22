const app = require("./src/app")
const fs = require('fs')
const https = require('https')

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/block4vars.com/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/block4vars.com/fullchain.pem"),
    },
    app
  )
  .listen(443, () => {
    console.log("Está rodando na porta 443");
  });


/*
http.createServer(app).listen(3000, ()=>{
    console.log('Está rodando na porta 3000')
});
*/
