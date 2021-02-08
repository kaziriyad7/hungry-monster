// Get Elements
const search = document.getElementById("search");

// Fetch Meals after click on search icon
search.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = document.getElementById("search-text").value;
    fetchedMeals(String(searchText));
});


// Method for fetched meals
const fetchedMeals = (searchText) => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchText)
        .then((response) => {
            return response.json();
        })
        .then((foods) => {
            const meals = foods.meals;

            if (!meals) {
                const searchOutput = getDocumentAndClean("search-output");
                const message = basicCard('No Meals Has Been Found');
                searchOutput.appendChild(message);

                return;
            }

            // Render html
            const searchOutput = getDocumentAndClean("search-output");

            // Clean Previous single element
            getDocumentAndClean("single-meal-container");

            meals.map((meal) => {
                const cardMeal = singleMealCard(meal);
                searchOutput.appendChild(cardMeal);
            });

            const singleMeals = document.getElementsByClassName("single-meal");
            console.log(singleMeals);
            Array.from(singleMeals).forEach(function (element) {
                element.addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch(this.href)
                        .then((response) => response.json())
                        .then((singleMealData) => {
                            const meal = singleMealData.meals[0];
                            const singleMealContainer = getDocumentAndClean(
                                "single-meal-container"
                            );
                            const singleMealCardBlock = singleMealCardWithID(
                                meal
                            );
                            singleMealContainer.appendChild(
                                singleMealCardBlock
                            );
                        });
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

// Build Single Meal Card Using Bootstrap DOM Card
const singleMealCard = (meal) => {
    // Grid Column
    const col = document.createElement("div");
    col.className = "col-md-3";
    // style
    col.style.margin = "10px";
    
    col.style.padding = "10px";

    // Link
    const cardLink = document.createElement("a");
    cardLink.className = "single-meal";
    cardLink.href =
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal.idMeal;
    // style
    cardLink.style.textDecoration = "none";
    cardLink.style.textAlign = "center";


    // Create Card Element
    const card = document.createElement("div");
    card.className = "card";
    // style
    card.style.maxHeight = "500px";

    // Create Img
    const cardImage = document.createElement("img");
    cardImage.src = meal.strMealThumb;
    cardImage.alt = meal.strMeal;

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    const cardTitleText = document.createTextNode(meal.strMeal);
    cardTitle.appendChild(cardTitleText);
    

    // Add cardTitle to CardBody
    cardBody.appendChild(cardTitle);

    // Add image to card body
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    cardLink.appendChild(card);
    col.appendChild(cardLink);

    return col;
};

// Method for create s single card for meal
const singleMealCardWithID = (meal) => {
    // Grid Column
    const col = document.createElement("div");
    col.className = "col-md-6 offset-3";

    // Create Card Element
    const card = document.createElement("div");
    card.className = "card";

    // Create Img
    const cardImage = document.createElement("img");
    cardImage.src = meal.strMealThumb;
    cardImage.alt = meal.strMeal;

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    const cardTitleText = document.createTextNode(meal.strMeal);
    cardTitle.appendChild(cardTitleText);

    // Ingredients
    const ul = document.createElement("ul");

    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        console.log(ingredient);

        if (ingredient) {
            let li = document.createElement("li");
            let liText = document.createTextNode(ingredient);
            li.appendChild(liText);

            ul.appendChild(li);
        }
    }

    // Add cardTitle to CardBody
    cardBody.appendChild(cardTitle);

    // Add image to card body
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    card.appendChild(ul);

    col.appendChild(card);

    return col;
};

// Basic card display with message
const basicCard = (message) => {
    // Grid Column
    const col = document.createElement("div");
    col.className = "col-md-6 offset-2";

    // Create Card Element
    const card = document.createElement("div");
    card.className = "card";

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title text-center";
    const cardTitleText = document.createTextNode(message);
    cardTitle.appendChild(cardTitleText);

    // Add cardTitle to CardBody
    cardBody.appendChild(cardTitle);

    // Add image to card body
    card.appendChild(cardBody);

    col.appendChild(card);

    return col;
}

// Function for get element and clean previous child element
const getDocumentAndClean = (documentID) => {
    const documentElement = document.getElementById(documentID);
    documentElement.innerHTML = "";

    return documentElement;
}