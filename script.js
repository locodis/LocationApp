const button = document.querySelector("button");
button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        //button.innerText = navigator.geolocation.getCurrentPosition(onSuccess, onError);
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }

     else {
        button.innerText = "browseriniz geo lokasyon desteklememektedirr !!!";
    }

});
function onSuccess (position){
    let {latitude,longitude} =position.coords;
    //fetch işlemi yapacağız elimizdeki parameterelerle istek atıp konumun dönmesini  bekleriz
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY`)//api key gerekiyor belirli limitlerde işlemler ücretsiz kullanacağımız -->OpenCage GeocodinAPI
    .then(response => console.log(response.json()).then(result => {
        let allDetails = result.results[0].components;// burası veri okumayla ilgili api dan dönen veriden parametrelerle
        let {county, country, postcode} = allDetails; // allDetails değişkeninden istediğimiz verileri diziya alıyoruz :( biraz gıcık zor)
            button.innerText = `bolge: ${county}, posta kodu:  ${postcode} ve ulke : ${country}`;
    })).catch(error);
    
    console.log({county, country, postcode});
   console.log(latitude,longitude);
   button.innerText = `konumunuz: parelel: ${latitude} ve meridyen : ${longitude} indedir :)`;
}

function onError(error){
if(error.code == 1){// kullanıcı izin vermezse
    button.innerText = "izin vermediniz";
     
} else if (error.code == 2){// lokasyon uygun değilse
    button.innerText = "location uygun değil"
} else {// herhangi bi başka hata oluşunca 
    button.innerText = "bi şeyler yanlış gitti"
console.table(error);
}
button.setAttribute("disabled", "true");// kullanıcı izin vermezse button disabled olacak
}