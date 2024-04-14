function searchProjects() {
    var input, filter, projects, projectCards, title, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    projects = document.getElementsByClassName("project-card");
    for (i = 0; i < projects.length; i++) {
        title = projects[i].querySelector(".project-title");
        txtValue = title.textContent || title.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            projects[i].style.display = "";
        } else {
            projects[i].style.display = "none";
        }
    }
}

// Function to open the project popup
function openProjectPopup(title, description, techStack, timeline, teamSize, expectations) {
    var popup = document.getElementById("projectPopup");
    popup.style.display = "block";

    var modalContent = `
        <h2>${title}</h2>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Tech Stack:</strong> ${techStack}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Team Size:</strong> ${teamSize}</p>
        <p><strong>Expectations from Teammates:</strong> ${expectations}</p>
        <button onclick="sendMessage()" style="border: 0;
        border-radius: 20px;
        padding: 12px 40px;
        margin-top: 30px;
        cursor: pointer;
        color: #FFF;
        background-color: #6c63ff;
        width: fit-content;
        margin-left: 230px;">Message Owner</button>
    `;

    popup.querySelector(".project-details").innerHTML = modalContent;
}

// Function to close the project popup
function closeProjectPopup() {
    var popup = document.getElementById("projectPopup");
    popup.style.display = "none";
    popup.querySelector(".project-details").innerHTML = "";
}