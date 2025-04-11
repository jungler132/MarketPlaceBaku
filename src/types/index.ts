export type Category = {
  id: string;
  name: string;
  icon: string; // эмодзи для иконки
};

export type Item = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  address: string;
  imageUrl: string;
  categoryId: string;
  date: string; // Дата создания объявления
};

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Пища', icon: '🍽️' },
  { id: 'clothes', name: 'Вещи', icon: '👕' },
  { id: 'electronics', name: 'Электроника', icon: '📱' },
  { id: 'construction', name: 'Стройматериалы', icon: '🏗️' },
  { id: 'home', name: 'Для дома', icon: '🏠' },
  { id: 'auto', name: 'Авто', icon: '🚗' },
  { id: 'other', name: 'Прочее', icon: '📦' },
]; 