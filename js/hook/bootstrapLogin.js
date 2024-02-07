(() => {
  const isLoginUser = localStorage.getItem("isLoginUser");

  const pathPage = window.location.pathname;
  const routeOn = pathPage.substring(pathPage.lastIndexOf("/"), 1);
  const private = ["userHome.html"];

  if (private.includes(routeOn) && !isLoginUser) {
    window.location.href = "index.html";
  } else {
    console.log("object");
  }
})();
