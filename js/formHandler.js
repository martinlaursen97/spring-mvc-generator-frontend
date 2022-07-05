const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    let data;

    let projectId = JSON.parse(localStorage.getItem("currentProject")).id;
    let entityId = JSON.parse(localStorage.getItem("currentEntity")).id;
    let userId = JSON.parse(localStorage.getItem("user")).id;


    if (type === "entity") {
      data = toEntity(plainFormData, projectId);

    }
    else if (type === "variable") {
      data = toVariable(plainFormData, entityId);
    }
    else if (type === "relation") {
      data = toRelation(plainFormData, entityId);
    }
    else if (type === "project") {
      data = toProject(plainFormData, userId);
    }

    await sendJson(url, data);
  } catch (err) {
    alert(err);
  }
}

async function sendJson(url, data) {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  let response = await fetch(url, fetchOptions);

  if (response.ok) {
    await setup();
  }
}

async function deleteByUrl(url) {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
  };

  let response = await fetch(url, fetchOptions);

  if (response.ok) {
    localStorage.setItem("currentEntity", "{}");
    await setup();
    loadCurrentEntity()
  }
}

function toEntity(data, id) {
  let project = {}
  project.id = id;

  let entity = {};
  entity.name = data.name;
  entity.project = project;
  entity.hasCreate = document.getElementById("hasCreate").checked;
  entity.hasReadAll = document.getElementById("hasReadAll").checked;
  entity.hasRead = document.getElementById("hasRead").checked;
  entity.hasUpdate = document.getElementById("hasUpdate").checked;
  entity.hasDelete = document.getElementById("hasDelete").checked;

  return entity;
}

function toVariable(data, id) {
  let entity = {};
  entity.id = id;

  let variable = {};
  variable.name = data.name;
  variable.dataType = data.dataType;
  variable.columnName = data.columnName;
  variable.entity = entity;

  return variable;
}

function toRelation(data, id) {
  let entity = {};
  entity.id = id;

  let relation = {};
  relation.annotation = data.annotation;
  relation.relatedTo = data.relatedTo;
  relation.entity = entity;

  return relation;
}

function toProject(data, user) {

}
