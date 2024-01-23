rutaLlovizna="climas/llovizna.avif"
rutaNublado="climas/nublado.jpeg"
rutaSol="climas/soleado.avif"
rutaTormenta="climas/tormenta.webp"
rutaLluvia="climas/lluvia.avif"
rutaNieve="climas/nevado.jpg"

let boton= document.getElementById("botonsubir")
boton.addEventListener("click",function(){
    let apikey="ee363454df1addd6cc6bb954f18065ef"
    let container= document.getElementById("climacontainer")
    let ciudad= document.getElementById("ciudad").value
    if (ciudad===""){
        alert("Debes escribir una ciudad")
    }else{
        const body= document.getElementById("body")
    body.innerHTML=""
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric&lang=es`
    fetch(url)
    .then(response => response.json())
    .then(datos=>{
        let api=document.createElement("div")   
        api.innerHTML=`
        <div id="recuadro">
            <p>Ciudad: ${datos.name}</p>
            <img src="https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png" alt="Weather Icon">
            <p>Temperatura actual: ${datos.main.temp.toFixed(1)} °</p>
            <p>Sensacion térmica: ${datos.main.feels_like.toFixed(1)} °</p>
            <p>Mínima: ${datos.main.temp_min.toFixed(1)} °</p>
            <p>Máxima: ${datos.main.temp_max.toFixed(1)} °</p>
            <p>Presión: ${datos.main.pressure.toFixed(1)} Hpa</p>
            <p>Humedad: ${datos.main.humidity.toFixed(1)} %</p>

        </div> `
        
        const fondodiv = document.getElementById("body")
        if (datos.weather[0].main==="Clouds"){
            fondodiv.style.backgroundImage = `url('${rutaNublado}')`;
            fondodiv.style.backgroundSize = "cover";
            fondodiv.style.backgroundPosition = "center"
        }else if(datos.weather[0].main==="Clear"){
            fondodiv.style.backgroundImage = `url('${rutaSol}')`;
            fondodiv.style.backgroundSize = "cover";
            fondodiv.style.backgroundPosition = "center"
        }else if(datos.weather[0].main==="Rain"){
            fondodiv.style.backgroundImage = `url('${rutaLluvia}')`;
            fondodiv.style.backgroundSize = "cover";
            fondodiv.style.backgroundPosition = "center"
        }else if(datos.weather[0].main==="Drizzle"){
            fondodiv.style.backgroundImage = `url('${rutaLlovizna}')`;
            fondodiv.style.backgroundSize = "cover";
            fondodiv.style.backgroundPosition = "center"
        }else if(datos.weather[0].main==="Thunderstorm"){
            fondodiv.style.backgroundImage = `url('${rutaTormenta}')`;
            fondodiv.style.backgroundSize = "cover";
            fondodiv.style.backgroundPosition = "center"
        }else if(datos.weather[0].main==="Snow"){ 
            fondodiv.style.backgroundImage = `url('${rutaNieve}')`;
            fondodiv.style.backgroundSize = "cover";
            fondodiv.style.backgroundPosition = "center"
        }
        container.appendChild(api)
        body.appendChild(container)    
    })    
    const botonvolver=document.createElement("button")
    botonvolver.innerHTML=`Volver al inicio`
    botonvolver.addEventListener("click",()=>{
        window.location.href = document.referrer
    })
    body.appendChild(botonvolver)
}
})



