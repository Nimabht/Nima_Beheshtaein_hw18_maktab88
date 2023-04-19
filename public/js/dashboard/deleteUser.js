const deleteUser = async (id) => {
  let polipop = new Polipop("updateSection", {
    layout: "popups",
    insert: "before",
    pool: 5,
    life: 3000,
    progressbar: true,
  });
  try {
    await axios.delete(`/api/user/${id}`);
    await axios.get("/auth/logout");
    polipop.add({
      type: "info",
      title: "Deleted!",
      content: "User deleted successfully!",
    });
    setTimeout(() => {
      window.location.href = `http://localhost:1010/login`;
    }, 3000);
  } catch (error) {
    polipop.add({
      type: "error",
      title: "Error",
      content: "Something is wrong!!!",
    });
  }
};
