const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    await sendJson(url, plainFormData);
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
}
