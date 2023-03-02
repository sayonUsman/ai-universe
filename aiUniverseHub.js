const loadInformation = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data.tools);
    displayInformation(data.data.tools);
  } catch (error) {
    console.log(error);
  }
};

const displayInformation = (information) => {
  const informationContainer = document.getElementById("information-container");

  for (let index = 0; index < 6; index++) {
    const informationSection = document.createElement("div");
    console.log(information[index]);

    informationSection.innerHTML = `
      <div class="card h-100">
        <img src="${information[index].image}" class="img-fluid p-3" alt="There is a image.">

        <div class="card-body">
          <h2 class="card-title fw-bold mb-3">Features</h2>
          <p>1. ${information[index].features[0]}</p>
          <p>2. ${information[index].features[1]}</p>
          <p>3. ${information[index].features[2]}</p>
          <hr class="ps-3 pe-3"/>
          <h2 class="card-title fw-bold mb-3">${information[index].name}</h2>
        </div>
      </div>
    `;

    informationContainer.appendChild(informationSection);
  }
};

loadInformation();

// loadMoreInformation();
