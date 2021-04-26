const editBtns = document.querySelectorAll(".edit");
const deleteBtns = document.querySelectorAll(".delete");

editBtns.forEach((e) => {
  e.addEventListener("click", function (evt) {
    console.log(evt.target.dataset.id);

    // window.location.replace("/addpost:" + evt.target.dataset.id);
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", "/addpost", true);
    // xhr.send();
    // xhr.onloadend = function () {
    //   console.log("ended ajax req");
    // };
  });
});
