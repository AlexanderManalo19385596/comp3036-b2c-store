export const USERS = [
  { id: 1, email: "user@techstore.com", name: "Alex", role: "user", password: "password123" },
  { id: 2, email: "jane@example.com", name: "Jane Doe", role: "user", password: "password123" },
  { id: 3, email: "bob@example.com", name: "Bob Johnson", role: "user", password: "password123" },
];

export const PRODUCTS = [
  { id: 1, name: "MacBook Pro Stand", description: "Aluminium laptop stand with ergonomic tilt for improved posture and airflow.", price: 49.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400", category: "Accessories", stock: 12 },
  { id: 2, name: "Mechanical Keyboard", description: "Compact TKL mechanical keyboard with tactile switches and RGB backlight.", price: 129.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", category: "Keyboards", stock: 2 },
  { id: 3, name: "USB-C Hub 7-in-1", description: "Expand your ports with HDMI 4K, 3x USB-A, SD card, and 100W PD charging.", price: 59.99, image: "https://images.unsplash.com/photo-1616578273461-3a99ce422de6?w=400", category: "Accessories", stock: 20 },
  { id: 4, name: "4K Webcam", description: "Ultra HD webcam with autofocus, built-in mic, and privacy shutter.", price: 89.99, image: "https://images.unsplash.com/photo-1623949556303-b0d17d198863?w=400", category: "Cameras", stock: 0 },
  { id: 5, name: "XL Desk Mat", description: "900x400mm premium stitched desk mat with non-slip rubber base.", price: 34.99, image: "https://plus.unsplash.com/premium_photo-1664699099191-f67e1f4aef40?w=400", category: "Accessories", stock: 30 },
  { id: 6, name: "Wireless Mouse", description: "Ergonomic wireless mouse with silent clicks and 12-month battery life.", price: 44.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", category: "Mice", stock: 15 },
  { id: 7, name: "Monitor Light Bar", description: "Asymmetric screen light bar with auto-dimming and USB-C power.", price: 39.99, image: "https://images.unsplash.com/photo-1618133030686-e1186525ebcc?w=400", category: "Lighting", stock: 1 },
  { id: 8, name: "Cable Management Kit", description: "Complete cable management solution with clips, velcro, and cable box.", price: 24.99, image: "https://plus.unsplash.com/premium_photo-1732730224748-f25e801ce6cf?w=400", category: "Accessories", stock: 25 },
];

export const ORDERS = [
  {
    id: 1,
    userId: 1,
    total: 179.98,
    status: "Delivered",
    createdAt: new Date("2025-05-12"),
    items: [
      { productId: 1, quantity: 1, price: 49.99 },
      { productId: 2, quantity: 1, price: 129.99 },
    ],
  },
  {
    id: 2,
    userId: 2,
    total: 124.97,
    status: "Delivered",
    createdAt: new Date("2025-04-28"),
    items: [
      { productId: 6, quantity: 2, price: 44.99 },
      { productId: 5, quantity: 1, price: 34.99 },
    ],
  },
  {
    id: 3,
    userId: 3,
    total: 59.99,
    status: "Shipped",
    createdAt: new Date("2025-05-02"),
    items: [
      { productId: 3, quantity: 1, price: 59.99 },
    ],
  },
  {
    id: 4,
    userId: 1,
    total: 89.97,
    status: "Processing",
    createdAt: new Date("2025-05-14"),
    items: [
      { productId: 7, quantity: 1, price: 39.99 },
      { productId: 8, quantity: 2, price: 24.99 },
    ],
  },
];