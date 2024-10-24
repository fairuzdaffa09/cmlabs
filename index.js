function getCategory() {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function (response) {
      console.log(response.data);
      let categories = response.data.categories;
      let categoriesDisplayed = categories.map((item) => {
        let categoryDescription = JSON.stringify(item.strCategoryDescription);
        return `<div class="category" onclick={getMealFromCategory("${item.strCategory}")}>
          <img
            src="${item.strCategoryThumb}"
            alt=""
          />
          <h3 class="my-4 px-4">${item.strCategory}</h3>
        </div>`;
      });
      $(".category-wrapper").append(categoriesDisplayed.join(""));
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}

function getMealFromCategory(categoryName) {
  console.log(categoryName);
  localStorage.removeItem("meals");
  localStorage.removeItem("category");
  localStorage.removeItem("categoryDescription");
  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then(function (response) {
      // console.log(response.data);
      let meals = response.data.meals;
      localStorage.setItem("meals", JSON.stringify(meals));
      localStorage.setItem("category", categoryName);
      window.location.href = "mealsFromCategory.html";
    });
}

function mapMeals() {
  let storedMeals = localStorage.getItem("meals");
  let category = localStorage.getItem("category");
  storedMeals = JSON.parse(storedMeals);
  console.log(storedMeals);
  let mealsDisplayed = storedMeals.map((item) => {
    return `<div class="category" onclick={getMealDetail("${item.idMeal}")}>
    <img
      src="${item.strMealThumb}"
      alt=""
    />
    <h3 class="my-4 px-4">${item.strMeal}</h3>
  </div>`;
  });
  $(".meal-wrapper").append(mealsDisplayed);
  console.log("Hi");

  $(".meal-category").text(category);
}

if (window.location.href.includes("mealsFromCategory.html")) {
  mapMeals();
}

function getMealDetail(id) {
  console.log(id);
}

console.log(window.location.href);

getCategory();
