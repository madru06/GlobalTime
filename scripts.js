const now = new Date();
let country = geoplugin_countryName();
let ctryListFormatted = [];
let selBaseCountry = document.getElementById("selBaseCountry");
let selTargetCountry = document.getElementById("selTargetCountry");
let inpBaseTime = document.getElementById("inpBaseTime");
axios.get('https://restcountries.com/v3.1/all')
    .then(function (response) {
        let ctryList = response.data;

        ctryList.forEach(item => {
            ctryListFormatted.push([item.name.common, item.altSpellings[0], item.timezones]);
        });
        console.log(ctryListFormatted);
        selBaseCountry.innerHTML = '';
        selTargetCountry.innerHTML = '<option selected disabled>(Select)</option>';

        ctryListFormatted.sort().forEach(item=>{
            selBaseCountry.innerHTML += `
                <option value="${item[1]}" data-timezones="${item[2]}" ${item[0] === country ? "selected" : ""}>
                        ${item[0]}
                </option>
            `;

            selTargetCountry.innerHTML += `
                <option value="${item[1]}" data-timezones="${item[2]}"}>
                        ${item[0]}
                </option>
            `;
        });
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });

let baseTime = now.toTimeString();
inpBaseTime.value = baseTime.substring(0,5);