import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewProject() {
  const history = useNavigate();
  const baseUrl = "http://localhost:5000/projects";

  function createPost(project) {
    //initialize cost and services
    project.cost = 0;
    project.services = [];

    //POST with axios
    axios.post(baseUrl, project).then((response) => {
      //redirect
      history("/projects", {
        state: { message: "Projeto criado com sucesso" },
      });
    });
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
