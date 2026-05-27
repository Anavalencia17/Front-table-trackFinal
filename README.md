# 🍽️ TableTrack — Gestor de Reservas

> Aplicación SPA para que los anfitriones de un restaurante gestionen reservas de mesas de forma eficiente, con una interfaz elegante en tonos **Rosa Cuarzo** y **Azul Serenidad**.

---

## 🚀 Stack Tecnológico

| Herramienta | Versión |
|---|---|
| React | 18 |
| Vite | 5 |
| react-router-dom | 6 |
| Tailwind CSS | 3 |
| SweetAlert2 | 11 |
| Axios | 1.x |
| MockAPI | — |

---

## 🔗 API (MockAPI)

Crea un proyecto en [mockapi.io](https://mockapi.io) con el recurso `/reservas` y los campos:

```
id            (auto)
nombreCliente string
fechaHora     string  (ISO datetime)
cantidadPersonas number
estado        string  (Confirmada | En Espera | Finalizada)
```

Copia la URL base de tu proyecto (ej: `https://xxxxxxxxxx.mockapi.io/api/v1`) y pégala en el archivo `.env.local`:

```env
VITE_API_URL=https://TU_ID.mockapi.io/api/v1
```

---

## 📁 Arquitectura de Carpetas

```
src/
├── components/        # Componentes reutilizables
│   ├── EmptyState.jsx
│   ├── Navbar.jsx
│   ├── PrivateRoute.jsx
│   ├── ReservationCard.jsx
│   ├── ReservationModal.jsx
│   ├── SkeletonCard.jsx
│   └── StatusFilter.jsx
├── pages/             # Vistas enrutadas
│   ├── LoginPage.jsx
│   └── PanelPage.jsx
├── services/          # Capa de comunicación con la API
│   └── api.js
├── utils/             # Helpers y constantes
│   ├── formatters.js
│   └── session.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Instrucciones de instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/table-track.git
cd table-track
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
# Edita .env.local y pega tu URL de MockAPI
```

### 4. Ejecutar en local

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 5. Build para producción

```bash
npm run build
```

---

## 🌐 Despliegue

Recomendado: **Vercel** o **Netlify**.

```bash
# Con Vercel CLI
vercel --prod
```

Recuerda agregar la variable de entorno `VITE_API_URL` en el panel de tu proveedor de hosting.

---

## ✨ Características

- 🔐 Sesión simulada con LocalStorage (nombre + turno)
- 🛡️ Protección de rutas (redirect automático al `/login`)
- 📋 CRUD completo: crear, ver, editar, finalizar y eliminar reservas
- 🔔 Confirmaciones y alertas con SweetAlert2
- ⏳ Skeletons de carga durante peticiones asíncronas
- 🎛️ Filtros por estado en tiempo real
- 📊 Estadísticas del turno en el panel
- 📱 Diseño 100% responsive (mobile-first)
- 🎨 Paleta Rosa Cuarzo + Azul Serenidad con glassmorphism

---

## 🌿 GitFlow

```
main
└── develop
    ├── feature/login-system
    ├── feature/reservations-crud
    └── feature/ui-polishing
```

---

*Desarrollado como prueba técnica para el cargo de Desarrollador Frontend Junior.*
