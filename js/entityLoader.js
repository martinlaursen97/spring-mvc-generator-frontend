onload = async function loadEntities() {
  let project = JSON.parse(localStorage.getItem("currentProject"));

  let entities = project.entities;

  let group = document.getElementById("entity-list");

  loadCurrentEntity()

  clearGroup(group);

  entities.forEach(e => {
    let div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("list-group-item-action");
    div.innerHTML = e.name;

    div.addEventListener("click", async () => {
      localStorage.setItem("currentEntity", JSON.stringify(e));
      await loadCurrentEntity();
    });
    group.appendChild(div);
  });
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

