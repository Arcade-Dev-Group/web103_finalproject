document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");
  const gameFilter = document.querySelector("#game-filter");
  const gameSort = document.querySelector("#game-sort");
  const resetGames = document.querySelector("#reset-games");
  const gamesGrid = document.querySelector("#games-grid");
  const gameCards = document.querySelectorAll(".game-card");
  const filterResults = document.querySelector("#filter-results");

  const setActiveLink = () => {
    const current = location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateResults = () => {
    const visibleCount = document.querySelectorAll(".game-card:not(.is-hidden)").length;
    if (filterResults) {
      filterResults.textContent = `${visibleCount} game${visibleCount === 1 ? "" : "s"} found`;
    }
  };

  const applyFilterSort = () => {
    if (!gamesGrid) return;

    const filterValue = gameFilter ? gameFilter.value : "all";
    const sortValue = gameSort ? gameSort.value : "default";

    gameCards.forEach((card) => {
      const category = card.dataset.category || "";
      const match = filterValue === "all" || category === filterValue;
      card.classList.toggle("is-hidden", !match);
    });

    const visibleCards = [...gameCards].filter((card) => !card.classList.contains("is-hidden"));

    visibleCards.sort((a, b) => {
      const nameA = (a.dataset.name || "").toLowerCase();
      const nameB = (b.dataset.name || "").toLowerCase();
      const ratingA = Number(a.dataset.rating || 0);
      const ratingB = Number(b.dataset.rating || 0);

      if (sortValue === "name-asc") return nameA.localeCompare(nameB);
      if (sortValue === "name-desc") return nameB.localeCompare(nameA);
      if (sortValue === "rating-desc") return ratingB - ratingA;
      if (sortValue === "rating-asc") return ratingA - ratingB;
      return 0;
    });

    visibleCards.forEach((card) => gamesGrid.appendChild(card));
    updateResults();
  };

  setActiveLink();

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login form submitted. Connect this to your backend later.");
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = document.getElementById("password")?.value || "";
      const confirmPassword = document.getElementById("confirm-password")?.value || "";

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      alert("Sign up form submitted. Connect this to your backend later.");
    });
  }

  if (gameFilter) {
    gameFilter.addEventListener("change", applyFilterSort);
  }

  if (gameSort) {
    gameSort.addEventListener("change", applyFilterSort);
  }

  if (resetGames) {
    resetGames.addEventListener("click", () => {
      if (gameFilter) gameFilter.value = "all";
      if (gameSort) gameSort.value = "default";
      gameCards.forEach((card) => card.classList.remove("is-hidden"));
      gameCards.forEach((card) => gamesGrid.appendChild(card));
      updateResults();
    });
  }

  applyFilterSort();
});
