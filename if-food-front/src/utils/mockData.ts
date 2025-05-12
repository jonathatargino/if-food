interface Product {
  id: string;
  value: number;
  name: string;
  quantity: string;
  photo_url: string;
  description?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  user_id: string;
  seller_name: string;
  category: 'Doce' | 'Salgado';
}

interface Store {
  id: string;
  name: string;
  photo_url: string;
  categories: ('Doce' | 'Salgado')[];
  rating: number;
  is_favorite: boolean;
}

// Helper function to create dates
const createDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockProducts: Product[] = [
  {
    id: '1',
    value: 2990,
    name: 'X-Burger Special',
    quantity: '1',
    photo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
    description: 'Delicious burger with special sauce',
    created_at: createDate(30),
    updated_at: createDate(30),
    user_id: 'seller1',
    seller_name: 'Burger House',
    category: 'Salgado'
  },
  {
    id: '2',
    value: 3490,
    name: 'Pizza Margherita',
    quantity: '1',
    photo_url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=500',
    description: 'Traditional Italian pizza',
    created_at: createDate(2),
    updated_at: createDate(2),
    user_id: 'seller2',
    seller_name: 'Pizza Express',
    category: 'Salgado'
  },
  {
    id: '3',
    value: 1890,
    name: 'Açaí Bowl',
    quantity: '1',
    photo_url: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?q=80&w=500',
    description: 'Fresh açaí bowl with fruits',
    created_at: createDate(15),
    updated_at: createDate(15),
    user_id: 'seller3',
    seller_name: 'Açaí Paradise',
    category: 'Doce'
  },
  {
    id: '4',
    value: 2590,
    name: 'Chicken Wings',
    quantity: '10',
    photo_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=500',
    description: 'Crispy chicken wings',
    created_at: createDate(1),
    updated_at: createDate(1),
    user_id: 'seller4',
    seller_name: 'Wing Stop',
    category: 'Salgado'
  },
  {
    id: '5',
    value: 1590,
    name: 'Brigadeiros',
    quantity: '12',
    photo_url: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=500',
    description: 'Traditional Brazilian chocolate truffles',
    created_at: createDate(20),
    updated_at: createDate(20),
    user_id: 'seller5',
    seller_name: 'Doce Mania',
    category: 'Doce'
  },
  {
    id: '6',
    value: 2890,
    name: 'Coxinha',
    quantity: '5',
    photo_url: 'https://images.unsplash.com/photo-1575808142341-e39853744dbd?q=80&w=500',
    description: 'Brazilian chicken croquettes',
    created_at: createDate(3),
    updated_at: createDate(3),
    user_id: 'seller6',
    seller_name: 'Salgados Delícia',
    category: 'Salgado'
  },
  {
    id: '7',
    value: 1990,
    name: 'Pudim',
    quantity: '1',
    photo_url: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=500',
    description: 'Brazilian flan dessert',
    created_at: createDate(25),
    updated_at: createDate(25),
    user_id: 'seller5',
    seller_name: 'Doce Mania',
    category: 'Doce'
  },
  {
    id: '8',
    value: 3290,
    name: 'Pastel de Carne',
    quantity: '3',
    photo_url: 'https://receitasde.com.br/wp-content/uploads/2024/07/Pastel-de-Carne.jpg',
    description: 'Crispy meat pastry',
    created_at: createDate(0),
    updated_at: createDate(0),
    user_id: 'seller6',
    seller_name: 'Salgados Delícia',
    category: 'Salgado'
  },
  {
    id: '9',
    value: 2190,
    name: 'Mousse de Chocolate',
    quantity: '1',
    photo_url: 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?q=80&w=500',
    description: 'Rich chocolate mousse',
    created_at: createDate(4),
    updated_at: createDate(4),
    user_id: 'seller7',
    seller_name: 'Sweet & Salt',
    category: 'Doce'
  },
  {
    id: '10',
    value: 2790,
    name: 'Mini Quiches',
    quantity: '4',
    photo_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=500',
    description: 'Assorted mini quiches',
    created_at: createDate(5),
    updated_at: createDate(5),
    user_id: 'seller7',
    seller_name: 'Sweet & Salt',
    category: 'Salgado'
  }
];

export const mockStores: Store[] = [
  {
    id: 'seller1',
    name: 'Burger House',
    photo_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=200',
    categories: ['Salgado'],
    rating: 5,
    is_favorite: true
  },
  {
    id: 'seller2',
    name: 'Pizza Express',
    photo_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=200',
    categories: ['Salgado'],
    rating: 5,
    is_favorite: false
  },
  {
    id: 'seller3',
    name: 'Açaí Paradise',
    photo_url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=200',
    categories: ['Doce'],
    rating: 5,
    is_favorite: true
  },
  {
    id: 'seller4',
    name: 'Wing Stop',
    photo_url: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=80&w=200',
    categories: ['Salgado'],
    rating: 5,
    is_favorite: false
  },
  {
    id: 'seller5',
    name: 'Doce Mania',
    photo_url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=200',
    categories: ['Doce'],
    rating: 5,
    is_favorite: true
  },
  {
    id: 'seller6',
    name: 'Salgados Delícia',
    photo_url: 'https://images.unsplash.com/photo-1630409346824-4f0e7b080087?q=80&w=200',
    categories: ['Salgado'],
    rating: 4.8,
    is_favorite: false
  },
  {
    id: 'seller7',
    name: 'Sweet & Salt',
    photo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200',
    categories: ['Doce', 'Salgado'],
    rating: 4.9,
    is_favorite: true
  }
]; 