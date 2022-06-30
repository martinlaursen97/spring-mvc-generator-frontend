
const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);


async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  try {
    const formData = new FormData(form);
    await saveVar("http://localhost:8080/api/vector3s", formData);
  } catch (err) {
    alert(err);
  }
}


async function saveVar(url, data) {
  let variable = {};
  variable.var1 = data.get("var1");
  variable.var2 = data.get("var2");
  variable.var3 = data.get("var3");

  let entityDetail = {};


  let response = await postJson(url, data);

  if (response.ok) {
    let entities = JSON.parse(localStorage.getItem("entities"));
    entities.push(data);
    localStorage.setItem("entities", entities);
  } else {
    alert("Failed to save: " + JSON.stringify(data));
  }
}

async function postJson(url, data) {
  let fetchOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };
  let response = await fetch(url, fetchOptions);

  if (response.ok) {

  } else {
    alert("error");
  }
}
