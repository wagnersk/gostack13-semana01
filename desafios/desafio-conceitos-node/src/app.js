const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');
const { isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});



app.post("/repositories", (request, response) => {
  const { title , url, techs } = request.body;
  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(project)
  return response.status(201).json(project)
});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params

  if(!isUuid(id)){
    return response.status(400).json({message:"Wrong id"})
  }
  const repositoryIndex = repositories.findIndex(repository=> repository.id ===id )

  if(repositoryIndex === -1){
    return response.status(400).json({message:"Cant find this project"})
  }

  const { title , url, techs } = request.body;
  const {likes } = repositories[repositoryIndex]
  const newRepo= repositories[repositoryIndex] = {title , url , techs , id, likes}

  return response.json(newRepo)
});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repositoryIndex = repositories.findIndex(repository=> repository.id ===id )

  if(repositoryIndex === -1){
    return response.status(400).json({message:"Cant find this project"})
  }

  repositories.splice(repositoryIndex,1)

  return response.status(204).json(repositories)

});


app.post("/repositories/:id/like", (request, response) => {

   const { id } = request.params

   const repositoryIndex = repositories.findIndex(repository=> repository.id ===id )

   if(repositoryIndex === -1){
    return response.status(400).json({message:"Cant find this project"})
  }
  
  repositories[repositoryIndex].likes++ 

   return response.json(repositories[repositoryIndex] )

});



module.exports = app;
