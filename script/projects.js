function loadProjects() {
    fetch(getURL("json/projects.json"))
    .then(async (res) => {
        const json = await res.json();
        mountAllProjects(json);
        document.getElementById("projects").removeChild(document.getElementById("projects-loader"));
    })
    .catch((err) => { console.log(err) });
}

function mountAllProjects(json) {
    const icons = json.icons;
    const sections = json.sections;

    let overallProjectCount = 0;
    const projectsElement = document.getElementById("projects");
    for(let i = 0; i < sections.length; i++) {
        const sectionDiv = createSectionDiv(sections[i], icons, overallProjectCount);
        projectsElement.append(sectionDiv);
        overallProjectCount += sections[i].projects.length;
    }
}

function createSectionDiv(section, icons, overallProjectCount) {
    const sectionDiv = document.createElement("div");
    const sectionHeader = document.createElement("h2");
    sectionHeader.innerHTML = section.name;
    sectionDiv.appendChild(sectionHeader);

    const projects = section.projects;
    if(projects.length == 0) {
        const sectionEmptyP = document.createElement("p");
        sectionEmptyP.innerHTML = "Section empty...";
        sectionEmptyP.style.textAlign = "center";
        sectionDiv.appendChild(sectionEmptyP);
        return sectionDiv;
    }

    for(let j = 0; j < projects.length; j++) {
        const projectDiv = createProjectDiv(projects[j], icons, overallProjectCount);
        sectionDiv.appendChild(projectDiv);
        overallProjectCount++;
    }

    return sectionDiv;
}

function createProjectDiv(project, icons, overallProjectCount) {
    const projectDiv = document.createElement("div");
    const projectHeader = document.createElement("h3");
    projectHeader.innerHTML = project.name;
    projectDiv.appendChild(projectHeader);

    const projectImg = document.createElement("img");
    projectImg.classList.add(overallProjectCount % 2 == 0 ? "project-img-left" : "project-img-right");
    projectImg.setAttribute("src", project.image_src);
    projectImg.setAttribute("width", 150);
    projectImg.setAttribute("height", 150);
    projectDiv.appendChild(projectImg);

    const projectP = document.createElement("p");
    projectP.innerHTML = project.description;
    projectDiv.appendChild(projectP);

    const linksDiv = document.createElement("div");
    linksDiv.classList.add("links");
    linksDiv.classList.add("project-links");
    projectDiv.appendChild(linksDiv);

    const projectsLinks = project.links;
    for(let k = 0; k < projectsLinks.length; k++) {
        const linkDiv = createLinkDiv(projectsLinks[k], icons);
        linksDiv.appendChild(linkDiv);
    }

    return projectDiv;
}

function createLinkDiv(link, icons) {
    const linkDiv = document.createElement("div");

    const linkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    linkSvg.setAttribute("width", 30);
    linkSvg.setAttribute("height", 30);
    linkSvg.setAttribute("role", "img");
    linkSvg.setAttribute("viewBox", "0 0 24 24");
    linkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const svgTitle = document.createElement("title");
    svgTitle.innerHTML = link.resource;
    linkSvg.appendChild(svgTitle);

    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", icons[link.resource]);
    linkSvg.appendChild(svgPath);
    linkDiv.appendChild(linkSvg);

    const linkP = document.createElement("p");
    linkDiv.appendChild(linkP);
    const linkA = document.createElement("a");
    linkA.innerHTML = link.resource;
    linkP.appendChild(linkA);

    linkA.setAttribute("target", "_blank");
    linkA.setAttribute("href", link.url);

    return linkDiv;
}