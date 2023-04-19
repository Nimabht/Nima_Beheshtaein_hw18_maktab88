$(() => {
  let polipop = new Polipop("newSection", {
    layout: "popups",
    insert: "before",
    pool: 5,
    life: 3000,
    progressbar: true,
  });
  $("form").submit(function (e) {
    e.preventDefault();
    const loginInfo = {
      username: $("#username-inp").val(),
      password: $("#password-inp").val(),
    };
    axios
      .post("/auth/login", loginInfo)
      .then((response) => {
        polipop.add({
          type: "success",
          title: "Success",
          content: "Login successfully!",
        });
        setTimeout(() => {
          window.location.href = `/dashboard`;
        }, 3000);
      })
      .catch((error) => {
        polipop.add({
          type: "error",
          title: "Error",
          content: error.response.data.message,
        });
      });
  });
});
