const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    if (document.querySelector(".modal-title").innerText == "New entity") {

      await saveEntity(url, formData)
    } else {
      await saveVar(url, formData);
    }
  } catch (err) {
    alert(err);
  }
}

async function saveEntity(url, data) {
  let entity = {};
  entity.name = data.get("name");
  entity.namePlural = data.get("namePlural");
  entity.hasCreate = document.getElementById("hasCreate").checked;
  entity.hasRead = document.getElementById("hasRead").checked;
  entity.hasUpdate = document.getElementById("hasUpdate").checked;
  entity.hasDelete = document.getElementById("hasDelete").checked;

  let response = await postJson(url, entity);

  if (response.ok) {
    await loadEntitiesToSideNav();
  } else {
    alert("Failed to save: " + JSON.stringify(entity));
  }
}


async function saveVar(url, data) {
  let variable = {};
  variable.val1 = data.get("val1");
  variable.val2 = data.get("val2");
  variable.val3 = data.get("val3");
  variable.entityDetail = JSON.parse(localStorage.getItem("currentEntity"));

  let response = await postJson(url, variable);

  if (response.ok) {
    await setCurrentEntityById(variable.entityDetail.id);
    loadCurrentEntity();

  } else {
    alert("Failed to save: " + JSON.stringify(variable));
  }
}

async function postJson(url, data) {
  let fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };
  return await fetch(url, fetchOptions);
}

async function deleteEntity(url) {
  let fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(url, fetchOptions);

  if (response.ok) {
    let id = JSON.parse(localStorage.getItem("currentEntity")).id;
    await setCurrentEntityById(id);
    loadCurrentEntity();
  } else {
    alert("Error!");
  }
}

async function downloadProject() {
  let entities = await fetch("http://localhost:8080/api/entity-details").then(r => r.json());
  method = "POST";
  await postJson("http://localhost:8080/api/entity-details/export", entities);
}
