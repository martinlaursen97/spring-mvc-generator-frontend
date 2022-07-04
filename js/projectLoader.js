
onload = async function loadProjects() {
  let user = await fetch("http://localhost:8080/api/users/1").then(r => r.json());
  localStorage.setItem("user", JSON.stringify(user));

  let projects = user.projectList;

  let group = document.getElementById("projects-list");

  projects.forEach(p => {
    let div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("list-group-item-action");
    div.innerText = p.name;

    div.addEventListener("click", () => {
      localStorage.setItem("currentProjectId", JSON.stringify(p.id));
      localStorage.setItem("currentProject", JSON.stringify(p));
      window.location.href = "entities.html"
    })

    group.appendChild(div);

  })
}

async function update() {
  let user = await fetch("http://localhost:8080/api/users/1").then(r => r.json());
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}
