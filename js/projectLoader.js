onload = loadProjects();

async function loadProjects() {
  let userId = JSON.parse(localStorage.getItem("userId"));
  let user = await fetch("http://localhost:8080/api/users/" + userId).then(r => r.json());

  localStorage.setItem("user", JSON.stringify(user));

  let projects = user.projectList;

  let group = document.getElementById("projects-list");
  clearGroup(group);

  projects.forEach(p => {
    let div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("list-group-item-action");
    div.innerText = p.name;

    div.addEventListener("click", () => {
      localStorage.setItem("currentProjectId", JSON.stringify(p.id));
      localStorage.setItem("currentProject", JSON.stringify(p));
      localStorage.setItem("currentEntity", "{}")
      window.location.href = "entities.html"
    })

    group.appendChild(div);

  })
}
