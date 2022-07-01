const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    await saveVar(url, formData);
  } catch (err) {
    alert(err);
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
