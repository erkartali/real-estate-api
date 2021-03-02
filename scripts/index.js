//empty box on click if re entering info
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
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
      const street = listings[i].address.line;
      const city = listings[i].address.city;
      const zip_code = listings[i].address.postal_code;
      const state = listings[i].address.state_code;
      const baths = listings[i].baths;
      const beds = listings[i].beds;
      const price = listings[i].price;
      const agent = listings[i].agents[0].name;

      //create nodes for results to go in and add text

      const pictureNode = document.createElement("img");
      pictureNode.src = `${picture}`;
      pictureNode.classList.add("pic-size");

      const addressNode = document.createElement("h5");
      const addressText = document.createTextNode(
        `Address: ${street} ${city} ${state}, ${zip_code}`
      );

      const bathsNode = document.createElement("h5");
      const bathsText = document.createTextNode(`Baths: ${baths}`);

      const bedsNode = document.createElement("h5");
      const bedsText = document.createTextNode(`Bedrooms: ${beds}`);

      const priceNode = document.createElement("h5");
      const priceText = document.createTextNode(`Price: ${price}`);

      const agentNode = document.createElement("h5");
      const agentText = document.createTextNode(`Agent: ${agent}`);

      //function that creates a listing
      const createListing = () => {
        const individualListing = document.createElement("div");
        individualListing.classList.add("listing");

        // add proper text to the nodes
        addressNode.appendChild(addressText);
        bathsNode.appendChild(bathsText);
        bedsNode.appendChild(bedsText);
        priceNode.appendChild(priceText);
        agentNode.appendChild(agentText);

        // add nodes to the listings div
        document.getElementById("listings").appendChild(individualListing);
        individualListing.appendChild(pictureNode);
        individualListing.appendChild(priceNode);
        individualListing.appendChild(addressNode);
        individualListing.appendChild(bedsNode);
        individualListing.appendChild(bathsNode);
        individualListing.appendChild(agentNode);
      };

      // call the function to create listings
      createListing();
    }
  });
});
