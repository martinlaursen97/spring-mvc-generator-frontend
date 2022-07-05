async function setCurrentEntityById(id) {
  let entity = await fetchEntityById(id).then(r => r.json());
  localStorage.setItem("currentEntity", JSON.stringify(entity));
}

async function fetchEntityById(id) {
  return await fetch("http://localhost:8080/api/entities/" + id);
}

async function fetchProjectById(id) {
  return await fetch("http://localhost:8080/api/projects/" + id).then(r => r.json());
}

onload = setup();

async function setup() {
  await loadEntities();

  let currentEntity = JSON.parse(localStorage.getItem("currentEntity"));
  let id = currentEntity.id;


  let projectId = localStorage.getItem("currentProjectId");
  localStorage.setItem("currentProject", JSON.stringify(await fetchProjectById(projectId)));



  if (id === undefined) {
    let group = document.getElementById("entity-list");
    id = group.firstElementChild.getAttribute("value");
  }

  await setCurrentEntityById(id);
  loadCurrentEntity()

}

async function loadEntities() {
  let group = document.getElementById("entity-list");

  clearGroup(group);

  let entities = await fetch("http://localhost:8080/api/entities").then(r => r.json());

  entities.forEach(e => {
    let div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("list-group-item-action");
    div.innerHTML = e.name;
    div.setAttribute("value", e.id);

    div.addEventListener("click", async () => {
      localStorage.setItem("currentEntity", JSON.stringify(e));
      loadCurrentEntity();
    });
    group.appendChild(div);
  });

  let entityList = document.getElementById("entity-list");
  let content = document.getElementById("content");
  if (entityList.childElementCount === 0) {
    content.style.display = "none";
  } else {
    content.style.display = "";
  }
}

function loadCurrentEntity() {
  let entity = JSON.parse(localStorage.getItem("currentEntity"));
  let title = document.getElementById("page-entity-name");
  title.innerText = entity.name;

  let variableList = document.getElementById("variable-list");
  let variables = entity.variables;

  clearGroup(variableList);

  variables.forEach(v => {
    let div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("list-group-item-action");

    div.innerHTML = "private " +  v.dataType + " " + v.name;
    div.setAttribute("data-bs-toggle", "modal");
    div.setAttribute("data-bs-target", "#myModal");

    div.addEventListener("click", async () => {
      updateVariable(v);
    });

    variableList.appendChild(div);
  })


  let relationList = document.getElementById("relationship-list");
  let relations = entity.relations;

  clearGroup(relationList);

  relations.forEach(r => {
    let div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("list-group-item-action");

    div.innerHTML = r.annotation + " " + r.relatedTo;
    div.setAttribute("data-bs-toggle", "modal");
    div.setAttribute("data-bs-target", "#myModal");

    div.addEventListener("click", async () => {
      await updateRelation(r);
    });

    relationList.appendChild(div);
  })
}

function clearGroup(group) {
  while (group.hasChildNodes()) {
    group.removeChild(group.firstChild);
  }
}

