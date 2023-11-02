import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Dashboard = ({ setIsAuthenticated }) => {
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(projects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleEdit = (id) => {
    const [project] = projects.filter((project) => project.id === id);

    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        deleteDoc(doc(db, "projects", id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const projectsCopy = projects.filter((project) => project.id !== id);
        setProjects(projectsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            projects={projects}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          projects={projects}
          setProjects={setProjects}
          setIsAdding={setIsAdding}
          getProjects={getProjects}
        />
      )}
      {isEditing && (
        <Edit
          projects={projects}
          selectedProject={selectedProject}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
          getProjects={getProjects}
        />
      )}
    </div>
  );
};

export default Dashboard;
