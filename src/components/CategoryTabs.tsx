import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tab,
              selectedCategory === category.id && styles.selectedTab,
            ]}
            onPress={() => onSelectCategory(category.id)}>
            <Text style={styles.icon}>{category.icon}</Text>
            <Text
              style={[
                styles.tabText,
                selectedCategory === category.id && styles.selectedTabText,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    minWidth: 120,
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedTab: {
    backgroundColor: '#FFD700',
  },
  icon: {
    fontSize: 24,
    color: '#FFD700',
  },
  tabText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  selectedTabText: {
    color: '#000000',
    fontWeight: '700',
  },
});

export default CategoryTabs; 