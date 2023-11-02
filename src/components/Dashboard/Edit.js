import React, { useState } from "react";
import Swal from "sweetalert2";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({
  projects,
  selectedProject,
  setProjects,
  setIsEditing,
  getProjects,
}) => {
  const id = selectedProject.id;

  const [district, setSelectedDistrict] = useState(selectedProject.district);
  const [subdistrict, setSelectedSubdistrict] = useState(
    selectedProject.subdistrict
  );
  const [proviceEng, setSelectedProviceEng] = useState(
    selectedProject.proviceEng
  );
  const [date, setDate] = useState(selectedProject.date);
  const [letterRefNum, setLetterRefNum] = useState(
    selectedProject.letterRefNum
  );
  const [officer, setSelectedOfficer] = useState(selectedProject.officer);

  // State to track whether to display the description input
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [showDescriptionInput1, setShowDescriptionInput1] = useState(false);
  const [description, setDescription] = useState(selectedProject.description);
  const [description1, setDescription1] = useState(selectedProject.description1);

  // State to track whether to display the People Officer input
  const [showPeopleOfficerInput, setShowPeopleOfficerInput] = useState(false);
  const [showPeopleOfficerInput1, setShowPeopleOfficerInput1] = useState(false);
  const [peopleOfficer, setPeopleOfficer] = useState(
    selectedProject.peopleOfficer
  );
  const [peopleOfficer1, setPeopleOfficer1] = useState(
    selectedProject.peopleOfficer1
  );

  const [informer, setInformer] = useState(selectedProject.informer);
  const [school, setSelectedSchool] = useState(selectedProject.school);
  const [request, setSelectedRequest] = useState(selectedProject.request);
  const [projectType, setSelectedProjectType] = useState(
    selectedProject.projectType
  );
  const [proporsal, setSelectedProporsal] = useState(selectedProject.proporsal);
  const [action, setSelectedAction] = useState(selectedProject.action);

  // State to track whether to display the Accepted input
  const [showAcceptInput, setShowAcceptInput] = useState(false);
  const [acceptedDate, setAcceptedDate] = useState(
    selectedProject.acceptedDate
  );
  const [acceptedMoney, setAcceptedMoney] = useState(
    selectedProject.acceptedMoney
  );

  // State to track whether to display the Other State input
  const [showOtherStateInput, setShowOtherStateInput] = useState(false);
  const [acknowlagedDate, setAcknowlagedDate] = useState(
    selectedProject.acknowlagedDate
  );
  const [pageNo, setPageNo] = useState(selectedProject.pageNo);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // if (!firstName || !lastName || !email || !salary || !date) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Error!",
    //     text: "All fields are required.",
    //     showConfirmButton: true,
    //   });
    // }

    const project = {
      district,
      subdistrict,
      proviceEng,
      date,
      letterRefNum,
      officer,
      description: showDescriptionInput ? description : null,
      peopleOfficer: showPeopleOfficerInput ? peopleOfficer : null,
      informer,
      school,
      request,
      projectType,
      proporsal,
      action,
      acceptedDate: showAcceptInput ? acceptedDate : null,
      acceptedMoney: showAcceptInput ? acceptedMoney : null,
      acknowlagedDate: showOtherStateInput ? acknowlagedDate : null,
      pageNo: showOtherStateInput ? pageNo : null,
    };

    await setDoc(doc(db, "projects", id), {
      ...project,
    });

    setProjects(projects);
    setIsEditing(false);
    getProjects();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //new fomated code for form managment

  // Data structure for districts and subdistricts
  const districtData = [
    {
      district: "කොළඹ",
      subdistricts: ["කොළඹ", "ජයවර්ධනපුර", "හෝමාගම", "පිලියන්දල"],
      proviceEngs: ["කොළඹ ", "බත්තරමුල්ල", "හෝමාගම", "රත්මලාන"],
    },
    {
      district: "ගම්පහ",
      subdistricts: ["ගම්පහ", "මිණුවන්ගොඩ", "කැළණිය", "මීගමුව"],
      proviceEngs: ["ගම්පහ", "බියගම", "වත්තල", "මිණුවන්ගොඩ", "මීගමුව"],
    },
    {
      district: "කළුතර",
      subdistricts: ["කළුතර", "හොරණ", "මතුගම"],
      proviceEngs: ["කළුතර", "හොරණ", "පානදුර", "මතුගම"],
    },
  ];

  const officerData = [
    {
      officers: [
        "කලාප අධ්‍යාපන අධ්‍යක්ෂ",
        "පළාත් අධ්‍යාපන අධ්‍යක්ෂ",
        "ලේකම් ආණ්ඩුකාර කාර්්‍යයාලය",
        "ප්‍රධාන ලේකම්",
        "නියෝජ්‍ය ප්‍රධාන ලේකම්(සැලසුම්)",
        "විදුහල්පති",
        "ප්‍රාදේශීය ඉංජීනේරු",
        "මහජන නියෝජීතයන්",
        "වෙනත්",
      ],
    },
  ];

  const schoolData = [{ schools: ["ජාතික පාසලකි", "පළාත් පාසලකි"] }];

  const requestData = [
    {
      requests: [
        "නව ඉදිකිරීම්",
        "අඩක් නිම කල ගොඩනැගිලි",
        "ජලය",
        "විදුලිය",
        "වහල අළුත් වැඩියා",
        "ගොඩනැගිලි අළුත්වැඩියා",
        "වැසිකිලි ඉදිකිරීම් හා අළුත් වැඩියා",
        "මායිම් තාප්ප ඉදි කිරීම",
        "ක්‍රීඩා පිවි ඉදිකිරීම සහ අළුත් වැඩියා",
        "පරිගණක මිලදි ගැනුම් සහ අළුත් වැඩියා",
        "ගෘහ භාණ්ඩ මිලදි ගැනුම් සහ අළුත් වැඩියා",
        "වෙනත්",
      ],
    },
  ];

  const projectTypeData = [
    {
      types: ["ඔව්", "නැත"],
    },
  ];

  const actionData = [
    {
      actions: [
        "ව්‍යාපෘතියක් අනුමත කලා",
        "නියෝජ්‍ය ප්‍රධාන ලේකම් දැනුවත් කලා",
        "අධ්‍යාපන අමාත්‍යාංශය දැනුවත් කලා",
        "ගරු ආණ්ඩුකාරතුමා දැනුවත් කලා",
        "ප්‍රධාන ලේකම් දැනුවත් කලා",
        "ඇස්තමේන්තු සැකසීමට නියෝජ්‍ය ප්‍රධාන ලේකම් ඉංජීනේරු/ ප්‍රාදේශීය ඉංජීනේරු දැනුවත් කලා",
        "වෙනත්",
      ],
    },
  ];

  // Function to dynamically generate district options
  const renderDistrictOptions = () => {
    return districtData.map((entry) => (
      <option key={entry.district} value={entry.district}>
        {entry.district}
      </option>
    ));
  };

  // Function to dynamically generate subdistrict options based on selected district
  const renderSubdistrictOptions = () => {
    const selectedDistrictData = districtData.find(
      (entry) => entry.district === district
    );
    if (selectedDistrictData) {
      return selectedDistrictData.subdistricts.map((subdistrict) => (
        <option key={subdistrict} value={subdistrict}>
          {subdistrict}
        </option>
      ));
    }
    return null;
  };

  // Function to dynamically generate officer options
  const renderOfficerOptions = () => {
    const officers = officerData[0].officers;
    return officers.map((officers, index) => (
      <option key={index} value={officers}>
        {officers}
      </option>
    ));
  };

  // Function to dynamically generate engineer options based on selected district
  const renderProviceEngOptions = () => {
    const selectedDistrictData = districtData.find(
      (entry) => entry.district === district
    );
    if (selectedDistrictData) {
      return selectedDistrictData.proviceEngs.map((proviceEng) => (
        <option key={proviceEng} value={proviceEng}>
          {proviceEng}
        </option>
      ));
    }
    return null;
  };

  // Function to dynamically generate schools options
  const renderSchoolOptions = () => {
    const schools = schoolData[0].schools;
    return schools.map((schools, index) => (
      <option key={index} value={schools}>
        {schools}
      </option>
    ));
  };

  // Function to dynamically generate request options
  const renderRequestOptions = () => {
    const requests = requestData[0].requests;
    return requests.map((requests, index) => (
      <option key={index} value={requests}>
        {requests}
      </option>
    ));
  };

  // Function to dynamically generate project type options
  const renderProjectTypeOptions = () => {
    const types = projectTypeData[0].types;
    return types.map((types, index) => (
      <option key={index} value={types}>
        {types}
      </option>
    ));
  };

  // Function to dynamically generate request options
  const renderActionOptions = () => {
    const actions = actionData[0].actions;
    return actions.map((actions, index) => (
      <option key={index} value={actions}>
        {actions}
      </option>
    ));
  };

  // Function to toggle the description input based on the selected officer
  const toggleDescriptionInput = (selectedValue) => {
    if (selectedValue === "වෙනත්") {
      setShowDescriptionInput(true);
    } else {
      setShowDescriptionInput(false);
    }
  };

  // Function to toggle the description input based on the selected officer
  const togglePeopleOfficerInput = (selectedValue) => {
    if (selectedValue === "මහජන නියෝජීතයන්") {
      setShowPeopleOfficerInput(true);
    } else {
      setShowPeopleOfficerInput(false);
    }
  };

    // Function to toggle the description input based on the selected officer
    const toggleDescriptionInput1 = (selectedValue) => {
      if (selectedValue === "වෙනත්") {
        setShowDescriptionInput1(true);
      } else {
        setShowDescriptionInput1(false);
      }
    };
  
    // Function to toggle the description input based on the selected officer
    const togglePeopleOfficerInput1 = (selectedValue) => {
      if (selectedValue === "මහජන නියෝජීතයන්") {
        setShowPeopleOfficerInput1(true);
      } else {
        setShowPeopleOfficerInput1(false);
      }
    };
  

  // Function to toggle the accept input based on the selected officer
  const toggleAcceptInput = (selectedValue) => {
    if (selectedValue === "ව්‍යාපෘතියක් අනුමත කලා") {
      setShowAcceptInput(true);
    } else {
      setShowAcceptInput(false);
    }
  };

  // Function to toggle the accept input based on the selected officer
  const toggleOtherStateInput = (selectedValue) => {
    if (selectedValue !== "ව්‍යාපෘතියක් අනුමත කලා") {
      setShowOtherStateInput(true);
    } else {
      setShowOtherStateInput(false);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Project</h1>
        <label htmlFor="district">දිස්ත්‍රික්කය</label>
        <select
          id="district"
          value={district}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">දිස්ත්‍රික්කය</option>
          {renderDistrictOptions()}
        </select>

        <label htmlFor="subdistrict">කලාපය</label>
        <select
          id="subdistrict"
          value={subdistrict}
          onChange={(e) => setSelectedSubdistrict(e.target.value)}
        >
          <option value="">කලාපය</option>
          {renderSubdistrictOptions()}
        </select>

        <label htmlFor="proviceEng">ප්‍රාදේශීය ඉංජීනේරු</label>
        <select
          id="proviceEng"
          value={proviceEng}
          onChange={(e) => setSelectedProviceEng(e.target.value)}
        >
          <option value="">ප්‍රාදේශීය ඉංජීනේරු</option>
          {renderProviceEngOptions()}
        </select>

        <label htmlFor="date">යෝජනාව ලද දිනය</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="letterRefNum">ලිපියේ යොමු අංකය</label>
        <input
          id="letterRefNum"
          type="text"
          name="letterRefNum"
          value={letterRefNum}
          onChange={(e) => setLetterRefNum(e.target.value)}
        />

        <label htmlFor="officer">අවශ්‍යයතාවය ඉල්ලුම්කල නිලධාරියා</label>
        <select
          id="officer"
          value={officer}
          onChange={(e) => {
            setSelectedOfficer(e.target.value);
            toggleDescriptionInput(e.target.value);
            togglePeopleOfficerInput(e.target.value);
          }}
        >
          <option value="">අවශ්‍යයතාවය ඉල්ලුම්කල නිලධාරියා</option>
          {renderOfficerOptions()}
        </select>

        {showDescriptionInput && (
          <div>
            <label htmlFor="description">සටහන් කරන්න</label>
            <input
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}

        {showPeopleOfficerInput && (
          <div>
            <label htmlFor="peopleOfficer">මහජන නියෝජීතයාගේ නම</label>
            <input
              id="peopleOfficer"
              type="text"
              name="peopleOfficer"
              value={peopleOfficer}
              onChange={(e) => setPeopleOfficer(e.target.value)}
            />
          </div>
        )}

        <label htmlFor="informer">
          අවශ්‍යයතාවය අමාත්‍යාංශයට දැනුම් දුන් නිලධාරියා
        </label>
        <select
          id="informer"
          value={informer}
          onChange={(e) => {
            setInformer(e.target.value);
            toggleDescriptionInput1(e.target.value);
            togglePeopleOfficerInput1(e.target.value);
          }}
        >
          <option value="">
            අවශ්‍යයතාවය අමාත්‍යාංශයට දැනුම් දුන් නිලධාරියා
          </option>
          {renderOfficerOptions()}
        </select>

        {showDescriptionInput1 && (
          <div>
            <label htmlFor="description1">සටහන් කරන්න</label>
            <input
              id="description1"
              type="text"
              name="description1"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
            />
          </div>
        )}

        {showPeopleOfficerInput1 && (
          <div>
            <label htmlFor="peopleOfficer1">මහජන නියෝජීතයාගේ නම</label>
            <input
              id="peopleOfficer1"
              type="text"
              name="peopleOfficer1"
              value={peopleOfficer1}
              onChange={(e) => setPeopleOfficer1(e.target.value)}
            />
          </div>
        )}

        <label htmlFor="school">පාසලේ ස්වභාවය</label>
        <select
          id="school"
          value={school}
          onChange={(e) => setSelectedSchool(e.target.value)}
        >
          <option value="">පාසලේ ස්වභාවය</option>
          {renderSchoolOptions()}
        </select>

        <label htmlFor="request">යෝජනාවේ ස්වභාවය</label>
        <select
          id="request"
          value={request}
          onChange={(e) => setSelectedRequest(e.target.value)}
        >
          <option value="">යෝජනාවේ ස්වභාවය</option>
          {renderRequestOptions()}
        </select>

        <label htmlFor="projectType">ආපදා ව්‍යාපෘතියක් යන වග</label>
        <select
          id="projectType"
          value={projectType}
          onChange={(e) => setSelectedProjectType(e.target.value)}
        >
          <option value="">ආපදා ව්‍යාපෘතියක් යන වග</option>
          {renderProjectTypeOptions()}
        </select>

        <label htmlFor="proporsal">යෝජනාව</label>
        <input
          id="proporsal"
          type="text"
          name="proporsal"
          value={proporsal}
          onChange={(e) => setSelectedProporsal(e.target.value)}
        />

        <label htmlFor="action">යෝජනාව සදහා ගත් පියවර</label>
        <select
          id="action"
          value={action}
          onChange={(e) => {
            setSelectedAction(e.target.value);
            toggleAcceptInput(e.target.value);
            toggleOtherStateInput(e.target.value);
          }}
        >
          <option value="">යෝජනාව සදහා ගත් පියවර</option>
          {renderActionOptions()}
        </select>

        {showAcceptInput && (
          <div>
            <label htmlFor="acceptedDate">ව්‍යාපෘතිය අනුමත කල දිනය</label>
            <input
              id="acceptedDate"
              type="date"
              name="acceptedDate"
              value={acceptedDate}
              onChange={(e) => setAcceptedDate(e.target.value)}
            />
            <label htmlFor="acceptedMoney">අනුමත කල මුදල</label>
            <input
              id="acceptedMoney"
              type="number"
              name="acceptedMoney"
              value={acceptedMoney}
              onChange={(e) => setAcceptedMoney(e.target.value)}
            />
          </div>
        )}

        {showOtherStateInput && (
          <div>
            <label htmlFor="acknowlagedDate">දැනුවත් කල ලිපිය යැවු දිනය</label>
            <input
              id="acknowlagedDate"
              type="date"
              name="acknowlagedDate"
              value={acknowlagedDate}
              onChange={(e) => setAcknowlagedDate(e.target.value)}
            />
            <label htmlFor="pageNo">ගොනුවේ පිටු අංකය</label>
            <input
              id="pageNo"
              type="text"
              name="pageNo"
              value={pageNo}
              onChange={(e) => setPageNo(e.target.value)}
            />
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
