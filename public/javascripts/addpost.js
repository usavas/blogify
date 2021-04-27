const container = document.querySelector(".main-content .container");
const newItem = document.querySelector(".adder-container");
const add = document.querySelector(".add");
const addImg = document.querySelector(".add-img");

const postData = document.querySelector(".post-edit");
if (postData) {
  console.log("EXISTS");
  //XHR request to get post details
  // then iterate through its body elements

  const postId = postData.dataset.id;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/postinfo/${postId}`, true);
  xhr.send("");
  xhr.onloadend = function () {
    const post = xhr.response;
    console.log(post);
    renderPost(post);
  };
} else {
  console.log("NOT EXISTS");
}

function renderPost(post) {
  const postObj = JSON.parse(post);
  //set title
  const pageTitle = document.querySelector(".text-h1");
  pageTitle.value = postObj.title;
  postObj.body.forEach((e) => {
    if (e.textType === "image") {
      createImageAdder(`/${e.content}`);
    } else {
      createAdder(e.textType, e.content);
    }
  });
}

add.addEventListener("click", function () {
  createAdder();
});
if (!postData) {
  add.click();
}

let imgFiles = [];
addImg.addEventListener("click", function () {
  createImageAdder();
});

let categoryOptions = document.querySelector(".categories");
let selectedCategoryId = categoryOptions.value;

categoryOptions.addEventListener("change", function () {
  console.log(categoryOptions.value);
  selectedCategoryId = categoryOptions.value;
});

function createAdder(pTextType, pContent) {
  let adderContainer = document.createElement("div");
  adderContainer.classList.add("rich-text-container");

  let textarea = document.createElement("textarea");
  textarea.classList.add("rich-text");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("autocomplete", "off");
  textarea.setAttribute("placeholder", "Enter your content...");
  if (pContent) {
    textarea.value = pContent;
  }
  adderContainer.appendChild(textarea);
  // eslint-disable-next-line no-undef
  $(function () {
    // eslint-disable-next-line no-undef
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
  if (pTextType) {
    select.value = pTextType;
  }
  adderContainer.appendChild(select);

  let delButton = document.createElement("button");
  delButton.classList.add("del-button");
  delButton.innerText = "Del";
  delButton.addEventListener("click", function () {
    container.removeChild(adderContainer);
  });
  adderContainer.appendChild(delButton);

  container.insertBefore(adderContainer, newItem);
}

function createImageAdder(path) {
  let fileId = generateGuid();

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  let imagePath = "/images/placeholder-img.png";
  if (path) {
    imagePath = path;
  }
  let img = createImage(imagePath);
  imgContainer.appendChild(img);

  let overlay = createOverlay(imgContainer, fileId, img);
  imgContainer.appendChild(overlay);

  container.insertBefore(imgContainer, newItem);
}

function createImage(imagePath) {
  let img = document.createElement("img");
  img.classList.add("wide-img");
  img.src = imagePath;
  return img;
}

function createOverlay(imgContainer, fileId, img) {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  let delButton = createDelButton(imgContainer, fileId);
  overlay.appendChild(delButton);

  let sizeOptionsContainer = createSizeOptionsContainer();
  let sizeOptions = createSizeOptions(imgContainer, fileId);
  sizeOptionsContainer.appendChild(sizeOptions);

  let fileInput = createFileInput(img, fileId, sizeOptions);
  overlay.appendChild(fileInput);

  overlay.appendChild(sizeOptionsContainer);

  return overlay;
}

function createDelButton(imgContainer, fileId) {
  let delButton = document.createElement("button");
  delButton.classList.add("del-img");
  delButton.innerText = "DELETE";
  delButton.addEventListener("click", function () {
    container.removeChild(imgContainer);
    imgFiles = imgFiles.filter((f) => f.id !== fileId);
    console.log("removed the file: " + fileId);
    console.log(imgFiles);
  });

  return delButton;
}

function createFileInput(img, fileId, sizeOptions) {
  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.classList.add("file-input");
  fileInput.innerText = "Choose file";
  fileInput.accept = "image/*,.pdf";
  fileInput.addEventListener("input", function () {
    let reader = new FileReader();
    reader.onloadend = function (evt) {
      img.src = evt.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);

    let buffReader = new FileReader();
    buffReader.onloadend = function () {
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
  return fileInput;
}

function createSizeOptionsContainer() {
  let sizeOptionsContainer = document.createElement("div");
  sizeOptionsContainer.classList.add("size-options-container");

  let sizeDesc = document.createElement("label");
  sizeDesc.classList.add("size-option-desc");
  sizeDesc.innerText = "Img size:";

  sizeOptionsContainer.appendChild(sizeDesc);

  return sizeOptionsContainer;
}

function createSizeOptions(imgContainer, fileId) {
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

  sizeOptions.addEventListener("input", function () {
    let imgSize = getImageSize(sizeOptions.value);
    imgContainer.style.maxWidth = imgSize + "px";
    imgFiles.forEach((i) => {
      if (i.id === fileId) {
        i.width = imgSize;
      }
    });
  });

  return sizeOptions;
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
let postTitle = "No title";
btnSave.addEventListener("click", function (e) {
  e.preventDefault();
  let elems = [];
  let pageHeader = document.querySelector(".header-container .rich-text");
  if (pageHeader.value.trim() !== "") {
    postTitle = pageHeader.value.trim();
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
        console.log("image length: " + imgFiles[imgCounter].data.length);
        elems.push({
          textType: "image",
          content: imgFiles[imgCounter].filePath,
          data: imgFiles[imgCounter].data,
          width: imgFiles[imgCounter].width,
        });
        imgCounter++;
      }
    }
  }

  let post = {
    title: postTitle,
    categoryId: selectedCategoryId,
    elems: elems,
  };

  postJson("/addpost", post);
});

function postJson(path, jsonData) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", path, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.send(JSON.stringify(jsonData));

  xhr.onloadend = function () {
    window.location.replace("/");
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
