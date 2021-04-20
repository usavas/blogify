let container = document.querySelector(".main-content .container");
let newItem = document.querySelector(".adder-container");
let add = document.querySelector(".add");
let addImg = document.querySelector(".add-img");

add.addEventListener("click", function () {
  createAdder();
});
add.click();

addImg.addEventListener("click", function (e) {
  createImageAdder();
});

function createAdder() {
  let adderContainer = document.createElement("div");
  adderContainer.classList.add("rich-text-container");

  let textarea = document.createElement("textarea");
  textarea.classList.add("rich-text");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("autocomplete", "off");
  textarea.setAttribute("placeholder", "Enter your content...");
  adderContainer.appendChild(textarea);
  $(function () {
    $("textarea").autoResize();
  });

  let select = document.createElement("select");
  select.classList.add("text-type");
  const textTypes = ["p", "h1", "h2", "h3", "h4"];
  textTypes.forEach((e) => {
    let option = document.createElement("option");
    option.value = e;
    option.innerText = e;
    select.appendChild(option);
  });
  select.addEventListener("change", function () {
    textTypes.forEach((t) => textarea.classList.remove("text-" + t));
    let type = select.options[select.selectedIndex].text;
    textarea.classList.add("text-" + type);
  });
  adderContainer.appendChild(select);

  let delButton = document.createElement("button");
  delButton.classList.add("del-button");
  delButton.innerText = "Del";
  delButton.addEventListener("click", function (e) {
    container.removeChild(adderContainer);
  });
  adderContainer.appendChild(delButton);

  container.insertBefore(adderContainer, newItem);
}

function createImageAdder() {
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  let img = document.createElement("img");
  img.classList.add("wide-img");
  img.src = "images/placeholder-img.png";
  imgContainer.appendChild(img);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  let delButton = document.createElement("button");
  delButton.classList.add("del-img");
  delButton.innerText = "DELETE";
  delButton.addEventListener("click", function (e) {
    container.removeChild(imgContainer);
  });
  overlay.appendChild(delButton);

  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.classList.add("file-input");
  fileInput.accept = "image/*,.pdf";
  fileInput.addEventListener("input", function (e) {
    console.log(fileInput.files[0]);
    img.src = fileInput.files[0].name;
  });
  overlay.appendChild(fileInput);

  imgContainer.appendChild(overlay);

  container.insertBefore(imgContainer, newItem);
}

let btnSave = document.querySelector(".save");
btnSave.addEventListener("click", function (e) {
  e.preventDefault();
  let elems = [];
  let pageHeader = document.querySelector(".header-container .rich-text");
  if (pageHeader.value.trim() !== "") {
    elems.push({
      textType: "h1",
      content: pageHeader.value.trim(),
    });
  }

  for (let i = 0; i < container.childNodes.length; i++) {
    let node = container.childNodes[i];
    if (
      node.classList !== undefined &&
      node.classList.contains("rich-text-container")
    ) {
      console.log(node);
      let content = node.querySelector("textarea:last-of-type").value;
      let textType = node.querySelector("select").value;

      if (content.trim() !== "") {
        elems.push({
          textType: textType,
          content: content,
        });
      }
    }
  }

  // TODO: post elements to save
  console.log(elems);
});
