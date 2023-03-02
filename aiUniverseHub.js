const loadInformation = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayInformation(data.data.tools);
  } catch (error) {
    console.log(error);
  }
};

const loadMoreInformation = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayMoreInformation(data.data.tools);
  } catch (error) {
    console.log(error);
  }
};

const displayInformation = (information) => {
  const informationContainer = document.getElementById("information-container");

  for (let index = 0; index < 6; index++) {
    const informationSection = document.createElement("div");

    if (index === 3) {
      information[index].features[2] = "Live search";
    }

    informationSection.innerHTML = `
      <div class="card h-100">
        <img src="${information[index].image}" class="img-fluid p-3" alt="There is a image.">

        <div class="card-body">
          <h2 class="card-title fw-bold mb-3">Features</h2>
          <p>1. ${information[index].features[0]}</p>
          <p>2. ${information[index].features[1]}</p>
          <p>3. ${information[index].features[2]}</p>
          <hr class="ps-3 pe-3"/>

          <div class="d-flex justify-content-between align-items-center">
            <h2 class="card-title fw-bold mb-3">${information[index].name}</h2>
            <button id="details-btn" class="btn rounded-circle"><img class="img-fluid" src="arrow.svg" />
          </div>
        </div>
      </div>
    `;

    informationContainer.appendChild(informationSection);
  }
};

const displayMoreInformation = (information) => {
  const informationContainer = document.getElementById("information-container");
  informationContainer.innerHTML = "";

  for (let index = 0; index < information.length; index++) {
    const informationSection = document.createElement("div");

    if (index === 3) {
      information[index].features[2] = "Live search";
    }

    informationSection.innerHTML = `
      <div class="card h-100">
        <img src="${information[index].image}" class="img-fluid p-3" alt="There is a image.">

        <div class="card-body">
          <h2 class="card-title fw-bold mb-3">Features</h2>
          <p>1. ${information[index].features[0]}</p>
          <p>2. ${information[index].features[1]}</p>
          <p>3. ${information[index].features[2]}</p>
          <hr class="ps-3 pe-3"/>

          <div class="d-flex justify-content-between align-items-center">
            <h2 class="card-title fw-bold mb-3">${information[index].name}</h2>
            <button id="details-btn" class="btn rounded-circle"><img class="img-fluid" src="arrow.svg" />
          </div>
    </button>
          </div>
        </div>
      </div>
    `;

    informationContainer.appendChild(informationSection);
    document.getElementById("see-btn").innerHTML = "";
  }
};

loadInformation();
