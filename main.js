rutaNiebla = "climas/nieblajpg.webp";
rutaNublado = "climas/nublado.jpeg";
rutaSol = "climas/soleado.avif";
rutaTormenta = "climas/tormenta.webp";
rutaLluvia = "climas/lluvia.avif";
rutaNieve = "climas/nevado.jpg";

let boton = document.getElementById("botonsubir");
boton.addEventListener("click", function () {
  let apikey = "ee363454df1addd6cc6bb954f18065ef";
  let container = document.getElementById("climacontainer");
  let ciudad = document.getElementById("ciudad").value;

  if (localStorage.length === 0) {
    const lista = [ciudad];
    localStorage.setItem("historial", JSON.stringify(lista));
  } else {
    let historial = JSON.parse(localStorage.getItem("historial"));
    if (historial === null || historial === undefined) {
      historial = [];
    }
    historial.push(ciudad);
    localStorage.setItem("historial", JSON.stringify(historial));
  }

  if (ciudad === "") {
    alert("Debes escribir una ciudad");
  } else {
    const body = document.getElementById("body");
    body.innerHTML = "";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric&lang=es`;
    fetch(url)
      .then((response) => response.json())
      .then((datos) => {
        let api = document.createElement("div");
        api.innerHTML = `
        <div id="recuadro">
            <p>Ciudad: ${datos.name}</p>
            <img src="https://openweathermap.org/img/wn/${
              datos.weather[0].icon
            }@2x.png" alt="Weather Icon">
            <p>Temperatura actual: ${datos.main.temp.toFixed(1)} °</p>
            <p>Sensacion térmica: ${datos.main.feels_like.toFixed(1)} °</p>
            <p>Mínima: ${datos.main.temp_min.toFixed(1)} °</p>
            <p>Máxima: ${datos.main.temp_max.toFixed(1)} °</p>
            <p>Presión: ${datos.main.pressure.toFixed(1)} Hpa</p>
            <p>Humedad: ${datos.main.humidity.toFixed(1)} %</p>
            <button class="estilos" id="extendido"> Ver pronostico extendido </button>
        </div> `;

        const fondodiv = document.getElementById("body");
        if (datos.weather[0].main === "Clouds") {
          fondodiv.style.backgroundImage = `url('${rutaNublado}')`;
          fondodiv.style.backgroundSize = "cover";
          fondodiv.style.backgroundPosition = "center";
        } else if (datos.weather[0].main === "Clear") {
          fondodiv.style.backgroundImage = `url('${rutaSol}')`;
          fondodiv.style.backgroundSize = "cover";
          fondodiv.style.backgroundPosition = "center";
        } else if (
          datos.weather[0].main === "Rain" ||
          datos.weather[0].main === "Drizzle"
        ) {
          fondodiv.style.backgroundImage = `url('${rutaLluvia}')`;
          fondodiv.style.backgroundSize = "cover";
          fondodiv.style.backgroundPosition = "center";
        } else if (
          datos.weather[0].main === "Mist" ||
          datos.weather[0].main === "Fog" ||
          datos.weather[0].main === "Smoke"
        ) {
          fondodiv.style.backgroundImage = `url('${rutaNiebla}')`;
          fondodiv.style.backgroundSize = "cover";
          fondodiv.style.backgroundPosition = "center";
        } else if (datos.weather[0].main === "Thunderstorm") {
          fondodiv.style.backgroundImage = `url('${rutaTormenta}')`;
          fondodiv.style.backgroundSize = "cover";
          fondodiv.style.backgroundPosition = "center";
        } else if (datos.weather[0].main === "Snow") {
          fondodiv.style.backgroundImage = `url('${rutaNieve}')`;
          fondodiv.style.backgroundSize = "cover";
          fondodiv.style.backgroundPosition = "center";
        }
        container.appendChild(api);
        body.appendChild(container);
        let extendido = document.getElementById("extendido");

        extendido.addEventListener("click", function () {
          let apikey = "ee363454df1addd6cc6bb954f18065ef";
          body.innerHTML = "";
          urlext = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apikey}&units=metric&lang=es`;
          fetch(urlext)
            .then((response) => response.json())
            .then((datosext) => {
              const fecha1 = new Date(datosext.list[0].dt_txt);
              const fecha2 = new Date(datosext.list[8].dt_txt);
              const fecha3 = new Date(datosext.list[16].dt_txt);
              const fecha4 = new Date(datosext.list[24].dt_txt);
              const fecha5 = new Date(datosext.list[32].dt_txt);

              const diasSemana = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miercoles",
                "Jueves",
                "Viernes",
                "Sabado",
              ];
              const dia1 = diasSemana[fecha1.getUTCDay()];
              const dia2 = diasSemana[fecha2.getUTCDay()];
              const dia3 = diasSemana[fecha3.getUTCDay()];
              const dia4 = diasSemana[fecha4.getUTCDay()];
              const dia5 = diasSemana[fecha5.getUTCDay()];

              let apiext = document.createElement("div");
              apiext.innerHTML = `
            <div class="contenedor">
            <div id="extendido">
            <p id="Dia">${dia1}</p>
            
            <p>Máxima:${datosext.list[0].main.temp_max.toFixed(0)}°</p>
            <p>Mínima:${datosext.list[0].main.temp_min.toFixed(0)}°</p>
            <p>Térmica:${datosext.list[0].main.feels_like.toFixed(0)}°</p>
            </div>
            <div id="extendido">
            <p id="Dia">${dia2}</p>
                        <p>Máxima:${datosext.list[8].main.temp_max.toFixed(
                          0
                        )}°</p>
            <p>Mínima:${datosext.list[8].main.temp_min.toFixed(0)}°</p>
            <p>Térmica:${datosext.list[8].main.feels_like.toFixed(0)}°</p>
            </div>
            <div id="extendido">
            <p id="Dia">${dia3}</p>
            
            <p>Máxima:${datosext.list[16].main.temp_max.toFixed(0)}°</p>
            <p>Mínima:${datosext.list[16].main.temp_min.toFixed(0)}°</p>
            <p>Térmica:${datosext.list[16].main.feels_like.toFixed(0)}°</p>
            </div>
            <div id="extendido">
            <p id="Dia">${dia4}</p>
            
            <p>Máxima:${datosext.list[24].main.temp_max.toFixed(0)}°</p>
            <p>Mínima:${datosext.list[24].main.temp_min.toFixed(0)}°</p>
            <p>Térmica:${datosext.list[24].main.feels_like.toFixed(0)}°</p>
            </div>
            <div id="extendido">
            <p id="Dia">${dia5}</p>
            
            <p>Máxima:${datosext.list[32].main.temp_max.toFixed(0)}°</p>
            <p>Mínima:${datosext.list[32].main.temp_min.toFixed(0)}°</p>
            <p>Térmica:${datosext.list[32].main.feels_like.toFixed(0)}°</p>
            </div>
            </div>`;
              body.appendChild(apiext);
              const botonvolver = document.createElement("button");
              botonvolver.classList.add("estilos");
              botonvolver.innerHTML = `Volver al inicio`;
              botonvolver.addEventListener("click", () => {
                window.location.href = document.referrer;
              });
              body.appendChild(botonvolver);
            });
        });
      });

    const botonvolver = document.createElement("button");
    botonvolver.classList.add("estilos");
    botonvolver.innerHTML = `Volver al inicio`;
    botonvolver.addEventListener("click", () => {
      window.location.href = document.referrer;
    });

    body.appendChild(botonvolver);
  }
});

let historial = localStorage.getItem("historial");
if (historial !== null) {
  const botonn = document.getElementById("historial");
  botonn.addEventListener("click", function () {
    let historialArray = JSON.parse(historial);
    const body = document.getElementById("body");
    if (historialArray.length > 0 && historial.length > 0) {
      let historialList = document.createElement("ul");
      historialList.id = "lista";
      historialArray.forEach(function (x) {
        let listItem = document.createElement("div");
        listItem.classList.add("ultimos");
        listItem.innerHTML = `<p id="item">${x}</p>`;
        historialList.appendChild(listItem);
      });

      body.appendChild(historialList);
    } else {
      alert("No hay nada en el historial");
    }
    botonn.disabled = true;
    let botonhist = document.querySelectorAll(".ultimos");
    botonhist.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        let ciudad = event.target.textContent.trim();
        window.location.href = `https://www.google.com/search?q=${ciudad}&sca_esv=82c0f5fcf9e8a56e&sxsrf=ACQVn08khJ4qVl1lA4h3rx6ZvgWsbestEg%3A1706911724524&source=hp&ei=7Ge9ZaPqHdrL1sQPo9yQqAQ&iflsig=ANes7DEAAAAAZb11_P5T1VLlRV-dKZsrR0B-J_iZaWNX&ved=0ahUKEwijkIHY1Y2EAxXapZUCHSMuBEUQ4dUDCA0&uact=5&oq=detroit&gs_lp=Egdnd3Mtd2l6IgdkZXRyb2l0MggQLhixAxiABDIIEC4YgAQYsQMyCBAuGLEDGIAEMggQLhiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiKClAAWO8GcAB4AJABAJgB6wGgAbwIqgEFMC42LjG4AQPIAQD4AQHCAgQQIxgnwgIKECMYgAQYigUYJ8ICCBAAGIAEGLEDwgIREC4YgAQYsQMYgwEYxwEY0QPCAgsQABiABBixAxiDAcICDhAuGIAEGLEDGMcBGNEDwgIEEAAYA8ICDRAAGIAEGLEDGEYY-QHCAgUQLhiABA&sclient=gws-wiz`;
      });
    });
  });
}
