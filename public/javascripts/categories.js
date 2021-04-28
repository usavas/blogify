const container = document.querySelector(".main-content .container");
const btnEdits = document.querySelectorAll(".edit");
const btnDeletes = document.querySelectorAll(".delete");
const modal = document.querySelector(".modal");
const form = document.querySelector(".category-form");

const btnUpdate = document.querySelector(".update");
const btnAdd = document.querySelector("#add-category");

const inputs = document.querySelectorAll("input[type=text]");
inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    input.select();
  });
});

// ADD REQUEST
btnAdd.addEventListener("click", function () {
  // add new category via ajax
  // update the UI (add new tr with the ajax response)
  const catName = document.querySelector("#add-category-name");
  const catDesc = document.querySelector("#add-category-description");

  let category = {
    category: catName.value.trim(),
    description: catDesc.value.trim(),
  };

  if (!category.category) {
    return;
  }

  fetch("/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
});

// UPDATE REQUEST
const updateCategoryName = document.querySelector("#update-category-name");
const updateCategoryDescription = document.querySelector(
  "#update-category-description"
);
const updateCategoryId = document.querySelector("#update-category-id");

btnEdits.forEach((btnEdit) => {
  btnEdit.addEventListener("click", function () {
    const category = JSON.parse(btnEdit.dataset.category);

    updateCategoryName.value = category.category;
    updateCategoryDescription.value = category.description;
    updateCategoryId.value = category._id;
    form.style.visibility = "visible";
  });
});

btnUpdate.addEventListener("click", function () {
  const categoryName = updateCategoryName.value.trim();
  const categoryDescription = updateCategoryDescription.value.trim();
  const categoryId = updateCategoryId.value;

  updateCategoryName.value = updateCategoryDescription.value = updateCategoryId.value =
    "";

  fetch("/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _id: categoryId,
      category: categoryName,
      description: categoryDescription,
    }),
  });
});

btnDeletes.forEach((btnDelete) => {
  btnDelete.addEventListener("click", function () {
    // delete
    const id = btnDelete.dataset.categoryId;

    fetch("/categories/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        btnDelete.parentNode.parentNode.parentNode.removeChild(
          btnDelete.parentNode.parentNode
        );
      });
  });
});
