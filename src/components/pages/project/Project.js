import styles from "./Project.module.css";

import Loading from "../../layout/Loading";
import Container from "../../layout/Container";
import ProjectForm from "./ProjectForm";
import axios from "axios";
import Message from "../../layout/Message";

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const baseUrl = `http://localhost:5000/projects`;

  //GET with axios
  useEffect(() => {
    axios.get(`${baseUrl}/${id}`).then((response) => {
      setProject(response.data);
    }, 0);
  }, [baseUrl, id]);

  function editPost() {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    //PATCH with axios
    axios
      .patch(`${baseUrl}/${project.id}`, project)
      .then((response) => {
        setProject(response.data);
        setShowProjectForm(false);
        console.log(response.data);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1> Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
