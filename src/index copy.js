let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//STAGE 1. Fetch Andy's Toys
fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then(function (data) {
    //console.log(data);
    data.forEach(function (val) {
      //console.log(val);
      let toyCollection = document.querySelector("#toy-collection");
      let divCard = document.createElement("div");
      divCard.className = "card";
      toyCollection.appendChild(divCard);

      //STAGE 2.Add Toy Info to the Card

      let toyName = document.createElement("h2");
      toyName.textContent = val.name;
      let toyImage = document.createElement("img");
      toyImage.src = val.image;
      toyImage.className = "toy-avatar";
      let toyLikes = document.createElement("p");
      toyLikes.textContent = `${val.likes} Likes`;
      let toyBtn = document.createElement("button");
      toyBtn.className = "like-btn";
      toyBtn.id = val.id;
      toyBtn.textContent = "like";
      divCard.appendChild(toyName);
      divCard.appendChild(toyImage);
      divCard.appendChild(toyLikes);
      divCard.appendChild(toyBtn);
    });
  });

//STAGE 3.Add a New Toy

let submitBtn = document.getElementsByName("submit")[0];
let nameInput = document.getElementsByName("name")[0];
let imageInput = document.getElementsByName("image")[0];
console.log(submitBtn);
console.log(nameInput);
console.log(imageInput);
submitBtn.addEventListener("click", (e) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      likes: 0,
    }),
  });
});

//STAGE 4.Increase a Toy's Likes

