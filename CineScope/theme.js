const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
  themeIcon.src = theme === "dark" ? "assets/moon.svg" : "assets/sun.svg";
}

themeIcon.onclick = () => {
  const newTheme = document.body.className === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

// load saved theme
setTheme(localStorage.getItem("theme") || "dark");