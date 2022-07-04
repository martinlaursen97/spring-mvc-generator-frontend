const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    // save
  } catch (err) {
    alert(err);
  }
}
