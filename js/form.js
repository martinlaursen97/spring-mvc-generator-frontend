
const formSubmit = document.getElementById("modal-form");
formSubmit.addEventListener("submit", handleFormSubmit);


async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;


  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    alert(JSON.stringify(plainFormData));
  } catch (err) {
    alert(err);
  }
}
