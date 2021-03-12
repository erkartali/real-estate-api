//empty box on click if re entering info
const clearBox = (elementID) => {
  document.getElementById(elementID).innerHTML = "";
};

//add commas to price
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//on click function that runs api call
$(".pure_button").click(function (e) {
  e.preventDefault();
  clearBox("listings");

  //set input city to user input or default to milwaukee
  let inputCity = document.querySelector(".user-input-city").value;
  inputCity === "" ? (inputCity = "milwaukee") : inputCity;
  console.log("inputCity:", inputCity);

  //set input state to user input or default to wi
  let inputState = document.querySelector(".user-input-state").value;
  inputState === "" ? (inputState = "wi") : inputState;
  console.log("inputState:", inputState);

  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=" +
      inputCity +
      "&limit=20&offset=0&state_code=" +
      inputState +
      "&sort=relevance",
    method: "GET",
    headers: {
      "x-rapidapi-key": "94d3781487msh5507ea8f7053853p120c14jsnfad1a7c42454",
      "x-rapidapi-host": "realtor.p.rapidapi.com",
    },
  };

  //make api call with ajax cause fetch is busted?
  $.ajax(settings).done(function (response) {
    console.log(response.properties);
    let listings = response.properties;

    //loop through results
    for (let i = 0; i < listings.length; i++) {
      // create variables with data from call
      const picture = listings[i].thumbnail;
      //   console.log("picture:", picture);
      const id = i + 1;
      const url = listings[i].rdc_web_url;
      const street = listings[i].address.line;
      const city = listings[i].address.city;
      const zip_code = listings[i].address.postal_code;
      const state = listings[i].address.state_code;
      const baths = listings[i].baths;
      const beds = listings[i].beds;
      const price = listings[i].price;
      let priceCommas = function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const agent = listings[i].agents[0].name;

      //create nodes for results to go in and add text

      const pictureNode = document.createElement("img");
      pictureNode.src = `${picture}`;
      pictureNode.classList.add("pic-size");

      const urlNode = document.createElement("a");
      const urlText = document.createTextNode(`Click for full listing`);
      urlNode.href = url;
      urlNode.target = "_blank";
      urlNode.classList.add("urls");
      console.log("urlNode:", urlNode);

      const addressNode = document.createElement("h5");
      const addressText = document.createTextNode(
        `Address: ${street} ${city} ${state}, ${zip_code}`
      );

      // console.log("id:", id);

      const bathsNode = document.createElement("h5");
      const bathsText =
        baths === undefined
          ? document.createTextNode(`Baths: N/A`)
          : document.createTextNode(`Baths: ${baths}`);

      const bedsNode = document.createElement("h5");
      const bedsText =
        beds === null
          ? document.createTextNode(`Bedrooms: N/A`)
          : document.createTextNode(`Bedrooms: ${beds}`);

      const priceNode = document.createElement("h5");
      const priceText = document.createTextNode(
        `Price: $${priceCommas(price)}`
      );

      const agentNode = document.createElement("h5");
      const agentText = document.createTextNode(`Agent: ${agent}`);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete", "btn", "btn-danger");
      const deleteButtonText = document.createTextNode(`Delete listing`);

      //function that creates a listing
      const createListing = () => {
        const individualListing = document.createElement("div");
        individualListing.classList.add("listing", ".col-sm");

        // add proper text to the nodes
        addressNode.appendChild(addressText);
        urlNode.appendChild(urlText);
        bathsNode.appendChild(bathsText);
        bedsNode.appendChild(bedsText);
        priceNode.appendChild(priceText);
        agentNode.appendChild(agentText);
        deleteButton.appendChild(deleteButtonText);

        // add nodes to the listings div
        document.getElementById("listings").appendChild(individualListing);
        individualListing.appendChild(pictureNode);
        individualListing.appendChild(priceNode);
        individualListing.appendChild(addressNode);
        individualListing.appendChild(bedsNode);
        individualListing.appendChild(bathsNode);
        individualListing.appendChild(agentNode);
        individualListing.appendChild(urlNode);
        individualListing.appendChild(deleteButton);
      };

      // call the function to create listings
      createListing();
    }
    let elements = document.getElementsByClassName("delete");
    console.log("elements:", elements);
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = function () {
        console.log(this.parentNode);
        this.parentNode.remove();
      };
    }
  });
});
