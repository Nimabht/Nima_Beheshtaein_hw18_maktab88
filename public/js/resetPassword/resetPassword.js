let polipop = new Polipop("newSection", {
  layout: "popups",
  insert: "before",
  pool: 5,
  life: 3000,
  progressbar: true,
});
$("form").on("submit", async function (e) {
  e.preventDefault();
  const isRobot = $("#robot-inp").val();
  if (isRobot !== "no") {
    return polipop.add({
      type: "error",
      title: "opss!!!",
      content: "You are a robot :)",
    });
  }
  const information = {
    currentPassword: $("#cur-password-inp").val(),
    newPassword: $("#new-password-inp").val(),
    repeatPassword: $("#new-repeat-password-inp").val(),
  };
  try {
    await axios.post("/auth/resetpassword", information);
    polipop.add({
      type: "success",
      title: "Success",
      content: "Password changed successfully!",
    });
    setTimeout(() => {
      window.location.href = `/dashboard`;
    }, 3000);
  } catch (error) {
    polipop.add({
      type: "error",
      title: "Error",
      content: error.response.data.message,
    });
  }
});
