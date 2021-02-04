async function getDataCrypto() {
  var input = document.querySelector(".form-control").value;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=${input}`;
  const [result] = await fetch(url).then((res) => res.json());
  console.log(result);
  //   const currencies = await fetch(
  //     `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
  //   ).then((res) => res.json());
  //   console.log(currencies);

  const name = result.id;
  const maxVal = result.high_24h;
  const minVal = result.low_24h;
  const priceChange = result.price_change_percentage_24h;
  const logo = result.image;

  localStorage.setItem('name', name);
  localStorage.setItem('highValue', maxVal);
  localStorage.setItem('lowValue', minVal);
  localStorage.setItem('changeInPrice', priceChange);
  localStorage.setItem('icon', logo);

  // function that retrieves the data from the local storage and refreshes it/disp
  

  /////////////append a new div after the previous one
  const node = document.createElement("div"); //<div></div>

  document.querySelector(".displayCrypto").appendChild(node);
  console.log(node);
  node.innerHTML = `<div class="cryptoItem"><div class="logo"><img src=${logo}></div>
                    <p class="name">${name.toUpperCase()}</p>
                    <p class="values">Max value last 24H: <span id="max">${maxVal}</span> CAD</p>
                    <p class="values">Min value last 24H: <span id="min">${minVal}</span> CAD</p>
                    <p class="values">Price change percentage: <span id="percent">${priceChange}</span>%</p>
                    </div>`;


  document.querySelector(".displayCrypto").style = `display: block;`;

  //   document.querySelector(".logo").innerHTML = `<img src=${logo}>`;
  //   document.querySelector(".name").innerHTML = name.toUpperCase();
  //   document.querySelector("#max").innerHTML = `${maxVal}`;
  //   document.querySelector("#min").innerHTML = `${minVal}`;

  console.log(result, name, maxVal, minVal);
}

// function parseValues(max, min) {
//   /// parse values min and max
//   max += "";
//   min += "";
//   if (maxVal.length > 3) {
//       (string) =>{
//     for(let i=0;i<string.length;i++){
//     maxVal.slice();
//     }
//     }
// }

document.querySelector(".btn").addEventListener("click", getDataCrypto);
