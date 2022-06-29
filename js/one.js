//const btn = document.getElementById("btn");
//btn.addEventListener("click", async () => {
//  let entityDetails = [];
//
//  let entityDetail = {};
//  entityDetail.entityName = "Person";
//  entityDetail.entityNamePlural = "People";
//
//  let relations = [];
//  let relation1 = {};
//  relation1.val1 = "ManyToOne";
//  relation1.val2 = "City";
//  relation1.val3 = "";
//  relations.push(relation1);
//
//  let relation2 = {};
//  relation2.val1 = "OneToMany";
//  relation2.val2 = "Friend";
//  relation2.val3 = "Friends";
//  relations.push(relation2);
//
//  entityDetail.relations = relations;
//
//  let variables = [];
//  let var1 = {};
//  var1.val1 = "Integer";
//  var1.val2 = "ageLimit";
//  var1.val3 = "age_limit";
//  variables.push(var1);
//
//  entityDetail.variables = variables;
//
//  entityDetail.hasCreate = true;
//  entityDetail.hasRead = true;
//  entityDetail.hasUpdate = true;
//  entityDetail.hasDelete = false;
//
//  entityDetails.push(entityDetail)
//
//
//  await postJson("http://localhost:8080/api/entity-details/export", JSON.stringify(entityDetails));
//
//
//})
//
//async function postJson(url, json) {
//  let fetchOptions = {
//    method: "post",
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: json
//  };
//  let response = await fetch(url, fetchOptions);
//
//  if (response.ok) {
//    location.reload();
//  }
//}
//
//var myModal = document.getElementById('myModal')
//var myInput = document.getElementById('myInput')
//
//myModal.addEventListener('shown.bs.modal', function () {
//  myInput.focus()
//})
//
