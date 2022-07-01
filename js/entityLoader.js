async function setCurrentEntityById(id) {
  let entity = await fetchEntityById(id).then(r => r.json());
  localStorage.setItem("currentEntity", JSON.stringify(entity));
}

async function fetchEntityById(id) {
  return await fetch("http://localhost:8080/api/entity-details/" + id);
}

onload = async function loadEntitiesToSideNav() {
  await setCurrentEntityById(JSON.parse(localStorage.getItem("currentEntity")).id);
  loadCurrentEntity()
  let entities = await fetch("http://localhost:8080/api/entity-details").then(r => r.json());

  let group = document.getElementById("entity-list");

  entities.forEach(e => {
    let aTag = document.createElement("a");
    aTag.classList.add("list-group-item");
    aTag.classList.add("list-group-item-action");
    aTag.classList.add("bg-light");
    aTag.id = "t";
    aTag.innerHTML = e.name;
    aTag.href = "#";
    aTag.addEventListener("click", async () => {
      await setCurrentEntityById(e.id);
      loadCurrentEntity();
    });
    group.appendChild(aTag);
  });

}

function loadCurrentEntity() {
  let entity = JSON.parse(localStorage.getItem("currentEntity"));
  let title = document.getElementById("page-entity-name");
  title.innerText = entity.name;

  // Variables
  let variableList = document.getElementById("variable-list");
  insertListItems(variableList, entity.variables, true);

  // Relations
  let relationList = document.getElementById("relationship-list");
  insertListItems(relationList, entity.relations, false);
}

function insertListItems(element, lst, isVariable) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }

  lst.forEach(v => {
    let li = document.createElement("li");
    li.classList.add("d-flex");

    let aTag = document.createElement("a");
    aTag.classList.add("list-group-item");
    aTag.classList.add("list-group-item-action");
    aTag.classList.add("bg-light");
    aTag.classList.add("my-auto");

    aTag.id = "t";
    aTag.innerHTML = "private ".fontcolor("#ef9e17") + v.val1 + " " + v.val2 + " > " + v.val3;
    aTag.href = "#";
    aTag.setAttribute("data-bs-toggle", "modal");
    aTag.setAttribute("data-bs-target", "#myModal");
    aTag.addEventListener("click", async () => {
      if (isVariable) {
        updateVariable(v);
      } else {
        await updateRelation(v);
      }
    });

    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-outline-danger");
    btn.classList.add("border-right")
    btn.style.width = "50px";
    btn.style.height;
    btn.innerText = "-";
    btn.addEventListener("click", async () => {
      let id = v.id;
      if (isVariable) {
        await deleteEntity("http://localhost:8080/api/variables/" + id);
      } else {
        await deleteEntity("http://localhost:8080/api/relations/" + id);
      }
    })

    li.appendChild(aTag);
    li.appendChild(btn);

    element.appendChild(li);
  });

}
