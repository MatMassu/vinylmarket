# Vinyl Market (v0.4.0)

**E-commerce de vinilos usados y de colección basado en Next.js**

## Objetivo 
Comercializar una colección de vinilos usados mediante una interfaz fluida, simple e intuitiva.

Cualquier potencial comprador puede buscar los productos de su interés, agregarlos a un carrito, y elegir si desea recibirlos en su domicilio mediante un énvio tercerizado o buscarlos en su lugar de origen, todo desde una misma aplicación web construida con formato SPA.

## Roadmap de Funcionalidades
### UX/UI
* [x] Grilla de productos con imágen, artista, álbum, y precio en ARS. (v0.1.0)
* [x] Busqueda de productos mediante parametros en URL, con debouncing para minimizar la cantidad de requests. (v0.1.0)
* [x] Filtros por artista, álbum y disponibilidad. (v0.2.0)
* [x] Sorting alfabético y por precio. (v0.3.0)
* [ ] Paginación.
* [ ] Modal interactivo por vinilo con más detalles: descripción, tracklist, condición, y preview de calidad sonora.
* [ ] Carrito dinámico y sistema de check-out con manejo de pagos y envío.

### Back-end
* [ ] Conexión con base de datos.
* [ ] Hosting con dominio personalizado.
* [ ] Caching para persistencia de carrito.
* [ ] Mejoras de seguridad y performance.

## Metodología
Este sítio está siendo construido tomando en cuenta todo lo aprendido en base a mis anteriores proyectos y estudio preliminar. 

Fundamentalmente:
* Priorizar tener un sitio completamente funcional, luego añadir claridad y estética, y finalmente maximizar performance.
* Diseño mobile-first, con adaptación a desktop y tablets.
* Accesibilidad (filosofía A11Y, atributos ARIA, compatibilidad con navegación por teclado y screen-readers).
* Minimizar dependencias y evitar CSS hacks.
* Código siguiendo best practices de diseño web, clean code y principios SOLID.

## Tools & Stack
Next.JS | React.js |TypeScript | TailwindCSS | PostgreSQL
