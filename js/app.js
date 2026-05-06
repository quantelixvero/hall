const students = [
  {
    id: 1,
    name: "Adib Rahman",
    room: "101",
    phone: "01700000001",
    email: "adib@gmail.com",
    img: "images/adib.jpg",
    fb: "https://facebook.com/",
    address: "Kaliganj, Dhaka",
    blood: "B+",
    hobby: "Coding, Reading",
    goal: "Software Engineer",
    bio: "Focused and disciplined student of Dhaka College. Interested in programming and problem solving.",
    result: { gpa: 5.0, physics: 95, chemistry: 93, math: 98 }
  },
  {
    id: 2,
    name: "Sakib Hasan",
    room: "101",
    phone: "01700000002",
    email: "sakib@gmail.com",
    img: "images/sakib.jpg",
    fb: "https://facebook.com/",
    address: "Narayanganj",
    blood: "A+",
    hobby: "Sports, Football",
    goal: "Engineer",
    bio: "Energetic student, active in sports and hostel activities.",
    result: { gpa: 4.8, physics: 90, chemistry: 88, math: 92 }
  },
  {
    id: 3,
    name: "Rahim Uddin",
    room: "102",
    phone: "01700000003",
    email: "rahim@gmail.com",
    img: "images/rahim.jpg",
    fb: "https://facebook.com/",
    address: "Cumilla",
    blood: "O+",
    hobby: "Debate, Writing",
    goal: "Civil Servant",
    bio: "Calm and organized student with interest in public speaking and current affairs.",
    result: { gpa: 4.92, physics: 91, chemistry: 92, math: 95 }
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    room: "102",
    phone: "01700000004",
    email: "tanvir@gmail.com",
    img: "images/tanvir.jpg",
    fb: "https://facebook.com/",
    address: "Gazipur",
    blood: "AB+",
    hobby: "Photography, Travel",
    goal: "Architect",
    bio: "Creative student who enjoys campus photography and design-focused projects.",
    result: { gpa: 4.75, physics: 87, chemistry: 89, math: 91 }
  },
  {
    id: 5,
    name: "Nayeem Islam",
    room: "103",
    phone: "01700000005",
    email: "nayeem@gmail.com",
    img: "images/nayeem.jpg",
    fb: "https://facebook.com/",
    address: "Mymensingh",
    blood: "A-",
    hobby: "Chess, Reading",
    goal: "Researcher",
    bio: "Patient learner with a strong routine and a love for analytical subjects.",
    result: { gpa: 4.88, physics: 88, chemistry: 94, math: 93 }
  },
  {
    id: 6,
    name: "Mahir Chowdhury",
    room: "103",
    phone: "01700000006",
    email: "mahir@gmail.com",
    img: "images/mahir.jpg",
    fb: "https://facebook.com/",
    address: "Sylhet",
    blood: "B-",
    hobby: "Music, Volunteering",
    goal: "Doctor",
    bio: "Helpful and steady student who balances academics with community work.",
    result: { gpa: 4.95, physics: 94, chemistry: 95, math: 90 }
  },
  {
    id: 7,
    name: "Fahim Hossain",
    room: "104",
    phone: "01700000007",
    email: "fahim@gmail.com",
    img: "images/fahim.jpg",
    fb: "https://facebook.com/",
    address: "Barishal",
    blood: "O-",
    hobby: "Cricket, Fitness",
    goal: "Data Analyst",
    bio: "Disciplined student who prefers structured study and team sports.",
    result: { gpa: 4.7, physics: 84, chemistry: 86, math: 94 }
  },
  {
    id: 8,
    name: "Rakib Mahmud",
    room: "104",
    phone: "01700000008",
    email: "rakib@gmail.com",
    img: "images/rakib.jpg",
    fb: "https://facebook.com/",
    address: "Tangail",
    blood: "AB-",
    hobby: "Robotics, Coding",
    goal: "Software Engineer",
    bio: "Curious and hands-on learner interested in robotics, code and practical projects.",
    result: { gpa: 4.98, physics: 96, chemistry: 90, math: 99 }
  }
];

const byId = (id) => document.getElementById(id);

function initNavbar() {
  const navbar = byId("navbar");
  if (!navbar) return;

  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

function initTheme() {
  const toggle = byId("toggle");
  const savedTheme = localStorage.getItem("dc-hostel-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dc-hostel-theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}

function studentMatches(student, query) {
  const value = `${student.name} ${student.room} ${student.phone} ${student.email} ${student.address} ${student.blood} ${student.goal}`.toLowerCase();
  return value.includes(query.toLowerCase().trim());
}

function renderStudentCards(list = students) {
  const grid = byId("studentGrid");
  if (!grid) return;

  const limit = Number(grid.dataset.limit || list.length);
  const visibleStudents = list.slice(0, limit);

  if (!visibleStudents.length) {
    grid.innerHTML = '<div class="empty-state">No student found.</div>';
    return;
  }

  grid.innerHTML = visibleStudents.map((student, index) => `
    <button class="student-card" type="button" data-student-id="${student.id}" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 280)}">
      <img src="${student.img}" alt="${student.name}" loading="lazy">
      <span class="student-body">
        <h3>${student.name}</h3>
        <p>Room ${student.room}</p>
        <span class="student-meta">
          <span class="pill">${student.blood}</span>
          <span class="pill">${student.goal}</span>
        </span>
      </span>
    </button>
  `).join("");
}

function initStudentSearch() {
  const search = byId("studentSearch");
  if (!search) return;

  search.addEventListener("input", () => {
    const filtered = students.filter((student) => studentMatches(student, search.value));
    renderStudentCards(filtered);
    refreshAos();
  });
}

function groupByRoom() {
  return students.reduce((rooms, student) => {
    rooms[student.room] = rooms[student.room] || [];
    rooms[student.room].push(student);
    return rooms;
  }, {});
}

function renderRoommates() {
  const grid = byId("roommateGrid");
  if (!grid) return;

  const rooms = Object.entries(groupByRoom());
  const limit = Number(grid.dataset.limit || rooms.length);
  const visibleRooms = rooms.slice(0, limit);

  grid.innerHTML = visibleRooms.map(([room, pair], index) => {
    const left = pair[0];
    const right = pair[1];

    return `
      <article class="room-pair" data-aos="fade-up" data-aos-delay="${index * 90}">
        ${renderRoomPerson(left, "fade-right")}
        <div class="room-number">Room<br>${room}</div>
        ${right ? renderRoomPerson(right, "fade-left") : '<div class="room-person empty">Empty Seat</div>'}
      </article>
    `;
  }).join("");
}

function renderRoomPerson(student, animation) {
  return `
    <button class="room-person" type="button" data-student-id="${student.id}" data-aos="${animation}">
      <img src="${student.img}" alt="${student.name}" loading="lazy">
      <strong>${student.name}</strong>
      <span>Room ${student.room}</span>
    </button>
  `;
}

function renderResults() {
  const table = byId("resultTable");
  if (!table) return;

  table.innerHTML = students.map((student) => `
    <tr>
      <td><button type="button" data-student-id="${student.id}">${student.name}</button></td>
      <td>${student.room}</td>
      <td>${student.result.gpa.toFixed(2)}</td>
      <td>${student.result.physics}</td>
      <td>${student.result.chemistry}</td>
      <td>${student.result.math}</td>
    </tr>
  `).join("");
}

function initStudentClicks() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-student-id]");
    if (!trigger) return;

    const student = students.find((item) => item.id === Number(trigger.dataset.studentId));
    if (student) openStudentModal(student);
  });
}

function openStudentModal(student) {
  const modal = byId("studentModal");
  const content = byId("modalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="profile">
      <img src="${student.img}" alt="${student.name}" loading="lazy">
      <div>
        <p class="eyebrow">Full Profile</p>
        <h2 id="modalName">${student.name}</h2>
        <p class="lead">Room ${student.room} &middot; ${student.goal}</p>

        <div class="profile-grid">
          <div class="profile-item"><span>Phone</span><strong>${student.phone}</strong></div>
          <div class="profile-item"><span>Email</span><strong>${student.email}</strong></div>
          <div class="profile-item"><span>Address</span><strong>${student.address}</strong></div>
          <div class="profile-item"><span>Blood Group</span><strong>${student.blood}</strong></div>
          <div class="profile-item"><span>Hobby</span><strong>${student.hobby}</strong></div>
          <div class="profile-item"><span>Goal</span><strong>${student.goal}</strong></div>
        </div>

        <h3>About</h3>
        <p>${student.bio}</p>

        <h3>Academic Result</h3>
        <div class="result-list">
          <div class="result-box">GPA ${student.result.gpa.toFixed(2)}</div>
          <div class="result-box">Physics ${student.result.physics}</div>
          <div class="result-box">Chemistry ${student.result.chemistry}</div>
          <div class="result-box">Math ${student.result.math}</div>
        </div>

        <a href="${student.fb}" target="_blank" rel="noopener">View Facebook Profile</a>
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeStudentModal() {
  const modal = byId("studentModal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModal() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
      closeStudentModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeStudentModal();
    }
  });
}

function refreshAos() {
  if (window.AOS) {
    window.AOS.refreshHard();
  }
}

function initAos() {
  if (!window.AOS) {
    document.querySelectorAll("[data-aos]").forEach((element) => {
      element.removeAttribute("data-aos");
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    return;
  }

  window.AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: "ease-out-cubic"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  renderStudentCards();
  renderRoommates();
  renderResults();
  initStudentSearch();
  initStudentClicks();
  initModal();
  initAos();
});
