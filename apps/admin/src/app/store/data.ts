export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
};

export type Order = {
  id: string;
  date: string;
  customer: string;
  email: string;
  items: string;
  total: number;
  status: "Delivered" | "Processing" | "Shipped";
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Pro Stand",
    description: "Aluminium laptop stand with ergonomic tilt.",
    price: 49.99,
    category: "Accessories",
    stock: 12,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Compact TKL mechanical keyboard with tactile switches.",
    price: 129.99,
    category: "Keyboards",
    stock: 2,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    description: "Expand your ports with HDMI 4K and 100W PD charging.",
    price: 59.99,
    category: "Accessories",
    stock: 20,
    image: "https://images.unsplash.com/photo-1616578273461-3a99ce422de6?w=400",
  },
  {
    id: 4,
    name: "4K Webcam",
    description: "Ultra HD webcam with autofocus and privacy shutter.",
    price: 89.99,
    category: "Cameras",
    stock: 0,
    image: "https://images.unsplash.com/photo-1623949556303-b0d17d198863?w=400",
  },
  {
    id: 5,
    name: "XL Desk Mat",
    description: "900x400mm premium stitched desk mat.",
    price: 34.99,
    category: "Accessories",
    stock: 30,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with 12-month battery life.",
    price: 44.99,
    category: "Mice",
    stock: 1,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
  },
  {
    id: 7,
    name: "Monitor Light Bar",
    description: "Asymmetric screen light bar with auto-dimming.",
    price: 39.99,
    category: "Lighting",
    stock: 0,
    image: "https://images.unsplash.com/photo-1618133030686-e1186525ebcc?w=400",
  },
  {
    id: 8,
    name: "Cable Management Kit",
    description: "Complete cable management solution.",
    price: 24.99,
    category: "Accessories",
    stock: 25,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
  },
];

export const ORDERS: Order[] = [
  {
    id: "ORD-001",
    date: "12 May 2025",
    customer: "Alex Smith",
    email: "user@techstore.com",
    items: "MacBook Pro Stand, Mechanical Keyboard",
    total: 179.98,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "28 Apr 2025",
    customer: "Jane Doe",
    email: "jane@example.com",
    items: "Wireless Mouse x2, XL Desk Mat",
    total: 124.97,
    status: "Delivered",
  },
  {
    id: "ORD-003",
    date: "2 May 2025",
    customer: "Bob Johnson",
    email: "bob@example.com",
    items: "USB-C Hub 7-in-1",
    total: 59.99,
    status: "Shipped",
  },
  {
    id: "ORD-004",
    date: "14 May 2025",
    customer: "Alex Smith",
    email: "user@techstore.com",
    items: "Monitor Light Bar, Cable Management Kit x2",
    total: 89.97,
    status: "Processing",
  },
];