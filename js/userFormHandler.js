document.addEventListener("DOMContentLoaded", createFormEventListener);

function createFormEventListener() {
  let form = document.getElementById("login-form");
  form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const formEvent = event.currentTarget;
  const url = formEvent.action;

  try {
    const formData = new FormData(formEvent);
    if (formData.get("pw2") !== undefined && formData.get("pw2") !== null) {
      let pw1 = formData.get("pw1");
      let pw2 = formData.get("pw2");

      if (pw1 === pw2) {
        let user = {};
        user.email = formData.get("email");
        user.password = pw1;
        await postFormDataAsJson(url, user, false);
      } else {
        alert("Passwords did not match")
      }

    } else {
      const plainFormData = Object.fromEntries(formData.entries());
      await postFormDataAsJson(url, plainFormData, true);
    }

  } catch (err) {
  }
}

async function postFormDataAsJson(url, formData, isLogin) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  };

  const response = await fetch(url, fetchOptions);
  const user = await response.json();

  if (response.ok) {
    if (isLogin) {
      localStorage.setItem("userId", user.id);
      window.location.href = "projects.html";
    } else {
      window.location.href = "login.html";
    }
  }
}
