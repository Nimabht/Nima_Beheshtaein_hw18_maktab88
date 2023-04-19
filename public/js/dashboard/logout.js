let polipop = new Polipop("newSection", {
  layout: "popups",
  insert: "before",
  pool: 5,
  life: 3000,
  progressbar: true,
});
$("#logout-btn").on("click", () => {
  axios
    .get("/auth/logout")
    .then((response) => {
      polipop.add({
        type: "success",
        title: "Success",
        content: "Logout successfully!",
      });
      setTimeout(() => {
        window.location.href = `/login`;
      }, 3000);
    })
    .catch((error) => {
      polipop.add({
        type: "error",
        title: "Error",
        content: "Something went wrong!!!",
      });
    });
});
