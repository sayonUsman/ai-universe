const loadInformation = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data);
    displayInformation(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayInformation = (mainData) => {
  const informationContainer = document.getElementById("information-container");
  const informationSection = document.createElement("div");
  let imageLink = "";

  informationSection.innerHTML = `
      <div class="card h-100">
        <img src="${mainData.image_link[0]}" class="img-fluid p-3" alt="There is a image.">

        <div class="card-body">
          <h2 class="card-title fw-bold mb-3">Features</h2>
          <p>1. ${mainData.features[1].feature_name}</p>
          <p>2. ${mainData.features[2].feature_name}</p>
          <p>3. ${mainData.features[3].feature_name}</p>
          <hr class="ps-3 pe-3"/>
          <h2 class="card-title fw-bold mb-3">${mainData.tool_name}</h2>
        </div>
      </div>
    `;

  informationContainer.appendChild(informationSection);
};

for (let index = 1; index < 7; index++) {
  loadInformation(index);
}
