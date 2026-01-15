export type Product = {
  id: string;
  title: string;
  artist: string;
  price: number;
};

export const products: Product[] = [
  { id: "vinyl-001", artist: "Miles Davis", title: "Kind of Blue", price: 29990 },
  { id: "vinyl-002", artist: "Pink Floyd", title: "The Dark Side of the Moon", price: 34990 },
  { id: "vinyl-003", artist: "The Beatles", title: "Abbey Road", price: 32500 },
  { id: "vinyl-004", artist: "Nirvana", title: "Nevermind", price: 27990 },
  { id: "vinyl-005", artist: "Radiohead", title: "OK Computer", price: 31000 },
  {
    id: "vinyl-006",
    artist: "David Bowie",
    title: "The Rise and Fall of Ziggy Stardust",
    price: 28750,
  },
  { id: "vinyl-007", artist: "Fleetwood Mac", title: "Rumours", price: 26990 },
  { id: "vinyl-008", artist: "Kendrick Lamar", title: "To Pimp a Butterfly", price: 35000 },
  { id: "vinyl-009", artist: "Bob Dylan", title: "Highway 61 Revisited", price: 24990 },
  { id: "vinyl-010", artist: "Prince", title: "Purple Rain", price: 30000 },
  { id: "vinyl-011", artist: "Led Zeppelin", title: "IV", price: 33500 },
  {
    id: "vinyl-012",
    artist: "The Velvet Underground",
    title: "The Velvet Underground",
    price: 29000,
  },
];
