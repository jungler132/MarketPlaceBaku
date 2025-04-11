import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AdCard from '../components/AdCard';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import { CATEGORIES, Item } from '../types';
import { SAMPLE_ITEMS } from '../data/sampleData';

type RootStackParamList = {
  Home: undefined;
  Detail: { item: Item };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [items, setItems] = useState<{ [key: string]: Item[] }>(SAMPLE_ITEMS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });
  const [sortBy, setSortBy] = useState<string>('default');

  // Фильтрация и сортировка товаров
  const filteredItems = useMemo(() => {
    const categoryItems = items[selectedCategory] || [];
    let filtered = categoryItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price >= priceFilter.min && item.price <= priceFilter.max;
      return matchesSearch && matchesPrice;
    });

    // Применяем сортировку
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      default:
        // По умолчанию - без сортировки
        break;
    }

    return filtered;
  }, [items, selectedCategory, searchQuery, priceFilter, sortBy]);

  // Имитация загрузки данных
  const loadItems = useCallback(async (categoryId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь будет API запрос
    const currentItems = [...(SAMPLE_ITEMS[categoryId] || [])];
    const shuffled = currentItems.sort(() => Math.random() - 0.5);
    
    setItems(prev => ({
      ...prev,
      [categoryId]: shuffled,
    }));
    setLoading(false);
  }, []);

  // Обработка обновления списка
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadItems(selectedCategory);
    setRefreshing(false);
  }, [selectedCategory, loadItems]);

  // Обработка выбора категории
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    if (!items[categoryId]) {
      loadItems(categoryId);
    }
  }, [items, loadItems]);

  // Обработка поиска
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Обработка фильтра цен
  const handlePriceFilter = useCallback((min: number, max: number) => {
    setPriceFilter({ min, max });
  }, []);

  // Обработка сортировки
  const handleSort = useCallback((sortType: string) => {
    setSortBy(sortType);
  }, []);

  // Загрузка первой категории при первом рендере
  React.useEffect(() => {
    if (!items[selectedCategory]) {
      loadItems(selectedCategory);
    }
  }, [selectedCategory, items, loadItems]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#128C7E" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#128C7E"
        barStyle="light-content"
      />
      <SearchBar
        onSearch={handleSearch}
        onFilter={handlePriceFilter}
        onSort={handleSort}
      />
      <CategoryTabs
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <FlatList
        data={filteredItems}
        renderItem={({item}) => (
          <AdCard
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            description={item.description}
            address={item.address}
            imageUrl={item.imageUrl}
            onPress={() => {
              navigation.navigate('Detail', { item });
            }}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#128C7E']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  listContent: {
    paddingVertical: 8,
  },
  loader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default HomeScreen; 