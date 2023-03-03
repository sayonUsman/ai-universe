const loadInformation = async (length) => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayInformation(data.data.tools, length);
  } catch (error) {
    console.log(error);
  }
};

const displayInformation = (information, length = information.length) => {
  const informationContainer = document.getElementById("information-container");
  let seeMoreDetails = true;
  let index = 0;

  if (length !== 6) {
    seeMoreDetails = false;
    index = 6;
  }

  for (index; index < length; index++) {
    const informationSection = document.createElement("div");

    if (index === 3) {
      information[index].features[2] = "Live search";
    }

    informationSection.innerHTML = `
      <div class="card shadow h-100">
        <img src="${information[index].image}" class="img-fluid p-3" alt="There is a image.">

        <div class="card-body">
          <h2 class="card-title fw-bold mb-3">Features</h2>
          <p>1. ${information[index].features[0]}</p>
          <p>2. ${information[index].features[1]}</p>
          <p>3. ${information[index].features[2]}</p>
          <hr class="ps-3 pe-3"/>

          <div class="d-flex justify-content-between align-items-center">
            <h2 class="card-title fw-bold mb-3">${information[index].name}</h2>
            <button type="button" class="btn rounded-circle" data-bs-toggle="modal" data-bs-target="#detailsModal"><img class="img-fluid" src="arrow.svg" />
          </div>
        </div>
      </div>
    `;

    informationContainer.appendChild(informationSection);
    seeMoreDetails
      ? (document.getElementById("see-btn").innerText = "See More")
      : (document.getElementById("see-btn-container").innerHTML = "");
  }
};

loadInformation(6);
