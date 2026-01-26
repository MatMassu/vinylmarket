export type Product = {
  id: string;
  title: string;
  artist: string;
  price: number;
  stock: number;
  image: string;
};

export const rawProducts: Product[] = [
  { id: "vinyl-001", artist: "Miles Davis", title: "Kind of Blue", price: 29990, stock: 1 },
  {
    id: "vinyl-002",
    artist: "Pink Floyd",
    title: "The Dark Side of the Moon",
    price: 34990,
    stock: 3,
  },
  { id: "vinyl-003", artist: "The Beatles", title: "Abbey Road", price: 32500, stock: 2 },
  { id: "vinyl-004", artist: "Nirvana", title: "Nevermind", price: 27990, stock: 1 },
  { id: "vinyl-005", artist: "Radiohead", title: "OK Computer", price: 31000, stock: 2 },
  {
    id: "vinyl-006",
    artist: "David Bowie",
    title: "The Rise and Fall of Ziggy Stardust",
    price: 28750,
    stock: 1,
  },
  { id: "vinyl-007", artist: "Fleetwood Mac", title: "Rumours", price: 26990, stock: 1 },
  {
    id: "vinyl-008",
    artist: "Kendrick Lamar",
    title: "To Pimp a Butterfly",
    price: 35000,
    stock: 0,
  },
  { id: "vinyl-009", artist: "Bob Dylan", title: "Highway 61 Revisited", price: 24990, stock: 1 },
  { id: "vinyl-010", artist: "Prince", title: "Purple Rain", price: 30000, stock: 1 },
  { id: "vinyl-011", artist: "Led Zeppelin", title: "IV", price: 33500, stock: 1 },
  {
    id: "vinyl-012",
    artist: "The Velvet Underground",
    title: "The Velvet Underground",
    price: 29000,
    stock: 0,
  },
  {
    id: "vinyl-013",
    artist: "Pink Floyd",
    title: "Wish You Were Here",
    price: 34000,
    stock: 2,
  },
  {
    id: "vinyl-014",
    artist: "The Beatles",
    title: "Revolver",
    price: 31500,
    stock: 1,
  },
  {
    id: "vinyl-015",
    artist: "Radiohead",
    title: "In Rainbows",
    price: 29500,
    stock: 0,
  },
  {
    id: "vinyl-016",
    artist: "Miles Davis",
    title: "Bitches Brew",
    price: 33000,
    stock: 1,
  },
  {
    id: "vinyl-017",
    artist: "Led Zeppelin",
    title: "Houses of the Holy",
    price: 32000,
    stock: 2,
  },
  {
    id: "vinyl-018",
    artist: "David Bowie",
    title: "Heroes",
    price: 30500,
    stock: 1,
  },
  {
    id: "vinyl-019",
    artist: "Nirvana",
    title: "In Utero",
    price: 28990,
    stock: 0,
  },
  {
    id: "vinyl-020",
    artist: "Bob Dylan",
    title: "Blonde on Blonde",
    price: 31000,
    stock: 1,
  },
  {
    id: "vinyl-021",
    artist: "Fleetwood Mac",
    title: "Tango in the Night",
    price: 27500,
    stock: 1,
  },
  {
    id: "vinyl-022",
    artist: "Prince",
    title: "1999",
    price: 32500,
    stock: 1,
  },
  {
    id: "vinyl-023",
    artist: "Kendrick Lamar",
    title: "DAMN.",
    price: 36000,
    stock: 1,
  },
  {
    id: "vinyl-024",
    artist: "The Velvet Underground",
    title: "White Light / White Heat",
    price: 29500,
    stock: 0,
  },
];

export const products: Product[] = rawProducts.map((product) => ({
  ...product,
  image: `https://picsum.photos/seed/${product.id}/400/400`,
}));
