export const title = "Projects";

export const onMount = (params) => loadProjects();

export const html =  /* html */ `
    <div id="projects">
        <div class="loader" id="projects-loader"></div>
    </div>
`;
