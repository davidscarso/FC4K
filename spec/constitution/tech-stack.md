# Tech stack y convenciones

## Tecnologías

- **Lenguaje:** JavaScript vanilla (sin frameworks)
- **Framework / runtime:** Ninguno — archivos estáticos
- **Base de datos:** No aplica
- **Tests:** No hay suite — se valida abriendo en navegador
- **Despliegue:** Archivos estáticos (cualquier servidor o doble clic)

## Archivos / módulos clave

- `src/index.html` — estructura LCD
- `src/style.css` — estilo visual
- `src/app.js` — reloj + geolocalización + fetch API + render

## Comandos

- No hay. Abrir `src/index.html` en navegador.

## APIs

### Open-Meteo (clima)

- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Parámetros:** `latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
- **Frecuencia de consulta:** Cada 10 minutos.
- **Sin API key.**

### BigDataCloud (reverse geocoding)

- **Endpoint:** `https://api.bigdatacloud.net/data/reverse-geocode-client`
- **Parámetros:** `latitude={lat}&longitude={lon}&localityLanguage=es`
- **Sin API key.** Solo client-side, bajo Fair Use Policy.
- **Devuelve:** `city`, `principalSubdivision`, `countryName`.

## Convenciones

- Nombres en camelCase.
- CSS con custom properties para colores B&W.
- Sin dependencias npm.
- Texto de ubicación sin acentos: usar `stripAccents()` (NFD normalization) antes de mostrar ciudad/provincia.

## Estilo visual (B&W e-ink suave)

- Paleta: escala de grises suave, sin color.
- Fondo página: #ffffff (blanco).
- Superficie (bloques): #e8e8e8 (gris claro).
- Hover: #d0d0d0 (gris medio claro).
- Borde normal: #aaaaaa (gris suave), 1px.
- Borde fuerte: #666666 (gris oscuro), para outlines.
- Texto principal: #1a1a1a (casi negro).
- Texto secundario: #555555 (gris medio oscuro).
- Texto muted: #888888 (gris medio).
- Border-radius: 6px-12px (bordes redondeados suaves).
- Font: Courier New, monospace (sin dependencias externas).
- Énfasis: bold + tamaño mayor, sin color.
- Hover: sutil (#e8e8e8 → #d0d0d0), sin inversión brusca.
- Sin sombras. Sin color. Transiciones suaves (0.15s).

## Límites duros

- No agregar dependencias npm.
- No usar frameworks.
- No hacer server-side rendering.
