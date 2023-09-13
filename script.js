document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.getElementById("prevBtn");
  const nextButton = document.getElementById("nextBtn");
  const yearList = document.getElementById("yearList");
  const yearArrowBtn = document.getElementById("year-arrow-btn");
  const monthArrowBtn = document.getElementById("month-arrow-btn");
  const monthList = document.querySelector(".roll-down-menu-month-grid");
  const rollDownMenu = document.querySelector(".roll-down-menu");
  const rollDownMonthsMenu = document.querySelector(".roll-down-months-menu");
  const menuTextElement = document.querySelector(".menu-text");
  const menuMonthTextElement = document.querySelector(".menu-month-text");
  const arrowFilterMenu = document.getElementById("arrow-filter-menu");
  const customCheckboxes = document.querySelectorAll(
    ".custom-checkbox-wrapper"
  );

  const filterOptionsWrapperClosedText = document.getElementById(
    "filter-options-wrapper-closed-text"
  );
  const filterOptionsWrapper = document.querySelector(
    ".filter-options-wrapper"
  );
  let currentYearStart = 2023;
  let currentYearEnd = 2034;
  let currentClickedYearElement = null;
  let currentClickedMonthElement = null;

  function generateYears() {
    yearList.innerHTML = "";
    for (let year = currentYearStart; year <= currentYearEnd; year++) {
      const yearItem = document.createElement("li");
      yearItem.textContent = year;
      yearItem.classList.add("yearElement");
      yearList.appendChild(yearItem);
    }
  }

  function updateYearVisibility() {
    const yearItems = yearList.querySelectorAll(".yearElement");
    yearItems.forEach((item) => {
      const year = parseInt(item.textContent);
      if (year >= currentYearStart && year <= currentYearEnd) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  yearArrowBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    rollDownMenu.classList.toggle("visible");

    if (rollDownMenu.classList.contains("visible")) {
      yearArrowBtn.innerHTML =
        '<img src="assets/images/chevron-down-outline.svg" class="arrow" />';
    } else {
      yearArrowBtn.innerHTML =
        '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
    }
  });

  arrowFilterMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    filterOptionsWrapper.classList.toggle("visible");

    if (filterOptionsWrapper.classList.contains("visible")) {
      filterOptionsWrapperClosedText.classList.add("hide");
    } else {
      filterOptionsWrapperClosedText.classList.remove("hide");
    }

    if (filterOptionsWrapper.classList.contains("visible")) {
      arrowFilterMenu.innerHTML =
        '<img src="assets/images/chevron-down-outline.svg" class="arrow" />';
    } else {
      arrowFilterMenu.innerHTML =
        '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
    }
  });

  document.body.addEventListener("click", () => {
    rollDownMenu.classList.remove("visible");
    yearArrowBtn.innerHTML =
      '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
  });

  rollDownMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.body.addEventListener("click", () => {
    rollDownMenu.classList.remove("visible");
    yearArrowBtn.innerHTML =
      '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
  });

  function toggleMenuVisibility(menu, arrowBtn) {
    menu.classList.toggle("visible");
    if (menu.classList.contains("visible")) {
      arrowBtn.innerHTML =
        '<img src="assets/images/chevron-down-outline.svg" class="arrow" />';
    } else {
      arrowBtn.innerHTML =
        '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
    }
  }

  function toggleMenuVisibility(menu, arrowBtn) {
    menu.classList.toggle("visible");
    if (menu.classList.contains("visible")) {
      arrowBtn.innerHTML =
        '<img src="assets/images/chevron-down-outline.svg" class="arrow" />';
    } else {
      arrowBtn.innerHTML =
        '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
    }
  }

  customCheckboxes.forEach((customCheckbox) => {
    const checkbox = customCheckbox.querySelector(".hidden-checkbox");
    const label = customCheckbox.querySelector(".checkbox-label");

    customCheckbox.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;

      customCheckbox.classList.toggle("selected", checkbox.checked);

      if (checkbox.checked) {
        label.textContent = "Selected";
      } else {
        label.textContent = "Select";
      }
    });
  });

  monthArrowBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenuVisibility(rollDownMonthsMenu, monthArrowBtn);
  });

  rollDownMonthsMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.body.addEventListener("click", () => {
    rollDownMonthsMenu.classList.remove("visible");
    monthArrowBtn.innerHTML =
      '<img src="assets/images/chevron-forward-outline.svg" class="arrow" />';
  });

  prevButton.addEventListener("click", () => {
    if (currentYearStart > 2023) {
      currentYearStart -= 12;
      currentYearEnd -= 12;
      generateYears();
      updateYearVisibility();
    }

    nextButton.disabled = false;
  });

  nextButton.addEventListener("click", () => {
    currentYearStart += 12;
    currentYearEnd += 12;
    generateYears();
    updateYearVisibility();

    prevButton.disabled = false;
  });

  generateYears();
  updateYearVisibility();

  if (currentYearStart <= 2023) {
    prevButton.disabled = true;
  }

  yearList.addEventListener("click", (event) => {
    if (event.target.classList.contains("yearElement")) {
      const yearText = event.target.textContent;
      menuTextElement.textContent = yearText;

      if (currentClickedYearElement === event.target) {
        event.target.classList.toggle("clickedYear");
        currentClickedYearElement = null;
        menuTextElement.textContent = "Wybierz rok";
      } else {
        if (currentClickedYearElement) {
          currentClickedYearElement.classList.remove("clickedYear");
        }

        event.target.classList.add("clickedYear");

        currentClickedYearElement = event.target;
      }
    }
  });

  monthList.addEventListener("click", (event) => {
    if (event.target.classList.contains("monthElement")) {
      const monthText = event.target.textContent;
      menuMonthTextElement.textContent = monthText;

      if (currentClickedMonthElement === event.target) {
        event.target.classList.toggle("clickedMonth");
        currentClickedMonthElement = null;
        menuMonthTextElement.textContent = "Wybierz miesiąc"; // No year element is currently clicked
      } else {
        if (currentClickedMonthElement) {
          currentClickedMonthElement.classList.remove("clickedMonth");
        }

        event.target.classList.add("clickedMonth");

        currentClickedMonthElement = event.target;
      }
    }
  });
});
