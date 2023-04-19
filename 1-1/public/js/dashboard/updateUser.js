const updateUser = async (id) => {
  let updatedUser = {
    firstname: $("#firstname-edit-inp").val(),
    lastname: $("#lastname-edit-inp").val(),
    username: $("#username-edit-inp").val(),
    gender: $("#gender-edit-inp").val(),
    role: $("#role-edit-inp").val(),
  };
  console.log(updatedUser);
  let polipop = new Polipop("updateSection", {
    layout: "popups",
    insert: "before",
    pool: 5,
    life: 3000,
    progressbar: true,
  });

  axios
    .put(`/api/user/${id}`, updatedUser)
    .then((response) => {
      polipop.add({
        type: "success",
        title: "Success",
        content: "Updated successfully!",
      });
      setTimeout(() => {
        window.location.href = `http://localhost:1010/dashboard`;
      }, 3000);
    })
    .catch((error) => {
      polipop.add({
        type: "error",
        title: "Error",
        content: error.response.data.message,
      });
    });
};
