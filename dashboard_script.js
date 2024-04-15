function editProfile() {
    var profileInfo = document.querySelector(".profile-info");
    var profileDetails = profileInfo.querySelector(".profile-details");
    var editButton = profileInfo.querySelector("button");

    // Change button text to "Save Changes"
    editButton.textContent = "Save Changes";
    editButton.removeEventListener("click", editProfile);
    editButton.addEventListener("click", saveChanges);

    // Convert profile details to input fields for editing
    var name = profileDetails.querySelector(":nth-child(1)").textContent.split(": ")[1];
    var location = profileDetails.querySelector(":nth-child(2)").textContent.split(": ")[1];
    var contact = profileDetails.querySelector(":nth-child(3)").textContent.split(": ")[1];
    var experience = profileDetails.querySelector(":nth-child(4)").textContent.split(": ")[1];

    profileDetails.innerHTML = `
        <input type="text" id="nameInput" value="${name}">
        <input type="text" id="locationInput" value="${location}">
        <input type="text" id="contactInput" value="${contact}">
        <input type="text" id="experienceInput" value="${experience}">
    `;
}

function saveChanges() {
    var name = document.getElementById("nameInput").value;
    var location = document.getElementById("locationInput").value;
    var contact = document.getElementById("contactInput").value;
    var experience = document.getElementById("experienceInput").value;

    // Update profile details with new values
    var profileDetails = document.querySelector(".profile-details");
    profileDetails.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Experience:</strong> ${experience}</p>
    `;

    // Change button text back to "Edit Profile"
    var editButton = document.querySelector("button");
    editButton.textContent = "Edit Profile";
    editButton.removeEventListener("click", saveChanges);
    editButton.addEventListener("click", editProfile);
}

const CLIENT_ID = "";
const API_KEY = "";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("authorize_button").style.visibility = "hidden";
document.getElementById("signout_button").style.visibility = "hidden";
document.getElementById("event_form").style.visibility = "hidden";

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC]
  });
  gapiInited = true;
  maybeEnableButtons();
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "" // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

function handleAuthClick() {
  tokenClient.callback = async resp => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById("signout_button").style.visibility = "visible";
    document.getElementById("event_form").style.visibility = "visible";
    document.getElementById("authorize_button").innerText = "Refresh";
    await listUpcomingEvents();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("content").innerText = "";
    document.getElementById("authorize_button").innerText = "Authorize";
    document.getElementById("signout_button").style.visibility = "hidden";
    document.getElementById("event_form").style.visibility = "hidden";
  }
}

async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById("content").innerText = "No events found.";
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
    (str, event) =>
      `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    "Events:\n"
  );
  document.getElementById("content").innerText = output;
}

const addEvent = () => {
  // Refer to the JavaScript quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/js
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.

  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const date = document.getElementById("date").value;
  const start = document.getElementById("st").value;
  const end = document.getElementById("et").value;
  var ISOstartdate = "";

  const startTime = new Date(date + "," + start).toISOString();
  const endTime = new Date(date + "," + end).toISOString();

  var event = {
    summary: title,
    location: "Google Meet",
    description: desc,
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles"
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles"
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: "abc@google.com" }, { email: "xyz@google.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 }
      ]
    }
  };

  console.log(event);
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event
  });

  request.execute(function(event) {
    console.log(event.htmlLink);
  });
};

async function createMeet(calendarId, eid) {
    const eventPatch = {
      conferenceData: {
        createRequest: { requestId: "7qxalsvy0e" }
      }
    };

    await gapi.client.calendar.events
      .patch({
        calendarId: calendarId,
        eventId: eid, // id + startdate.toISOString()
        resource: eventPatch,
        sendNotifications: true,
        conferenceDataVersion: 1
      })
      .execute(function(event) {
        console.log("Conference created for event: %s", event.htmlLink);
      });
  }

  request.execute(function(event) {
    var ISOstartdate = new Date(event.start.dateTime).toISOString();
    var eid =
      event.id + "_" + ISOstartdate.replace(/[:-]/g, "").replace(".000Z", "Z");
    var calendarId = event.creator.email;
    createMeet(calendarId, eid);
  });
