import Message from "../../layout/Message";
import Container from "../../layout/Container";
import styles from "./Projects.module.css";
import LinkButtom from "../../layout/LinkButton";
import ProjectCard from "./ProjectCard";
import Loading from "../../layout/Loading";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const baseUrl = `http://localhost:5000/projects`;

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  //GET with axios
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${baseUrl}`)
        .then((response) => {
          setProjects(response.data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProject(id) {
    //DELETE with axios
    setTimeout(() => {
      axios.delete(`${baseUrl}/${id}`);
      setProjectMessage("Projeto removido com sucesso!");
      setProjects(projects.filter((project) => project.id !== id));
    }, 300);
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_container}>
        <h1>Meus Projetos</h1>
        <LinkButtom text="Criar Projeto" to="/newproject" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project?.category?.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
