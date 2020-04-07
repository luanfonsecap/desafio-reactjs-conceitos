import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";
import Repository from "./components/Repository";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("/repositories")
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((err) => alert("Erro ao obter repositórios"));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Novo repositório",
      url: "novaurl.com",
      techs: ["NodeJS"],
    });
    console.log(response);

    if (!response.status === 200) {
      alert("Repositório não pode ser criado");
    }

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (!response.status === 204) {
      alert("Repositório não pode ser removido");
    }

    const newList = repositories.filter((repo) => repo.id !== id);
    setRepositories(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <Repository
            key={repo.id}
            title={repo.title}
            id={repo.id}
            handleRemoveRepository={handleRemoveRepository}
          />
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
