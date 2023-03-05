// This event listener will hide preloader and display information cards after loading data
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const headerTitle = document.getElementById("headerTitle");
  const container = document.getElementById("container");

  preloader.classList.remove("d-flex");
  preloader.classList.add("d-none");

  headerTitle.classList.remove("d-none");
  headerTitle.classList.add("d-block");

  container.classList.remove("d-none");
  container.classList.add("d-block");
});

// This function will load data through API
const loadInformation = async (length) => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    displayInformation(data.data.tools, length);
  } catch (error) {
    document.querySelector("#container").innerHTML = `
      <div>
        <h2 class="fw-bolder text-warning">Oops!!! Maybe there is happened problem to load the page. Please reload the page.</h2>
      </div>
    `;
  }
};

let seeMoreDetails = true;

// This function will display the data after loading complete data
const displayInformation = (information, length = information.length) => {
  const informationContainer = document.getElementById("information-container");
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
            <div>
              <h2 class="card-title fw-bold mb-3">${information[index].name}</h2>
              <p><span><img class="img-fluid" src="./icons/calendar_month.svg" />   ${information[index].published_in}</p>
            </div>

            <button type="button" onclick="loadDetails('${information[index].id}')" class="btn rounded-circle" data-bs-toggle="modal" data-bs-target="#detailsModal"><img class="img-fluid" src="./icons/arrow.svg" />
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

// This function will load single data through API
const loadDetails = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayDetails(data.data);
  } catch (error) {
    document.querySelector("#detailsContainer").innerHTML = `
      <div>
        <h2 class="fw-bolder text-warning">Oops!!! Maybe there is happened problem to load the page. Please reload the page.</h2>
      </div>
    `;
  }
};

// This function will display the details for single data after loading complete data
const displayDetails = (id) => {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const image = document.getElementById("image");

  content.innerHTML = `
    <h6 class="fw-bolder">${id.description}</h6>

    <div class="row row-cols-1 w-75 g-3 ms-4 mt-3 mb-4">
      <div class="col border border-dark rounded">
        <p class="text-center mt-2 mb-1">${
          id.pricing == null
            ? "No Cost"
            : id.pricing[0].price == 0
            ? "No Cost"
            : id.pricing[0].price
        }</P>
        <p class="text-center">${
          id.pricing == null ? "Starter" : id.pricing[0].plan
        }</P>
      </div>

      <div class="col border border-dark rounded">
        <p class="text-center mt-2 mb-1">${
          id.pricing == null
            ? "No Cost"
            : id.pricing[1].price == 0
            ? "No Cost"
            : id.pricing[1].price
        }</P>
        <p class="text-center">${
          id.pricing == null ? "Professional" : id.pricing[1].plan
        }</P>
      </div>

      <div class="col border border-dark rounded">
        <p class="text-center mt-2 mb-1">${
          id.pricing == null
            ? "No Cost"
            : id.pricing[2].price == 0
            ? "No Cost"
            : id.pricing[2].price
        }</P>
        <p class="text-center">${
          id.pricing == null ? "Enterprise" : id.pricing[2].plan
        }</P>
      </div>
    </div>

    <div class="d-flex flex-column flex-lg-row justify-content-between">
      <div>
        <h5 class="fw-bolder">Features</h5>
        <ul>
          <li>${id.features[1].feature_name}</li>
          <li>${id.features[2].feature_name}</li>
          <li>${id.features[3].feature_name}</li>
        </ul>
      </div>

      <div>
        <h5 class="fw-bolder">Integrations</h5>
        <ul>
          <li>${
            id.integrations == null
              ? "No Data Found"
              : id.integrations[0] == undefined
              ? "No Data Found"
              : id.integrations[0]
          }</li>
          <li class="${
            id.integrations == null
              ? "d-none"
              : id.integrations[1] == undefined
              ? "d-none"
              : "d-block"
          }">${
    id.integrations == null ? "No Data Found" : id.integrations[1]
  }</li>
          <li class="${
            id.integrations == null
              ? "d-none"
              : id.integrations[2] == undefined
              ? "d-none"
              : "d-block"
          }">${
    id.integrations == null ? "No Data Found" : id.integrations[2]
  }</li>
        </ul>
      </div>
    </div>
  `;

  image.innerHTML = `
    <div class="position-relative">
      <img class="img-fluid" src="${id.image_link[0]}"/>
    
      <p class="${
        id.accuracy.score == null
          ? "d-none"
          : "d-inline-block ps-2 pe-2 bg-warning text-white position-absolute top-0 end-0"
      }">${id.accuracy.score * 100}% accuracy</p>
    </div>

    <h6 class="fw-bolder text-center pt-3">${
      id.input_output_examples == null
        ? "Can you give any example?"
        : id.input_output_examples[0].input
    }</h6>
    <p class="text-center">${
      id.input_output_examples == null
        ? "No! Not Yet! Take a break!!!"
        : id.input_output_examples[0].output
    }</p>
  `;
};

// This function will load data through API and after loading it will sort the data by published date
const sortByDate = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const response = await fetch(url);
    const data = await response.json();
    const information = data.data.tools;
    const sortedInformation = information.sort((info1, info2) =>
      info1.published_in < info2.published_in
        ? 1
        : info1.published_in > info2.published_in
        ? -1
        : 0
    );
    seeMoreDetails
      ? displaySortedInformation(sortedInformation, 6)
      : displaySortedInformation(sortedInformation);
  } catch (error) {
    document.querySelector("#container").innerHTML = `
      <div>
        <h2 class="fw-bolder text-warning">Oops!!! Maybe there is happened problem to load the page. Please reload the page.</h2>
      </div>
    `;
  }
};

// This function will display the sorted data after loading complete data
const displaySortedInformation = (information, length = information.length) => {
  const informationContainer = document.getElementById("information-container");
  informationContainer.innerHTML = "";

  for (let index = 0; index < length; index++) {
    const informationSection = document.createElement("div");

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
            <div>
              <h2 class="card-title fw-bold mb-3">${information[index].name}</h2>
              <p><span><img class="img-fluid" src="./icons/calendar_month.svg" />   ${information[index].published_in}</p>
            </div>

            <button type="button" onclick="loadDetails('${information[index].id}')" class="btn rounded-circle" data-bs-toggle="modal" data-bs-target="#detailsModal"><img class="img-fluid" src="./icons/arrow.svg" />
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
