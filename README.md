# Explora Chalatenango

Sitio web académico desarrollado con HTML5, CSS3 y JavaScript vanilla.

## Estructura

```text
explora_chalatenango/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── montanas.svg
    ├── el-pital.svg
    ├── la-palma.svg
    └── san-ignacio.svg
```

## Ejecutar localmente

1. Descarga y descomprime el proyecto.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` en el navegador (recomendado: extensión Live Server).

No requiere instalación de dependencias ni servidor backend.

## Funcionalidades

- Menú de navegación adaptable a móvil.
- Filtro por categoría y búsqueda de destinos.
- Cambio entre tema claro y oscuro.
- Validación de correo en el formulario de demostración.
- Tabla semántica con rutas orientativas.
- Diseño responsive y soporte básico de accesibilidad.

## Control de versiones

El examen solicita al menos un commit explícito por cada sección principal. Para que el historial refleje el proceso real, inicializa Git y registra cada parte después de implementarla:

```bash
git init
git add index.html styles.css script.js assets README.md
git commit -m "chore: crear estructura inicial del proyecto"

# En el desarrollo por etapas, realiza los commits de cada sección:
git add index.html styles.css
git commit -m "feat: construir identidad y encabezado"

git add index.html styles.css script.js
git commit -m "feat: implementar navegación principal"

git add index.html styles.css script.js assets
git commit -m "feat: desarrollar contenido, tarjetas y tabla"

git add index.html styles.css script.js
git commit -m "feat: agregar formulario y pie de página"
```

**Nota:** los commits anteriores son una guía de mensajes. Para demostrar un historial auténtico, lo correcto es hacer cada commit cuando completes esa etapa, en lugar de crear todos al final.

## Personalización antes de entregar

- Revisa que puedas explicar cada función de `script.js`.
- Verifica los datos y descripciones de los destinos.
- Prueba el sitio en móvil y escritorio.
- Completa tus datos académicos donde corresponda si el docente lo solicita.
- Sigue las indicaciones del examen sobre documentación y evidencias de herramientas utilizadas.
