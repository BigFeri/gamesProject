const contentBox = document.getElementById("contentBox");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");
const modalTitle2 = document.getElementById("modalTitle2");

class Game {
    constructor(
        Name = null,
        TypeID = null,
        CategoryID = null,
        Title = null,
    ) {
        this.Name = Name;
        this.TypeID = TypeID;
        this.CategoryID = CategoryID;
        this.Title = Title;
    }
}

let editableGame = new Game();
let state = "view";
let selectedGameId = null;

function getHome() {
    let htmlElement = `
      <div class="homeBg"></div>
      <span class="home-text">Master the Game, LEET the Score!</span>
  
    `;
    contentBox.innerHTML = htmlElement;
}
getHome()



async function getCards() {
    const url = "http://localhost:3000/games";
    const response = await fetch(url);
    const data = await response.json();
    const games = data.data;

    let htmlElement = `
    <div class="container-fluid">
        <div class="row">
    `;
    for (const game of games) {
        htmlElement += `
        <div class="col-md-3">
            <div class="my-card">
                <div class="my-content">
                    <h2>${game.Name}</h2>
                    <button
                    type="button"
                    class="btn pulseButton"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCard"
                    onclick="onClickCardButton(${game.id})" >
                    Részletek
                  </button>
                </div>
                <img src="img/${game.id}.png">
            </div>
        </div>
        `;
    }
    htmlElement += `
      </div>
    </div>
  
  `;
    contentBox.innerHTML = htmlElement;
}

async function getTable() {
    state = "view";
    const url = "http://localhost:3000/games";
    const response = await fetch(url);
    const data = await response.json();
    const games = data.data;

    let htmlElement = `
    <section class="intro">
    <div class="bg-image h-100">
      <div class="mask d-flex align-items-center h-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card" style="background-color: #f5f7fa;">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover table-borderless mb-0">
                      <thead>
                        <tr>
                          <th>
                              <button type="button" class="btn btn-outline-success btn-sm"
                                  data-bs-toggle="modal" data-bs-target="#modalCard"
                                  onclick="onClickNewButton()"
                              >
                                  Új Játék
                              </button>
                          </th>
                          <th scope="col">Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Category</th>
                          <th scope="col">DELETE/EDIT</th>
                          </tr>
                      </thead>
                      <tbody>
  
                      `;
    for (const game of games) {
        htmlElement += `
                        <tr>
                          <td class="tableHouseId">${game.id}</td>
                          <td>${game.Name}</td>
                          <td>${game.Type}</td>
                          <td>${game.Category}</td>
                          <td>
                            <button type="button" class="btn btn-danger btn-sm px-3" data-bs-toggle="modal" data-bs-target="#modalCard" onclick="onClickDeleteButton(${game.id})">
                              <i class="fas fa-times"></i>
                            </button>
                            <button type="button" class="btn btn-warning btn-sm px-3" data-bs-toggle="modal" data-bs-target="#modalCard" onclick="onClickEditButton(${game.id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                              </button>
                          </td>
                        </tr>
                        `;
    }
    htmlElement += `
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    `;
    contentBox.innerHTML = htmlElement;
}

async function onClickCardButton(id) {
    const url = `http://localhost:3000/games/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const game = data.data[0];
    let htmlElement = `
          <img src="./logo/${game.id}.png" class="logo-image centered-image" style="display: block; margin: 0 auto;" title="${game.Name}">
          <span class="imgLine"></span>
          <span class="centered-text mt-2">${game.Title}</span>
      `;
    modalContent.innerHTML = htmlElement;
    modalTitle.innerHTML = `${game.Name}`;
    modalTitle2.innerHTML = `${game.Category}`;
}

async function onClickNewButton() {
    state = "new";
    modalTitle.innerHTML = "Új játék felvétele";
    buttonShowHide("saveButton", true);
    const url = "http://localhost:3000/types";
    const response = await fetch(url);
    const data = await response.json();
    const types = data.data;

    const url2 = "http://localhost:3000/categories";
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    const categories = data2.data;

    let htmlElement = `
      <div class="col-12">
          <label for="Name" class="form-label">Játék neve</label>
          <input type="text" class="form-control" id="Name">
      </div>
  
      <div class="col-12 mt-3">
      <label for="Category" class="form-label">Kategória</label>
      <select class="form-select" aria-label="Default select example" id="Category">
      <option value="null">Nincs kiválasztva</option>
    `;
    for (const category of categories) {
        htmlElement += `<option value="${category.id}">${category.Name}</option>`;
    }
    htmlElement += `</select></div>`;

    htmlElement += `<div class="col-12 mt-3">
        <label for="Type" class="form-label">Típus</label>
        <select class="form-select" aria-label="Default select example" id="Type">
        <option value="null">Nincs kiválasztva</option>
      `;
    for (const type of types) {
        htmlElement += `<option value="${type.id}">${type.Name}</option>`;
    }
    htmlElement += `</select></div>`;

    htmlElement += `
    <div class="col-12">
        <label for="Title" class="form-label">Leírás</label>
        <input type="text" class="form-control" id="Title">
    </div>
    `
    modalContent.innerHTML = htmlElement;
}

async function onClickEditButton(id) {
    let url = "http://localhost:3000/types";
    let response = await fetch(url);
    let data = await response.json();
    const types = data.data;

    url = "http://localhost:3000/categories";
    response = await fetch(url);
    data = await response.json();
    const categories = data.data;

    state = "edit";
    modalTitle.innerHTML = "Ház módosítása";
    buttonShowHide("saveButton", true);

    let htmlElement = `
      <div class="col-12">
          <label for="Name" class="form-label">Játék neve</label>
          <input type="text" class="form-control" id="Name">
      </div>
  
      <div class="col-12 mt-3">
      <label for="Category" class="form-label">Kategória</label>
      <select class="form-select" aria-label="Default select example" id="Category">
      <option value="null">Nincs kiválasztva</option>
    `;
    for (const category of categories) {
        htmlElement += `<option value="${category.id}">${category.Name}</option>`;
    }
    htmlElement += `</select></div>`;

    htmlElement += `<div class="col-12 mt-3">
        <label for="Type" class="form-label">Típus</label>
        <select class="form-select" aria-label="Default select example" id="Type">
        <option value="null">Nincs kiválasztva</option>
      `;
    for (const type of types) {
        htmlElement += `<option value="${type.id}">${type.Name}</option>`;
    }
    htmlElement += `</select></div>`;

    htmlElement += `
    <div class="col-12">
        <label for="Title" class="form-label">Leírás</label>
        <input type="text" class="form-control" id="Title">
    </div>
    `
    modalContent.innerHTML = htmlElement;

    url = `http://localhost:3000/games/${id}`;
    response = await fetch(url);
    data = await response.json();
    const game = data.data[0];

    document.getElementById("Name").value = game.Name;
    document.getElementById("Type").value = game.typeID;
    document.getElementById("Category").value = game.categoryID;
    document.getElementById("Title").value = game.Title;
    selectedGameId = id;
}

async function onClickSaveButton() {
    buttonShowHide("saveButton", false);
    buttonShowHide("yesButton", false);

    editableGame.Name = document.getElementById("Name").value;
    editableGame.typeID = +document.getElementById("Type").value;
    editableGame.CategoryID = +document.getElementById("Category").value;
    editableGame.Title = document.getElementById("Title").value;

    if (state === "new") {
        const url = "http://localhost:3000/games";
        const body = JSON.stringify(editableGame);
        const config = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: body,
        };
        const response = await fetch(url, config);

    } else if (state === "edit") {
        const url = `http://localhost:3000/games/${selectedGameId}`;
        const body = JSON.stringify(editableGame);
        const config = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: body,
        };
        const response = await fetch(url, config);
    }
    getTable();
}

function onClickDeleteButton(id) {
    state = "delete";
    modalTitle.innerHTML = "Játék törlése";
    modalContent.innerHTML = "Valóban törölni akarod?";
    buttonShowHide("yesButton", true);
    selectedGameId = id;
}

async function onClickYesButton() {
    buttonShowHide("saveButton", false);
    buttonShowHide("yesButton", false);
    const config = {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    };

    const url = `http://localhost:3000/games/${selectedGameId}`;
    const response = await fetch(url, config);
    getTable();
}

function onClickCancelButton() {
    buttonShowHide("saveButton", false);
    buttonShowHide("yesButton", false);
}

function buttonShowHide(buttonId, ShowHide) {
    const button = document.getElementById(buttonId);
    if (ShowHide) {
        button.classList.remove("d-none");
    } else {
        button.classList.add("d-none");
    }
}