const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

// 

function checkIdExists(req, res, next) {
  if(!projects[req.params.id]){
    return res.status(400).json({error: "This id does not exist!"});
  }
  return next();
};
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: [],
  }
  projects.push(project);
  return res.json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].title = title;
  return res.json(projects);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const {id} = req.params;
  projects.splice(id, 1);
  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const {title} = req.body;
  projects[id].tasks.push(title);
  return res.json(projects);

});
server.listen(3333); 
