class Toast {
  toastMessage(msg, type) {
    const div = document.createElement("div");
    div.textContent = msg;
    div.style.width = "fit-content";
    div.style.height = "auto";
    div.style.padding = "10px 16px";
    div.style.position = "fixed";
    div.style.top = "10px";
    div.style.right = "10px";
    div.style.background = type === "success" ? "#0078d4" : "#e8e8e8";
    div.style.borderRadius = "10px";
    div.style.border = "none";
    document.body.appendChild(div);
  
    setTimeout(() => {
      div.remove();
      window.location.reload();
    }, 2000);
  }
}

const toast = new Toast();

export default toast;