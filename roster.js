// roster.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPEpoiMCgELVnRCLPYhpgMSpQeQLKMLA4",
  authDomain: "coach-castro-rueda.firebaseapp.com",
  projectId: "coach-castro-rueda",
  storageBucket: "coach-castro-rueda.appspot.com",
  messagingSenderId: "685578915022",
  appId: "1:685578915022:web:64820ead8ed4a31b17149f",
  measurementId: "G-Y86PFCV9TE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rosterBody = document.getElementById("roster-body");

function createNotesCell(notes) {
  const td = document.createElement("td");
  td.className = "notes-cell";
  td.innerHTML = `
    <div class="note-bubble">
      <span class="note-preview">${notes.slice(0, 15)}${notes.length > 15 ? '...' : ''}</span>
      <div class="note-full">${notes}</div>
    </div>
  `;
  return td;
}

function renderRoster(players) {
  rosterBody.innerHTML = "";
  players.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.number}</td>
      <td>${player.position}</td>
      <td>${player.agility}</td>
      <td>${player.speed}</td>
      <td>${player.passingL}</td>
      <td>${player.passingR}</td>
      <td>${player.dribbling}</td>
      <td>${player.shootingL}</td>
      <td>${player.shootingR}</td>
      <td>${player.soccerIQ}</td>
      <td>${player.attendance}</td>
    `;
    row.appendChild(createNotesCell(player.notes || ""));
    rosterBody.appendChild(row);
  });
}

async function loadRoster() {
  const querySnapshot = await getDocs(collection(db, "coach-castro-rueda"));
  const seen = new Set();
  const players = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();
    const key = `${data.name}-${data.number}`;
    if (!seen.has(key)) {
      seen.add(key);
      players.push({
        name: data.name || "",
        number: data.number || "",
        position: data.position || "",
        agility: data.agility || "",
        speed: data.speed || "",
        passingL: data.passingL || "",
        passingR: data.passingR || "",
        dribbling: data.dribbling || "",
        shootingL: data.shootingL || "",
        shootingR: data.shootingR || "",
        soccerIQ: data.soccerIQ || "",
        attendance: data.attendance || "",
        notes: data.notes || ""
      });
    }
  });

  players.sort((a, b) => parseInt(a.number) - parseInt(b.number));
  renderRoster(players);
}

loadRoster();
