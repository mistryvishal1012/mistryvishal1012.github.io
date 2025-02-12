document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectType = urlParams.get("projectType") + window.location.hash;
    loadProjects().then(() => {
        if (projectType.toString().includes("Project")) {
            const divElement = document.getElementById(projectType.split("#")[0]);
            const buttonElement = divElement.querySelector("button");
            buttonElement.id = "defaultOpen";
            document.getElementById("defaultOpen").click();
            const collapseElement = document.getElementById(projectType);
            collapseElement.checked = true;
            console.log(collapseElement, projectType);
            const label = document.querySelector(`label[for='${projectType}']`);
            const yOffset = label.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2);

            window.scrollTo({ top: yOffset, behavior: "smooth" }); console.log("Scrolled");
        } else {
            const divElement = document.getElementById("webProject");
            const buttonElement = divElement.querySelector("button");
            buttonElement.id = "defaultOpen";
            document.getElementById("defaultOpen").click();
        }
    });
});

let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
let val;
let webProjects = [];
let mobileProjects = [];
let datascienceProjects = [];
let project_category = ["web", "mobile", "data-science"];
window.onscroll = function () {
    console.log("Scroll")
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
        scrollBtn.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        scrollBtn.style.display = "none";
    }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
    navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    body.style.overflow = "hidden";
    scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
    scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
    });
}


function renderProjects(category, projectsData) {
    console.log(category, projectsData)
    const projectDescDiv = document.getElementById(`${category}ProjectDesc`);

    projectsData.forEach(project => {
        // Create the collapsible section for each project
        const projectWrapper = document.createElement('div');
        projectWrapper.classList.add('about-details');

        const collapsibleWrapper = document.createElement('div');
        collapsibleWrapper.classList.add('wrap-collabsible');

        const checkbox = document.createElement('input');
        checkbox.id = project.project_id;
        checkbox.classList.add('toggle');
        checkbox.type = 'checkbox';

        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.classList.add('lbl-toggle');
        label.textContent = project.project_name;

        const collapsibleContent = document.createElement('div');
        collapsibleContent.classList.add('collapsible-content');

        const contentInner = document.createElement('div');
        contentInner.classList.add('content-inner');

        // Split the project description by full stop and create a list
        const descriptionList = document.createElement('ul');
        const sentences = project.project_description.split('. ');

        sentences.forEach(sentence => {
            const listItem = document.createElement('li');
            listItem.textContent = sentence.trim() + '.';
            descriptionList.appendChild(listItem);
        });

        contentInner.appendChild(descriptionList);

        // Tech Stack Section
        const techStackSection = document.createElement('div');
        techStackSection.style.padding = '4%';
        techStackSection.classList.add('content-inner');
        const techStackTitle = document.createElement('h4');
        techStackTitle.textContent = 'Tech Stack';
        const techStackList = document.createElement('ul');
        project.tech_stack.forEach(tech => {
            const techItem = document.createElement('li');
            techItem.textContent = tech;
            techStackList.appendChild(techItem);
        });
        techStackSection.appendChild(techStackTitle);
        techStackSection.appendChild(techStackList);

        // Skills Section
        const skillsSection = document.createElement('div');
        skillsSection.classList.add('content-inner');
        const skillsTitle = document.createElement('h4');
        skillsTitle.textContent = 'Skills';
        const skillsList = document.createElement('ul');
        project.skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });
        skillsSection.appendChild(skillsTitle);
        skillsSection.appendChild(skillsList);

        // GitHub URL Section
        const githubSection = document.createElement('div');
        githubSection.classList.add('content-inner');
        const githubTitle = document.createElement('h4');
        githubTitle.textContent = 'GitHub Repository';
        const githubLink = document.createElement('a');
        githubLink.href = project.github_url;
        githubLink.target = '_blank';
        githubLink.textContent = project.github_url;
        githubSection.appendChild(githubTitle);
        githubSection.appendChild(githubLink);

        // Append everything to collapsibleContent
        collapsibleContent.appendChild(contentInner);
        collapsibleContent.appendChild(techStackSection);
        collapsibleContent.appendChild(skillsSection);
        collapsibleContent.appendChild(githubSection);

        collapsibleWrapper.appendChild(checkbox);
        collapsibleWrapper.appendChild(label);
        collapsibleWrapper.appendChild(collapsibleContent);

        projectWrapper.appendChild(collapsibleWrapper);
        projectDescDiv.appendChild(projectWrapper);
    });
}

// Function to fetch and render projects from the projects.json file
function loadProjects() {
    return fetch('../assets/webdevelopment.json')  // Path to your JSON file
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            getProjects(data); // Render projects
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

// window.onload = loadProjects;

function openProject(evt, projectName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(projectName).style.display = "block";
    evt.currentTarget.className += " active";
    console.log(projectName);
    console.log(document.getElementById(projectName));
    console.log(evt.currentTarget);
}

function getProjects(projects) {

    projects = projects.projects
    projects.filter(item => {
        switch (item.project_category) {
            case "web":
                webProjects.push(item);
                break;
            case "mobile":
                mobileProjects.push(item)
                break;
            case "data-science":
                datascienceProjects.push(item);
                break;
            default:
                break;
        }
    });

    project_category.forEach(category => {
        console.log(category)
        switch (category) {
            case "web":
                renderProjects(category, webProjects);
                break;
            case "mobile":
                renderProjects(category, mobileProjects);
                break;
            case "data-science":
                renderProjects(category, datascienceProjects);
                break;
            default:
                break;
        }
    });

}