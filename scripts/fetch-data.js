document.addEventListener('DOMContentLoaded', start);

function start() {
    const theButton = document.getElementById('btn-fetch');
    theButton.onclick = handleButton; 
}

function handleButton() {
    const theSpan = document.getElementById('cryptoSelect'); 
    theSpan.innerHTML = "<option value=''>Loading...</option>"; // Temporary message
    fetchData(theSpan); // Call fetchData to bring in data from API
}


function fetchData(theSpan) {
    fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json())
        .then(data => {
            const cryptos = data.data; 
            theSpan.innerHTML = '';
            // loop through the array 
            // you could use a regular for loop also, but this syntax
            // is preferred
            
            let defaultchoice = document.createElement('option');
            defaultchoice.value = '';
            defaultchoice.textContent = 'Select a Cryptocurrency';
            theSpan.appendChild(defaultchoice);
            
            for (let i = 0; i < cryptos.length; i++) {
                let option = document.createElement('option');
                option.value = cryptos[i].id;
                option.textContent = cryptos[i].name;
                theSpan.appendChild(option);
            }

            console.log(cryptos);//view the array size w/ inspect element

            theSpan.onchange = function () {
                const selectedCryptoId = theSpan.value;
                for (let i = 0; i < cryptos.length; i++) { // for loop select until < cryptos length
                    if (cryptos[i].id === selectedCryptoId) {
                        updateCryptoInfo(cryptos[i]); //updating
                        break; 
                    }
                }
            };
            
        })
}

//update displayed information 
function updateCryptoInfo(crypto) {
    document.getElementById('cName').textContent = crypto.name;
    document.getElementById('cSymbol').textContent = crypto.symbol;
    document.getElementById('cSupply').textContent = Math.round(crypto.supply);
    document.getElementById('cPrice').textContent = parseFloat(crypto.priceUsd).toFixed(2);
    document.getElementById('cChange').textContent = parseFloat(crypto.changePercent24Hr).toFixed(2);
}
