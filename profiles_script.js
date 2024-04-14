function searchProfiles() {
    // Get input value
    var searchText = document.getElementById("searchBar").value.toLowerCase();
    // Get profile cards container
    var profilesContainer = document.getElementById("profilesContainer");
    // Get all profile cards
    var profileCards = profilesContainer.getElementsByClassName("profile-card");

    // Loop through each profile card
    for (var i = 0; i < profileCards.length; i++) {
        var profileCard = profileCards[i];
        // Get the name, skills, and location elements
        var name = profileCard.querySelector(".front h2").textContent.toLowerCase();
        var skills = profileCard.querySelector(".back ul").textContent.toLowerCase();
        var location = profileCard.querySelector(".back p:nth-of-type(2)").textContent.toLowerCase();
        
        // Check if any of the fields match the search text
        if (name.includes(searchText) || skills.includes(searchText) || location.includes(searchText)) {
            // Show the profile card
            profileCard.style.display = "block";
        } else {
            // Hide the profile card
            profileCard.style.display = "none";
        }
    }
}

// // Function to open the profile popup
// function openProfilePopup(profileCard) {
//     var popup = document.getElementById("profilePopup");
//     popup.style.display = "block";

//     // Clone the profile card content and append it to the popup
//     var profileDetails = profileCard.cloneNode(true);
//     profileDetails.removeAttribute("onclick");
//     profileDetails.classList.remove("profile-card");
//     popup.querySelector(".modal-content").appendChild(profileDetails);
// }

// Function to close the profile popup
function closeProfilePopup() {
    var popup = document.getElementById("profilePopup");
    popup.style.display = "none";
    // Remove the cloned profile card content when closing the popup
    popup.querySelector(".modal-content").innerHTML = "";
}

function openProfilePopup(name, image, rating, skills, experience, interests, comments) {
    var popup = document.getElementById("profilePopup");
    popup.style.display = "block";

    var modalContent = `
        <span class="close" onclick="closeProfilePopup()">&times;</span>
        <div class="profile-details">
            <img src="${image}" alt="Profile Image" style="width: 150px; height: 150px; border-radius: 50%;  margin-bottom: 15px; margin-left: 230px;">
            <h2>${name}</h2>
            <p>Rating: ${rating}</p>
            <h3>Skills</h3>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Interests</h3>
            <p>${interests}</p>
            <h3>Comments</h3>
            <div class="comments">
                ${comments.map(comment => `<div class="comment"><p>${comment}</p></div>`).join('')}
            </div>
            <button onclick="openChatPage('${name}')" style="border: 0;
            border-radius: 20px;
            padding: 12px 40px;
            margin-top: 30px;
            cursor: pointer;
            color: #FFF;
            background-color: #6c63ff;
            width: fit-content;
            margin-left: 230px;">Message</button>
        </div>
    `;

    popup.querySelector(".modal-content").innerHTML = modalContent;
}

// Function to open the chat page
function openChatPage(userName) {
    // Construct the chat page URL with the user's name as a query parameter
    var chatPageUrl = 'chat_index.html?user=${encodeURIComponent(userName)}';
    // Open the chat page in a new window or tab
    window.open(chatPageUrl, '_blank');
}