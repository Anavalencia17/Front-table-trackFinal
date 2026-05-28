# 🍽️ TableTrack — Gestor de Reservas

> Aplicación SPA para que los anfitriones de un restaurante gestionen reservas de mesas de forma eficiente, con una interfaz elegante en tonos **Rosa Cuarzo** y **Azul Serenidad**.

## 🌐 Demo en vivo

👉 **https://startling-zuccutto-9af21b.netlify.app**

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

URL base de la API:
```
https://6a1769a21878294b597b5c76.mockapi.io/api/v1
```

Recurso: `/reservas` con los campos:

| Campo | Tipo |
|---|---|
| `id` | auto |
| `nombreCliente` | String |
| `fechaHora` | String (ISO datetime) |
| `cantidadPersonas` | Number |
| `estado` | String (Confirmada / En Espera / Finalizada) |

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
git clone https://github.com/Anavalencia17/Front-table-trackFinal.git
cd Front-table-trackFinal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
VITE_API_URL=https://6a1769a21878294b597b5c76.mockapi.io/api/v1
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