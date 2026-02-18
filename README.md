# Vinyl Market (v0.9.3)
<a href=https://vinilomarket.vercel.app/>
<img width="1920" height="1005" alt="image" src="https://github.com/user-attachments/assets/00e8731c-e407-44cb-a40d-e84b5258022d" />
</a>

**E-commerce de vinilos usados y de colección basado en Next.js**

## Objetivo 
Comercializar una colección de vinilos usados mediante una interfaz fluida, simple e intuitiva.

Cualquier potencial comprador puede buscar los productos de su interés, agregarlos a un carrito, y elegir si desea recibirlos en su domicilio mediante un énvio tercerizado o buscarlos en su lugar de origen, todo desde una misma aplicación web construida con formato SPA.

## Roadmap de Funcionalidades
### UX/UI
* [x] Grilla de productos con imágen, artista, álbum, y precio en ARS. (v0.1.0)
* [x] Busqueda de productos mediante parametros en URL, con debouncing para minimizar la cantidad de requests. (v0.1.0)
* [x] Filtros por artista y condición mediante slider con rango. (v0.2.0)
* [x] Sorting por mayor y menor precio. (v0.3.0)
* [x] Paginación. (v0.5.0)
* [x] Modal interactivo por vinilo con más detalles: descripción, tracklist, condición, y preview de calidad sonora. (v0.6.0)
* [x] Carrito dinámico y sistema de check-out con manejo de pagos y envío. (v0.7.0)

### Back-end
* [x] Caching para persistencia de carrito. (v0.8.0)
* [x] Conexión a base de datos Neon serverless e imagenes hosteadas con Vercel Blob. (v0.9.0)
* [ ] Mejoras de seguridad y performance.

### Mejoras
* [x] Diseño responsive: sitio para desktop y móvil. (v0.6.0)
* [x] SEO y accesibilidad: Modal con ruta paralela e intercepción de página. (v0.6.1)
* [x] Imágenes con tamaño adaptativo: carrito (96x96), grilla de productos (768x768), y modal (1536x1536). (v0.9.0)

## Metodología
Este sítio está siendo construido tomando en cuenta todo lo aprendido en base a mis anteriores proyectos y estudio preliminar. 

Fundamentalmente:
* Priorizar tener un sitio completamente funcional, luego añadir claridad y estética, y finalmente maximizar performance.
* Diseño mobile-first, con adaptación a desktop y tablets.
* Accesibilidad (filosofía A11Y, atributos ARIA, compatibilidad con navegación por teclado y screen-readers).
* Minimizar dependencias y evitar CSS hacks.
* Código siguiendo best practices de diseño web, clean code y principios SOLID.

## Tools & Stack
Next.js | React.js | TypeScript | TailwindCSS | PostgreSQL
