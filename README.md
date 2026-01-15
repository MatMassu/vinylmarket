# Vinyl Market (0.0.5)

**E-commerce de vinilos usados y de colección construido con Next.js**

## Objetivo 
Comercializar una colección de vinilos usados mediante una interfaz fluida, simple e intuitiva.

Cualquier potencial comprador puede buscar los productos de su interés, agregarlos a un carrito, y elegir si desea recibirlos en su domicilio mediante un énvio tercerizado o buscarlos en su lugar de origen, todo desde una misma aplicación web construida con formato SPA.

## Roadmap de Funcionalidades
### UX/UI
* [x] Grilla de productos con imágen, artista, álbum, y precio en ARS.
* [x] Busqueda de productos mediante parametros en URL, con debouncing para minimizar la cantidad de requests.
* [ ] Filtros por artista, álbum y disponibilidad.
* [ ] Sorting alfabético y por precio.
* [ ] Paginación.
* [ ] Modal interactivo por vinilo con más detalles: descripción, tracklist, condición, y preview de calidad sonora.

### Back-end
* [ ] Conexión con base de datos.
* [ ] Hosting con dominio personalizado.
* [ ] Caching para persistencia de carrito.

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
