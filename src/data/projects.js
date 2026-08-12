// src/data/projects.js
import { emildaProjects } from "./emilda-projects";
import { hfwlTechnologiesProjects } from "./hfwl-technologies-projects";
import { freelanceProjects } from "./freelance-projects"; 


// Combine all projects
const projects = [...emildaProjects, ...hfwlTechnologiesProjects, ...freelanceProjects];

// Log to verify data
// console.log("Total projects loaded:", projects.length);
// console.log("Sample origins:", projects.map(p => p.origin).slice(0, 5));
// console.log("Sample statuses:", projects.map(p => p.status).slice(0, 5));

export default projects;

