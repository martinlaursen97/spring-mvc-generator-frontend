let title = document.querySelector(".modal-title")
let inputField = document.getElementById("field");

function setTitle(str) {
  title.innerHTML = str;
}

function createVariable(str) {
  clearModal();
  setTitle(str);

  createInput("Data type","a","var1","text","");
  createInput("Variable name","b","var2","text","");
  createInput("Column name","c","var3","text","");
}

function createRelation(str) {
  let relations = ["ManyToOne", "OneToMany", "OneToOne"];
  let entities = ["City", "Person"];

  clearModal();
  setTitle(str);

  createInput("var1","a","var1","text","");
  createDropdownInput(relations, "Relation", "var2");
  createDropdownInput(entities, "Entity", "var3");
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
    let option = lst[i];
    select.add(new Option(option, String(i)));
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
