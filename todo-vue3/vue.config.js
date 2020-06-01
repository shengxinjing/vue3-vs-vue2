const fs = require('fs')
module.exports = {
    devServer: {
      before(app){
        app.get('/api/todos', (req,res)=>{
          res.json(JSON.parse(fs.readFileSync('./todos.json')))
        })

        app.post('/api/todos', (req,res)=>{
          console.log(req.body)
          res.json(JSON.parse(fs.readFileSync('./todos.json')))
        })
        
      }

    }
  }
  