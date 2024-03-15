"use strict";
const tasksArr = [];
let maxTask = 10;
let userName = localStorage.getItem("name");
const addTaskButton = document.querySelector(".create-task-btn");
const addTaskEnter = document.querySelector(".task-input");
//modal window
const addModalCloseBtn = document.querySelector(".modal-close-btn");
const addModalName = document.querySelector(".modal-remember-btn");
//functions

const getModalWindow = () => {
  const modalWindowElem = document.querySelector(".modal-wrapper");
  const userExist = localStorage.getItem("name");
  if (!userExist) {
    modalWindowElem.style.display = "flex";
  } else {
    const newTitleName = document.querySelector(".title");
    newTitleName.textContent = `удачи, ${userExist}`;
  }
};
 
const getNameModal = () => {
  const input = document.querySelector(".modal-input");
  const newUser = input.value.trim();
  if (newUser.length <= 0) {
    input.style.border = "3px solid pink";
    shakeElement(input);
  } else {
    localStorage.setItem("name", newUser);
    getModalWindow();
    closeModalWindow();
  }
};

const closeModalWindow = () => {
  const modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.style.display = "none";
  console.log("close window");
};

const renderBoard = (task) => {
  const { text, done } = task;
  const board = document.querySelector(".list");
  const newTask = document.createElement("li");
  newTask.classList.add("list-task");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("list-task-checkbox");
  checkBox.checked = done;
  checkBox.addEventListener("click", () => {
    newTask.classList.toggle("list-task-done");
    newTask.classList.contains("list-task-done") ? maxTask++ : maxTask--;
  });
  newTask.append(text, checkBox);
  board.prepend(newTask);
};

const addTaskFunc = () => {
  const input = document.querySelector(".task-input");
  const newTaskText = input.value.trim();
  if (newTaskText === "") {
    alert("Введите задание");
    return;
  }
  if (tasksArr.length >= maxTask) {
    alert("На сегодня хватит :)");
    return;
  }
  const newTask = { text: newTaskText, done: false };
  tasksArr.unshift(newTask);
  renderBoard(newTask);
  input.value = null;
};
function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 300);
}

//eventlistners
addTaskButton.addEventListener("click", addTaskFunc);
addTaskEnter.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskFunc();
  }
});
addModalCloseBtn.addEventListener("click", closeModalWindow);
document.addEventListener("DOMContentLoaded", getModalWindow());
addModalName.addEventListener("click", getNameModal);
//promise
