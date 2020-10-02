import React,{ useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";


function App() {
  const [ repository , setRepository] = useState([])


   useEffect(()=> {
    api.get("/repositories").then(data =>
         setRepository(data.data)
   )
 }, []) 



  async function handleAddRepository() {
    const response = await api.post('/repositories',{ 

      title:"Desafio ReactJS Adicionado 32",
      url:"https://github.com/wagnersk/desafio-conceitos-node",
      techs:["noje.js","..."],
      
    })
   setRepository([...repository, response.data])

  
  }

  async function handleRemoveRepository(id) {

    
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repository.findIndex(repo=>repo.id ===id)

    repository.splice(repositoryIndex,1)

    setRepository([...repository])

    // TODO
  }



  return (
    <div>
      <ul data-testid="repository-list">
        
          { repository.map(repo=> (
          <li key={repo.id}>
            
            {repo.title}    
              

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          
          
      </li>  
      
          ))
          }
          
      
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
