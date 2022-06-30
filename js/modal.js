let title = document.querySelector(".modal-title")
let inputField = document.getElementById("field");

let method;
let form = document.getElementById("modal-form");

function setTitle(str) {
  title.innerHTML = str;
}

function createVariable(str) {
  clearModal();
  setTitle(str);
  setFormDestination("http://localhost:8080/api/variables")
  setMethod("POST");

  createInput("Data type","a","val1","text","");
  createInput("Variable name","b","val2","text","");
  createInput("Column name","c","val3","text","");
}

async function createRelation(str) {
  let relations = ["ManyToOne", "OneToMany", "OneToOne"];
  let entities = await fetch("http://localhost:8080/api/entity-details").then(r => r.json());

  clearModal();
  setTitle(str);
  setFormDestination("http://localhost:8080/api/relations")
  setMethod("POST");

  createDropdownInput(relations, "Relation", "val1");
  createInput("Name", "a", "val2", "text", "");
  createDropdownInput(entities, "Entity", "val3");
}

function setFormDestination(action) {
  form.setAttribute("action", action);
  form.setAttribute("method", method);
}

function setMethod(m) {
  form.setAttribute("method", m);
}

function createInput(inputName, placeHolder, idName, type, value) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");
  inputGroup.classList.add("mb-3");

  const input = document.createElement("input");
  input.id = idName;
  input.name = idName;
  input.type = type;
  input.placeholder = placeHolder;
  input.setAttribute("required", "");

  if (value !== undefined) {
    input.value = value;
  }

  input.classList.add("form-control");
  input.setAttribute("aria-label", "Small");
  input.setAttribute("aria-describedby", "inputGroup-sizing-sm");

  const span = document.createElement("span");
  span.innerText = inputName;
  span.classList.add("input-group-text");

  inputGroup.appendChild(span);
  inputGroup.appendChild(input);
  inputField.appendChild(inputGroup)
}

function createDropdownInput(lst, inputName, idName, selectName) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");
  inputGroup.classList.add("mb-3");

  const label = document.createElement("label");
  label.classList.add("input-group-text");
  label.setAttribute("for", idName);
  label.innerText = inputName;

  const select = document.createElement("select");
  select.classList.add("form-select")
  select.id = idName;
  select.setAttribute("aria-label", "Small");
  select.setAttribute("aria-describedby", "inputGroup-sizing-sm");
  select.name = idName;

  for (let i = 0; i < lst.length; i++) {
    let option;
    if (lst[i].name == undefined) {
      option = lst[i];
    } else {
      option = lst[i].name;
    }

    select.add(new Option(option, option));
    //if (selectName !== undefined) {
    //  if (selectName === option) {
    //    select.selectedIndex = i;
    //  }
    //}
  }

  inputGroup.appendChild(label);
  inputGroup.appendChild(select);
  inputField.appendChild(inputGroup);
}

function clearModal() {
  while (inputField.hasChildNodes()) {
    inputField.removeChild(inputField.firstChild);
  }
}
