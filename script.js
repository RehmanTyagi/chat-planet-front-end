import { io } from "socket.io-client";
// window clsoe btn
document
  .querySelector(".app-close_btn")
  .addEventListener("click", () => window.close());

// create chats
const sendMsgBtn = document.querySelector(".send-btn");
const messageInputEl = document.querySelector(".message-input");
const chatBox = document.querySelector(".chat-box");
const typeBox = document.querySelector(".type-box");

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  displayMessage(`Your ID: ${socket.id}`);
});

socket.on("received-message", (msg, userName) => {
  displayMessage(`${socket.id != socket.id ? "You" : userName}: ${msg}`);
});

socket.on("msg-received-tone", () => {
  const aSound = document.createElement("audio");
  aSound.setAttribute("src", "assets/message-tone/received-tone.wav");
  aSound.play();
});

typeBox.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = messageInputEl.value;
  // state.push(message);
  if (message === "") return;
  messageInputEl.value = "";
  displayMessage(message);
  socket.emit("send-msg", message);
  const aSound = document.createElement("audio");
  aSound.setAttribute("src", "assets/message-tone/sent-tone.wav");
  aSound.play();
});

const displayMessage = function (message) {
  const messagecontainer = document.createElement("div");
  messagecontainer.innerHTML = message;
  messagecontainer.classList.add("user-chat");
  chatBox.insertAdjacentElement("beforeend", messagecontainer);

  const scrollHeight = chatBox.scrollHeight;
  chatBox.scrollTo(0, scrollHeight);
};
