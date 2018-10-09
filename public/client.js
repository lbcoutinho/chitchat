function renderMessage(data) {
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = data.message;
  document.querySelector("#messages").appendChild(div);
}

window.onload = () => {
  console.log("Start...");
  const socket = io("http://localhost:3000");

  // Render existing messages
  socket.on("previousMessages", messages => {
    for (message of messages) {
      renderMessage(message);
    }
  });

  // Send new messages to server
  document.querySelector("#chat-form").addEventListener("submit", event => {
    event.preventDefault();

    const msg = document.querySelector("#message").value;
    if (msg) {
      const msgObject = { message: msg };
      renderMessage(msgObject);
      socket.emit("sendMessage", msgObject);
    }
  });

  // Receive new message from server
  socket.on("receivedMessage", data => {
    renderMessage(data);
  });
};
