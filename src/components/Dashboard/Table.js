import React, { useState } from "react";
import * as XLSX from "xlsx";


const Table = ({ projects, handleEdit, handleDelete }) => {
  const [searchText, setSearchText] = useState(""); // State to store the search text

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

    // Function to export data to an Excel file
    const exportToExcel = () => {
      const dataToExport = projects.map((project) => ({
        Id: project.id,
        "දිස්ත්‍රික්කය": project.district,
        "කලාපය": project.subdistrict,
        "ප්‍රාදේශීය ඉංජීනේරු": project.proviceEng,
        "යෝජනාව ලද දිනය": project.date,
        "ලිපියේ යොමු අංකය": project.letterRefNum,
        "අවශ්‍යයතාවය ඉල්ලුම්කල නිලධාරියා": project.officer,
        "මහජන නියෝජීතයාගේ නම": project.description,
        "වෙනත්": project.peopleOfficer,
        "අවශ්‍යයතාවය අමාත්‍යාංශයට දැනුම් දුන් නිලධාරියා": project.informer,
        "පාසලේ ස්වභාවය": project.school,
        "යෝජනාවේ ස්වභාවය": project.request,
        "ආපදා ව්‍යාපෘතියක් යන වග": project.projectType,
        "යෝජනාව": project.proporsal,
        "යෝජනාව සදහා ගත් පියවර": project.action,
        "ව්‍යාපෘතිය අනුමත කල දිනය": project.acceptedDate,
        "අනුමත කල මුදල": project.acceptedMoney,
        "දැනුවත් කල ලිපිය යැවු දිනය": project.acknowlagedDate,
        "ගොනුවේ පිටු අංකය": project.pageNo,
      }));
  
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Projects");
      XLSX.writeFile(wb, "projects.xlsx");
    };

  // Filter the projects based on the search text
  const filteredProjects = projects
    ? projects.filter((project) => {
        const searchString = searchText.toLowerCase();
        return (
          (project.id && project.id.toLowerCase().includes(searchString)) ||
          (project.district && project.district.toLowerCase().includes(searchString)) ||
          (project.subdistrict && project.subdistrict.toLowerCase().includes(searchString)) ||
          (project.proviceEng && project.proviceEng.toLowerCase().includes(searchString)) ||
          (project.date && project.date.toLowerCase().includes(searchString)) ||
          (project.letterRefNum && project.letterRefNum.toLowerCase().includes(searchString))
        );
      })
    : [];

    // Calculate the index of the first and last project for the current page
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(
      indexOfFirstProject,
      indexOfLastProject
    );
  
    // Function to handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  

  return (
    <div className="contain-table">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      
      <button onClick={exportToExcel} style={{ backgroundColor: 'green', color: 'white' }}>Export to exel</button>

      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>දිස්ත්‍රික්කය</th>
            <th>කලාපය</th>
            <th>ප්‍රාදේශීය ඉංජීනේරු</th>
            <th>යෝජනාව ලද දිනය</th>
            <th>ලිපියේ යොමු අංකය</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, i) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.district}</td>
              <td>{project.subdistrict}</td>
              <td>{project.proviceEng}</td>
              <td>{project.date}</td>
              <td>{project.letterRefNum} </td>
              <td className="text-right">
                <button
                  onClick={() => handleEdit(project.id)}
                  className="button muted-button"
                >
                  Edit
                </button>
              </td>
              <td className="text-left">
                <button
                  onClick={() => handleDelete(project.id)}
                  className="button muted-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} style={{marginRight:'10px'}}>
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Table;
