import Input from "../../form/Input";
import Select from "../../form/Select";
import SubmitButton from "../../form/SubmitButton";
import styles from "./ProjectForm.module.css";

import { useEffect, useState } from "react";
import axios from "axios";

function ProjectForm({ handleSubmit, projectData, btnText }) {
  const [project, setProject] = useState(projectData || {})
  const [categories, setCategories] = useState([])

  useEffect(() => {

    //GET with axios
    axios.get("http://localhost:5000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(project);
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
    
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnchange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento aqui"
        handleOnchange={handleChange}
        value={project.budget}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnchange={handleCategory}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
