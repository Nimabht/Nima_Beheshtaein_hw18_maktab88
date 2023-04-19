$(() => {
  $("form").submit(function (e) {
    e.preventDefault();
    const fields = {
      firstname: $("#firstname-inp").val(),
      lastname: $("#lastname-inp").val(),
      username: $("#username-inp").val(),
      password: $("#password-inp").val(),
      repeat_password: $("#repeat-password-inp").val(),
    };
    if (!!$("#gender-inp").val())
      fields.gender = $("#gender-inp").val();
    if (!!$("#role-inp").val()) fields.role = $("#role-inp").val();

    const newUser = fields;
    console.log(newUser);
    let polipop = new Polipop("newSection", {
      layout: "popups",
      insert: "before",
      pool: 5,
      life: 3000,
      progressbar: true,
    });
    axios
      .post("/api/user", newUser)
      .then((response) => {
        polipop.add({
          type: "success",
          title: "Success",
          content: "Created successfully!",
        });
        setTimeout(() => {
          window.location.href = `/login`;
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
