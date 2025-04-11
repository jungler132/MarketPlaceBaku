import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (minPrice: number, maxPrice: number) => void;
  onSort: (sortBy: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter, onSort }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSort, setSelectedSort] = useState('default');

  const handleFilter = () => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;
    onFilter(min, max);
    onSort(selectedSort);
    setModalVisible(false);
  };

  const sortOptions = [
    { id: 'default', label: 'По умолчанию' },
    { id: 'price_asc', label: 'Сначала дешевле' },
    { id: 'price_desc', label: 'Сначала дороже' },
    { id: 'newest', label: 'Сначала новые' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Поиск товаров..."
          placeholderTextColor="#FFD700"
          onChangeText={onSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1} 
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Фильтры и сортировка</Text>
            
            <Text style={styles.sectionTitle}>Сортировка</Text>
            <View style={styles.sortContainer}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.sortOption,
                    selectedSort === option.id && styles.sortOptionSelected,
                  ]}
                  onPress={() => setSelectedSort(option.id)}>
                  <Text style={[
                    styles.sortOptionText,
                    selectedSort === option.id && styles.sortOptionTextSelected,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Цена</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="От"
                placeholderTextColor="#FFD700"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <Text style={styles.separator}>—</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="До"
                placeholderTextColor="#FFD700"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={handleFilter}>
                <Text style={styles.applyButtonText}>Применить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#2A2A2A',
    borderRadius: 24,
    paddingHorizontal: 20,
    marginRight: 12,
    fontSize: 16,
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
    color: '#FFFFFF',
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
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2A2A2A',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  filterButtonText: {
    fontSize: 20,
    color: '#FFD700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#FFD700',
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'serif',
    letterSpacing: 0.3,
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  sortOptionSelected: {
    backgroundColor: '#FFD700',
  },
  sortOptionText: {
    color: '#FFD700',
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  sortOptionTextSelected: {
    color: '#000000',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  priceInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  separator: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  applyButton: {
    backgroundColor: '#FFD700',
  },
  cancelButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
  applyButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
});

export default SearchBar; 