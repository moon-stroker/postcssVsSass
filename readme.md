# Boilerplate with Gulp + PostCSS&css-next + Babel

Este es un starter pack para probar proyectos en Sass y PostCSS  

## Instalación

En la terminal

```javascript
npm i -D
```

## Estructura de carpetas  
```
├── css/
│   ├── main.css
├── source/
│   ├── css
│   │   ├── components/
│   │   │   ├── fonts.css
│   │   │   ├── general.css
│   ├── sass
│   │   ├── components/
│   │   │   ├── fonts.scss
│   │   │   ├── general.scss
│   │   ├── main.css
```
Los archivos de desarrolo en PostCSS y sass, están alojados dentro de la carpeta source.

# Ejecutar
Consta de dos configuraciones básicas para desarrollo y producción

### Desarrollo

En la terminal

```javascript
gulp serve-postcss
```
o

```javascript
gulp serve-sass
```

Esto arrancará un servidor node, el cual cuenta con un browserSync que permitira que todos los cambios realizados se refresquen automaticamente en el navegador. Además transformará los postCss a un solo main.css.



