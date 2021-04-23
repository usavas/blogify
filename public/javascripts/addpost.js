let container = document.querySelector(".main-content .container");
let newItem = document.querySelector(".adder-container");
let add = document.querySelector(".add");
let addImg = document.querySelector(".add-img");

add.addEventListener("click", function () {
  createAdder();
});
add.click();

let imgFiles = [];
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
  const textTypes = ["p", "h2", "h3", "h4"];
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
  let fileId = generateGuid();

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
    imgFiles = imgFiles.filter((f) => f.id !== fileId);
    console.log("removed the file: " + fileId);
    console.log(imgFiles);
  });
  overlay.appendChild(delButton);

  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.classList.add("file-input");
  fileInput.accept = "image/*,.pdf";
  fileInput.addEventListener("input", function (e) {
    let reader = new FileReader();
    reader.onloadend = function (evt) {
      img.src = evt.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);

    let buffReader = new FileReader();
    buffReader.onloadend = function (evt) {
      let fileExt = getFileExtFromString(fileInput.files[0].name);
      let fileNewPath = `${fileId}.${fileExt}`;
      let imgWidth = getImageSize(sizeOptions.value);

      let dataString = JSON.stringify(
        Array.from(new Uint8Array(buffReader.result))
      );
      console.log(typeof dataString);

      imgFiles.push({
        id: fileId,
        filePath: fileNewPath,
        data: dataString,
        width: imgWidth,
      });

      console.log("added file: " + fileId);
    };
    buffReader.readAsArrayBuffer(fileInput.files[0]);
  });

  overlay.appendChild(fileInput);

  let sizeOptions = document.createElement("select");
  sizeOptions.classList.add("size-options");
  let sizes = ["sm", "md", "lg"];
  sizes.forEach((s) => {
    let sizeOption = document.createElement("option");
    sizeOption.value = s;
    sizeOption.innerText = s;
    if (s === "lg") {
      sizeOption.selected = true;
    }
    sizeOptions.appendChild(sizeOption);
  });

  sizeOptions.addEventListener("input", function (e) {
    let imgSize = getImageSize(sizeOptions.value);
    imgContainer.style.maxWidth = imgSize + "px";
    imgFiles.forEach((i) => {
      if (i.id === fileId) {
        i.width = imgSize;
      }
    });
  });
  overlay.appendChild(sizeOptions);

  imgContainer.appendChild(overlay);

  container.insertBefore(imgContainer, newItem);
}

function getImageSize(sizeString) {
  let imgSize = 920;
  switch (sizeString) {
    case "sm":
      imgSize = 400;
      break;
    case "md":
      imgSize = 720;
      break;
    case "lg":
      imgSize = 920;
      break;
    default:
      break;
  }
  return imgSize;
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

  let imgCounter = 0;

  for (let i = 0; i < container.childNodes.length; i++) {
    let node = container.childNodes[i];
    if (
      node.classList !== undefined &&
      node.classList.contains("rich-text-container")
    ) {
      let content = node.querySelector("textarea:last-of-type").value;
      let textType = node.querySelector("select").value;

      if (content.trim() !== "") {
        elems.push({
          textType: textType,
          content: content,
        });
      }
    } else if (
      node.classList !== undefined &&
      node.classList.contains("img-container")
    ) {
      if (imgFiles.length > 0) {
        elems.push({
          textType: "image",
          fileName: imgFiles[imgCounter].filePath,
          data: imgFiles[imgCounter].data,
          width: imgFiles[imgCounter].width,
        });
        imgCounter++;
      }
    }
  }

  postJson("/addpost", elems);
});

function postJson(path, jsonData) {
  let form = document.createElement("form");

  var xhr = new XMLHttpRequest();
  xhr.open("POST", path, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.send(JSON.stringify(jsonData));

  xhr.onloadend = function () {
    window.location.replace("/addpost");
  };
}

function generateGuid() {
  var result, i, j;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + "-";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
}

function getFileExtFromString(filename) {
  return (
    filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
    filename
  );
}
