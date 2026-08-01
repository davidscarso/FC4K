(function () {
  "use strict";

  const MONTHS_ES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const DAYS_ES = [
    "domingo", "lunes", "martes", "miércoles",
    "jueves", "viernes", "sábado"
  ];

  const WMO_ICONS = {
    0: "☀", 1: "🌤", 2: "⛅", 3: "☁",
    45: "🌫", 48: "🌫",
    51: "🌦", 53: "🌦", 55: "🌧",
    61: "🌧", 63: "🌧", 65: "🌧",
    71: "❄", 73: "❄", 75: "❄",
    80: "🌦", 81: "🌧", 82: "⛈",
    95: "⛈", 96: "⛈", 99: "⛈"
  };

  const DEFAULT_LOCATION = {
    lat: 37.3890,
    lon: -1.9364,
    name: "Huercal-Overa"
  };
  // TODO: scar esto de aca luego quye xista una api desde donde obter los eventos, por ahora se simula con datos locales
  const INITIAL_EVENTS = [
    { id: 1, date: "2026-08-01", time: "09:00", title: "Reunión equipo", detail: "Revisión semanal del proyecto" },
    { id: 2, date: "2026-08-01", time: "12:00", title: "Comprar supermercado", detail: "Frutas, verduras, leche" },
    { id: 3, date: "2026-08-01", time: "18:00", title: "Película en casa", detail: "Noche de cine familiar" },
    { id: 4, date: "2026-08-02", time: "10:00", title: "Dentista", detail: "Revisión anual" },
    { id: 5, date: "2026-08-03", time: "", title: "Cumpleaños María", detail: "Comprar regalo" },
    { id: 6, date: "2026-08-05", time: "19:00", title: "Cena con amigos", detail: "Restaurante La Terraza" }
  ];

  let allEvents = INITIAL_EVENTS.slice();
  let selectedDate = new Date();
  let weatherData = null;

  // --- UTILS ---

  function stripAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function isToday(date) {
    const now = new Date();
    return formatDateISO(date) === formatDateISO(now);
  }

  function truncate(str, max) {
    if (!str) return "";
    return str.length > max ? str.slice(0, max) + "..." : str;
  }

  // --- CLOCK ---

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clockTime").textContent = `${hours}:${minutes}`;

    const dayName = DAYS_ES[now.getDay()];
    const dayNum = now.getDate();
    const monthName = MONTHS_ES[now.getMonth()];
    const year = now.getFullYear();

    document.getElementById("clockDate").textContent =
      `${dayName} ${dayNum} de ${monthName} de ${year}`;
  }

  // --- GEOLOCATION & WEATHER ---

  function initGeolocation() {
    // if (!navigator.geolocation) {
    //   reverseGeocode(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    //   fetchWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    //   document.getElementById("weatherLocation").textContent = DEFAULT_LOCATION.name;
    //   return;
    // }

    // navigator.geolocation.getCurrentPosition(
    //   (pos) => {
    //     const { latitude, longitude } = pos.coords;
    //     reverseGeocode(latitude, longitude);
    //     fetchWeather(latitude, longitude);
    //   },
    //   () => {
    //     reverseGeocode(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    //     fetchWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    //     document.getElementById("weatherLocation").textContent = DEFAULT_LOCATION.name;
    //   }
    // );

    // reverseGeocode(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    fetchWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    document.getElementById("weatherLocation").textContent = DEFAULT_LOCATION.name;
  }

  function reverseGeocode(lat, lon) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const city = data.locality || data.city || data.principalSubdivision || "";
        document.getElementById("weatherLocation").textContent = stripAccents(city);
      })
      .catch(() => {
        document.getElementById("weatherLocation").textContent = "";
      });
  }

  function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

    if (window.fetch) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          weatherData = data.current;
          renderWeather();
        })
        .catch(() => {
          document.getElementById("weatherIcon").textContent = "--";
          document.getElementById("weatherTemp").textContent = "--°";
        });
    } else {
      document.getElementById("weatherIcon").textContent = "--";
      document.getElementById("weatherTemp").textContent = "--°";
    }

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     weatherData = data.current;
    //     renderWeather();
    //   })
    //   .catch(() => {
    //     document.getElementById("weatherIcon").textContent = "--";
    //     document.getElementById("weatherTemp").textContent = "--°";
    //   });
  }

  function renderWeather() {
    if (!weatherData) return;

    const code = weatherData.weather_code;
    const temp = Math.round(weatherData.temperature_2m);

    document.getElementById("weatherIcon").textContent = WMO_ICONS[code] || "☁";
    document.getElementById("weatherTemp").textContent = `${temp}°`;
  }

  // --- EVENTS ---

  function loadEvents() {
    allEvents = INITIAL_EVENTS.slice();
    renderEvents();
    updateLastUpdate();
  }

  function renderEvents() {
    const todayStr = formatDateISO(new Date());
    const selectedStr = formatDateISO(selectedDate);

    const todayEvents = allEvents
      .filter((e) => e.date === todayStr)
      .sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));

    const upcomingEvents = allEvents
      .filter((e) => e.date > selectedStr)
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return (a.time || "99:99").localeCompare(b.time || "99:99");
      })
      .slice(0, 10);

    renderEventList("todayEvents", todayEvents);
    renderEventList("upcomingEvents", upcomingEvents);
  }

  function renderEventList(containerId, events) {
    const container = document.getElementById(containerId);

    if (events.length === 0) {
      container.innerHTML = '<p class="events-empty">No hay eventos</p>';
      return;
    }

    container.innerHTML = events
      .map((event) => {
        const timeClass = event.time ? "event-time" : "event-time event-time--allday";
        const timeText = event.time || "Todo el día";
        const detail = truncate(event.detail, 40);

        return `
          <div class="event-card" data-id="${event.id}">
            <span class="${timeClass}">${timeText}</span>
            <div class="event-info">
              <span class="event-title">${escapeHtml(event.title)}</span>
              ${detail ? `<span class="event-detail">${escapeHtml(detail)}</span>` : ""}
            </div>
          </div>
        `;
      })
      .join("");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // --- NAVIGATION ---

  function initNavigation() {
    document.getElementById("prevDay").addEventListener("click", () => {
      selectedDate.setDate(selectedDate.getDate() - 1);
      renderEvents();
    });

    document.getElementById("nextDay").addEventListener("click", () => {
      selectedDate.setDate(selectedDate.getDate() + 1);
      renderEvents();
    });

    document.getElementById("todayBtn").addEventListener("click", () => {
      selectedDate = new Date();
      renderEvents();
    });
  }

  // --- LAST UPDATE ---

  function updateLastUpdate() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    document.getElementById("lastUpdate").textContent = `Última actualización: ${h}:${m}`;
  }

  // --- INIT ---

  function init() {
    updateClock();
    setInterval(updateClock, 1000);

    loadEvents();
    setInterval(loadEvents, 60000);

    initNavigation();
    initGeolocation();

    setInterval(() => {
      if (weatherData) {
        initGeolocation();
      }
    }, 600000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
