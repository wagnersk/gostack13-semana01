import React, {useState, useEffect}from 'react'
import api from './services/api'
import './App.css'
import Header from './components/Header'
import Teste from './components/Teste'

/**
 * Componentes
 * Propriedade
 * Estado & Imutabilidade
 */

function App(){  


  const [projects, setProjects] = useState([])

  useEffect(()=>{
    api.get('projects').then(response=>{
    setProjects(response.data)  
  })
  },[])
  
  console.log(projects)


  //useState retorna um array com 2 posições
  //
  //1. Variável com o seu valor inicial
  //2. Função para atualizarmos esse valor
  
  async function handleAddProject(){

    const response = await api.post('projects', {
      title:`Novo Projeto ${Date.now()}`,
      owner:"wagner"
    })

    const project = response.data

    setProjects([...projects , project])
  };


  return (
     <>
     <Teste title="title por propriedade"> 
     <h1>
       
     <ul>
        {projects.map(project=><li key={project.id}>{project.title}</li>)}
        </ul>
       </h1>
     
     </Teste>
     
      <Header title="Projects"/>

        <ul>
        {projects.map(project=><li key={project.id}>{project.title}</li>)}
        </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>

  </>
  )
}

export default App