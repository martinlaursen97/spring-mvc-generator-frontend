async function setCurrentEntityById(id) {
  let entity = await fetchEntityById(id).then(r => r.json());

  localStorage.setItem("currentEntity", JSON.stringify(entity));
}

async function fetchEntityById(id) {
  return await fetch("http://localhost:8080/api/entity-details/" + id);
}

onload = async function loadEntitiesToSideNav() {
  loadCurrentEntity();
  let entities = await fetch("http://localhost:8080/api/entity-details/").then(r => r.json());

  let group = document.getElementById("entity-list");

  entities.forEach(e => {
    let aTag = document.createElement("a");
    aTag.classList.add("list-group-item");
    aTag.classList.add("list-group-item-action");
    aTag.classList.add("bg-light");
    aTag.id = "t";
    aTag.innerHTML = e.entityName;
    aTag.href = "#";
    aTag.addEventListener("click", () => {
      setCurrentEntityById(e.id);
      loadCurrentEntity();
    });
    group.appendChild(aTag);
  })

}

function loadCurrentEntity() {
  let entity = JSON.parse(localStorage.getItem("currentEntity"));
  let title = document.getElementById("page-entity-name");
  title.innerText = entity.entityName;

}
