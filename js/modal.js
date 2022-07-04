let title = document.querySelector(".modal-title")
let inputField = document.getElementById("field");

let method;
let type;
let form = document.getElementById("modal-form");

function createEntity(str) {
  clearModal();
  setTitle(str);
  setType("entity");
  setMethod("POST");
  setFormDestination("http://localhost:8080/api/entity-details")

  createInput("Name","a","name","text","", true);
  createInlineCheckBoxInput("Create", "hasCreate");
  createInlineCheckBoxInput("ReadAll", "hasReadAll");
  createInlineCheckBoxInput("Read", "hasRead");
  createInlineCheckBoxInput("Update", "hasUpdate");
  createInlineCheckBoxInput("Delete", "hasDelete");
}

function createVariable(str) {
  clearModal();
  setTitle(str);
  setMethod("POST");
  setType("variable");
  setFormDestination("http://localhost:8080/api/variables")

  createInput("Data type","","dataType","text","", true);
  createInput("Variable name","","name","text","", true);
  createInput("Column name","","columnName","text","", true);
}

function updateVariable(variable) {
  clearModal();
  setTitle("Update variable");
  setMethod("PUT");
  setType("variable");
  setFormDestination("http://localhost:8080/api/variables/" + variable.id)

  createInput("Data type","","dataType","text", variable.dataType, true);
  createInput("Variable name","","name","text", variable.name, true);
  createInput("Column name","","columnName","text", variable.columnName, true);
}

async function createRelation(str) {
  let relations = ["ManyToOne", "OneToMany", "OneToOne"];
  let entities = JSON.parse(localStorage.getItem("currentProject")).entities;

  clearModal();
  setTitle(str);
  setMethod("POST");
  setType("relation");
  setFormDestination("http://localhost:8080/api/relations")

  createDropdownInput(relations, "Annotation", "annotation");
  createDropdownInput(entities, "Entity", "relatedTo");
}

async function createProject() {
  clearModal();

  setTitle("New project");
  setMethod("POST");
  setType("project");
  setFormDestination("http://localhost:8080/api/projects")

  createInput("Name", "spring-mvc-generator", "name", "text", "", true);

}


//


function setFormDestination(action) {
  form.setAttribute("action", action);
  form.setAttribute("method", method);
}

function setMethod(m) {
  method = m;
}

function setTitle(str) {
  title.innerText = str;
}

function setType(t) {
  type = t;
}


// Modal build functions ---->


function createInput(inputName, placeHolder, idName, type, value, isRequired) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");
  inputGroup.classList.add("mb-3");

  const input = document.createElement("input");
  input.id = idName;
  input.name = idName;
  input.type = type;
  input.placeholder = placeHolder;

  if (isRequired) {
    input.setAttribute("required", "");
  }

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

  let title = document.getElementById("page-entity-name").innerText;
  lst = lst.filter(e => e.name != title);

  for (let i = 0; i < lst.length; i++) {

    let option;
    if (lst[i].name == undefined) {
      option = lst[i];
    } else {
      option = lst[i].name;
    }

    select.add(new Option(option, option));
    if (selectName !== undefined) {
      if (selectName === option) {
        select.selectedIndex = i;
      }
    }
  }

  inputGroup.appendChild(label);
  inputGroup.appendChild(select);
  inputField.appendChild(inputGroup);
}

function createInlineCheckBoxInput(inputName, idName, checked) {
  let div = document.createElement("div");
  div.classList.add("form-check");
  div.classList.add("form-check-inline");

  let input = document.createElement("input");
  input.classList.add("form-check-input");
  input.type = "checkbox";
  input.id = idName;
  if (checked !== undefined) {
    input.checked = checked;
  } else {
    input.checked = true;
  }

  let label = document.createElement("label");
  label.classList.add("form-check-label");
  label.setAttribute("for", idName);
  label.innerText = inputName;

  div.appendChild(input);
  div.appendChild(label);

  inputField.appendChild(div);
}

function clearModal() {
  while (inputField.hasChildNodes()) {
    inputField.removeChild(inputField.firstChild);
  }
}
