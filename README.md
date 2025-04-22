# 🧪 Sistema de Trazabilidad

Este proyecto es una aplicación web pensada para reemplazar el uso de Excel en la gestión de trazabilidad de una empresa real de esterilización de instrumentos médicos.  
Utiliza Django como backend (API REST) y React como frontend, siguiendo una arquitectura desacoplada y escalable.

---

## ⚙️ Tecnologías utilizadas

- **Backend**: Python 3.12, Django 5.2, Django REST Framework
- **Base de datos**: SQLite (desarrollo)
- **Frontend**: React 19 (Vite + React)
- **Control de versiones**: Git + GitHub
- **Hosting**: _Por definir_
---

## 📦 Instalación

### 💬 Requisitos previos
- Python 3.12
- Node.js 20
- Git
- Editor de código de preferencia
- Postman (opcional para el desarrollo)
---

1. Clonar el repositorio
```bash
git clone https://github.com/Elebann/trazabilidad.git
```
> [!TIP]
> Puedes poner un parametro adicional luego del enlace de github que modifica el nombre de la carpeta que contendrá el proyecto en tu computador. Por defecto es `trazabilidad`.

## 🐍 Instrucciones – Backend

1. Crear un entorno virtual en `/backend`
```bash
cd backend
python -m venv venv
```

2. Activar el entorno virtual
```bash
# En Windows
cd venv\Scripts\
./activate

# En Linux/MacOS
source venv/bin/activate
```

3. Instalar las dependencias (Vuelve a la carpeta `/backend`)
```bash
pip install -r requirements.txt
```

4. Ya podemos ejecutar el servidor
```bash
python manage.py runserver
```
> [!IMPORTANT]
> Es obligatorio tener el archivo .env en tu carpeta `/backend`. Por razones lógicas, se comparte de manera privada.

5. Abrir el navegador en http://localhost:8000/ para ver el backend en funcionamiento.

> [!NOTE]
> El avance de la API se encuentra en la ruta http://127.0.0.1:8000/app/api/v1/

_El server se cierra con CTRL + C_

6. (Opcional) Crear un superusuario para acceder al panel de administración
```bash
python manage.py createsuperuser
```

## ⚛️ Instrucciones – Frontend

1. Instalar el módulo de node en `/frontend`
```bash
cd frontend
npm install
```
El archivo `package.json` ya contiene todas las dependencias necesarias para el proyecto.

2. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
_El server se cierra con CTRL + C_

3. Abrir el navegador en http://localhost:5173/ para ver el frontend en funcionamiento.
