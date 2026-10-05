import type { MenuItem } from "@/lib/types";

// Temporary Unsplash photos until menu images are uploaded.
export const MENU_CATEGORIES = ["Tacos", "Platos Grandes", "Postres", "Bebidas"] as const;

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=800&q=80`;

/** Placeholder menu for the public site until menu items are managed in Firestore. */
export const SAMPLE_MENU: MenuItem[] = [
  {
    id: "al-pastor",
    name: "Al Pastor Taco",
    description: "Spit-roasted pork marinated in guajillo and achiote, grilled pineapple, onion, cilantro.",
    category: "Tacos",
    price: 3.75,
    image: photo("photo-1613514785940-daed07799d9b"),
  },
  {
    id: "carne-asada",
    name: "Carne Asada Taco",
    description: "Citrus-marinated grilled steak, salsa verde, onion and cilantro on a corn tortilla.",
    category: "Tacos",
    price: 4.25,
    image: photo("photo-1504544750208-dc0358e63f7f"),
  },
  {
    id: "birria",
    name: "Birria Tacos (3)",
    description: "Slow-braised beef and melted Oaxaca cheese, griddled crisp, with consommé for dipping.",
    category: "Tacos",
    price: 13.5,
    image: photo("photo-1599974579688-8dbdd335c77f"),
  },
  {
    id: "baja-fish",
    name: "Baja Fish Taco",
    description: "Beer-battered cod, chipotle crema, shredded cabbage and pickled red onion.",
    category: "Tacos",
    price: 4.5,
    image: photo("photo-1611250188496-e966043a0629"),
  },
  {
    id: "carnitas-burrito",
    name: "Carnitas Burrito",
    description: "Crispy braised pork, cilantro-lime rice, black beans, pico de gallo and guacamole.",
    category: "Platos Grandes",
    price: 12.0,
    image: photo("photo-1626700051175-6818013e1d4f"),
  },
  {
    id: "quesadilla",
    name: "Chicken Quesadilla",
    description: "Chipotle chicken and a three-cheese blend in a flour tortilla, served with salsa roja.",
    category: "Platos Grandes",
    price: 10.5,
    image: photo("photo-1618040996337-56904b7850b9"),
  },
  {
    id: "nachos",
    name: "Loaded Nachos",
    description: "Crisp tortilla chips, queso, black beans, pico de gallo, jalapeños and crema.",
    category: "Platos Grandes",
    price: 9.0,
    image: photo("photo-1582169296194-e4d644c48063"),
  },
  {
    id: "churros",
    name: "Churros con Chocolate",
    description: "Crisp cinnamon-sugar churros with warm Mexican chocolate for dipping.",
    category: "Postres",
    price: 6.0,
    image: photo("photo-1624371414361-e670edf4898d"),
  },
  {
    id: "fresas-con-crema",
    name: "Fresas con Crema",
    description: "Fresh strawberries folded into sweet vanilla cream, served chilled.",
    category: "Postres",
    price: 5.5,
    image: photo("photo-1488477181946-6428a0291777"),
  },
  {
    id: "paleta-fresa",
    name: "Paleta de Fresa",
    description: "Creamy strawberry ice pop made with real fruit chunks.",
    category: "Postres",
    price: 3.5,
    image: photo("photo-1517093157656-b9eccef91cb1"),
  },
  {
    id: "tamarindo",
    name: "Agua de Tamarindo",
    description: "Sweet-tart tamarind agua fresca over ice with a squeeze of lime, made fresh daily.",
    category: "Bebidas",
    price: 4.0,
    image: photo("photo-1556679343-c7306c1976bc"),
  },
  {
    id: "jamaica",
    name: "Agua de Jamaica",
    description: "Hibiscus agua fresca, lightly sweetened, with a hint of orange.",
    category: "Bebidas",
    price: 4.0,
    image: photo("photo-1595981267035-7b04ca84a82d"),
  },
  {
    id: "fresa",
    name: "Agua Fresca de Fresa",
    description: "Blended strawberries, lime and mint over plenty of ice.",
    category: "Bebidas",
    price: 4.5,
    image: photo("photo-1497534446932-c925b458314e"),
  },
];
