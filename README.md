🌦️ Weather Dashboard - DevChallenges
Este es un tablero de clima moderno y responsivo que permite a los usuarios consultar las condiciones meteorológicas actuales y el pronóstico para los próximos 5 días de cualquier ciudad del mundo.

!

🚀 Características
Detección de ubicación: La app identifica automáticamente tu ciudad al iniciar mediante tu dirección IP.

Búsqueda avanzada: Buscador de ciudades con sugerencias en tiempo real para facilitar la selección.

Pronóstico de 5 días: Visualización clara de las temperaturas máximas y mínimas para los días siguientes.

Cambio de unidades: Soporte para cambiar entre grados Celsius (°C) y Fahrenheit (°F).

Detalles detallados: Información sobre velocidad del viento (con dirección dinámica), humedad, visibilidad y presión atmosférica.

Diseño Responsivo: Adaptado para dispositivos móviles, tablets y computadoras de escritorio.

🛠️ Tecnologías utilizadas
React: Biblioteca principal para la interfaz de usuario.

Tailwind CSS: Para el diseño y estilos modernos.

Axios: Para realizar las peticiones a las APIs externas.

OpenWeather API: Proveedor de los datos climáticos y geográficos.

Ipinfo.io: Para la geolocalización inicial por IP.

Vite: Herramienta de construcción rápida para el desarrollo.

📂 Estructura del Proyecto
src/components/: Contiene las piezas visuales de la app (SearchBar, ForecastPanel, etc.).

src/hooks/: Contiene useWeather.jsx, que maneja toda la lógica y el estado de la aplicación.

src/services/: Contiene weatherApi.jsx, encargado de las llamadas a las APIs externas.

src/assets/: Imágenes, iconos y fondos utilizados.

⚙️ Instalación y Configuración
Clona este repositorio.

Instala las dependencias: npm install.

Crea un archivo .env en la raíz con tus llaves de API:

Fragmento de código
VITE_OPENWEATHER_KEY=tu_llave_aqui
VITE_IPINFO_KEY=tu_llave_aqui
Inicia el proyecto: npm run dev.