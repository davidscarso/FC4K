# Misión

## Qué construimos

### front
Un calendario simple.
Sera mostrado por una pagina web, en una de una panatalla de tinta electroni, como un ereader, u amazone kindle.
debe refrescarse sola cada un minuto.

copn un header con la hora en dormato 24, mas la fecha debajo, Ej: lunes 5 de sept de 2026. a la dereca el clima apra la cioudad de Huercal-overa.
El heder debe tenr dos botomes flehca izq y derecha apra padas al siguiente dia y al anterior. y un boton de hoy.

mostrara una lista resumen de calendadio.
una lista de bloques (eventos), con fecha, hora(si correspoende), titulo y detalles.
puede tener fecha y todo el dia o fehca y hora.
puede tener ubicacion, con detalle de la misma. texto por el momento.
la lista tendra un aseccion de hoy, separada por una linea las "proximas"

1. **reloj** -  en el heade un reloscon jora em formato 24 sin segundos, abajo la fecha de hoy: ej.: lunes 2 de mayo de 2026.
2. **Clima** -  a la derecha de la hora  en icoono el clima, resumido, debe tener un titulo pequeno con la huviucacion, por el momento solo para Huercal-overa.
3. **lista de eventos** — Hora y fecha en formato 24h, titulo y resumen detalle hasta 40 caractreres con tres puntos suspencivos, opcion de clic para mostrar mas y aumentar al total del texto del detalle.. actualiza por minuto.

### back
base de datos en mysql, para guardar eventos.
back que gestiones los eventos, creud del mismo. 
estos eventos deben ser cargados mor medio de un bot al que le escriva por wahtapp. 
A nalizar bien es back antes de implementar

## Para quién
- publico

## Qué NO es
