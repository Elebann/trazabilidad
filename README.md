# 🧪 Sistema de Trazabilidad

Este proyecto es una aplicación web pensada para reemplazar el uso de Excel en la gestión de trazabilidad de una empresa real de esterilización de instrumentos médicos.  
Utiliza Django como backend (API REST) y React como frontend (SPA), siguiendo una arquitectura desacoplada y escalable.

---

## ⚙️ Tecnologías utilizadas

- **Backend**: Python 3.12, Django 5.2, Django REST Framework
- **Base de datos**: SQLite (desarrollo), compatible con PostgreSQL / MySQL
- **Frontend**: React 19 (con Vite)
- **Control de versiones**: Git + GitHub

---

## 📦 Instalación

### 💬 Requisitos previos
- Python 3.12
- Node.js 20
- Git
- Postman (opcional)

1. Clonar el repositorio
```bash
git clone https://github.com/Elebann/trazabilidad.git
```

## 🐍 Instrucciones – Backend

1. Crear un entorno virtual en `/backend`
```bash
cd backend
python -m venv venv
```

2. Activar el entorno virtual
```bash
# En Windows
venv\Scripts\activate
# En Linux/MacOS
source venv/bin/activate
```

3. Instalar las dependencias
```bash
pip install -r requirements.txt
```

4. Ya podemos ejecutar el servidor
```bash
python manage.py runserver
```
_El server se cierra con CTRL + C_

5. Abrir el navegador en http://localhost:8000/ para ver el backend en funcionamiento.


6. Crear un superusuario para acceder al panel de administración
```bash
python manage.py createsuperuser
```

## ⚛️ Instrucciones – Frontend

1. Instalar el módulo de node en `/frontend`
```bash
cd frontend #Si no estás en la carpeta
npm install
```
El archivo `package.json` ya contiene todas las dependencias necesarias para el proyecto.

2. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
_El server se cierra con CTRL + C_

3. Abrir el navegador en http://localhost:5173/ para ver el frontend en funcionamiento.