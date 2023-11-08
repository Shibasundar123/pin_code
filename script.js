const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const nameElement = document.querySelector(".name");
const stateElement = document.querySelector(".state");
const circleElement = document.querySelector(".circle");
const countryElement = document.querySelector(".country");

async function fetchData(pincode) {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data && data[0].PostOffice) {
        const postOffice = data[0].PostOffice[0];
        nameElement.textContent = `Name: ${postOffice.Name}`;
        stateElement.textContent = `State: ${postOffice.State}`;
        circleElement.textContent = `Circle: ${postOffice.Circle}`;
        countryElement.textContent = `Country: ${postOffice.Country}`;
      } else {
        alert("dont find any PinCode");
        return;
        input.value = "";
      }
    } else {
      clearData();
    }
  } catch (error) {
    console.error("Error:", error);
    clearData();
  }
}

function clearData() {
  nameElement.textContent = "";
  stateElement.textContent = "";
  circleElement.textContent = "";
  countryElement.textContent = "";
}

btn.addEventListener("click", function () {
  const pincode = input.value;

  if (pincode.length === 6) {
    fetchData(pincode);
  } else {
    alert("invalid Pincode");
    return;
  }
});

input.addEventListener("click", function () {
  clearData();
  input.value = "";
});
