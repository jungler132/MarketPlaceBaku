import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  Platform,
} from 'react-native';
import { Item } from '../types';

interface DetailScreenProps {
  route: {
    params: {
      item: Item;
    };
  };
  navigation: any;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { item } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Посмотри это объявление: ${item.title} - ${item.price}₽\n${item.description}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCall = () => {
    // В реальном приложении здесь будет настоящий номер телефона
    Linking.openURL('tel:+79001234567');
  };

  const handleMessage = () => {
    // В реальном приложении здесь будет настоящий номер телефона
    if (Platform.OS === 'ios') {
      Linking.openURL('sms:+79001234567');
    } else {
      Linking.openURL('sms:+79001234567?body=Здравствуйте! Интересует ваше объявление...');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} ₽</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Количество:</Text>
          <Text style={styles.infoValue}>{item.quantity} шт.</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Адрес:</Text>
          <Text style={styles.infoValue}>{item.address}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Описание</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={handleCall}
          >
            <Text style={styles.buttonText}>Позвонить</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={handleMessage}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Написать
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.shareButton]} 
            onPress={handleShare}
          >
            <Text style={[styles.buttonText, styles.shareButtonText]}>
              Поделиться
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 16,
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#999999',
    width: 100,
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'serif',
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFD700',
  },
  secondaryButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  shareButton: {
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
  secondaryButtonText: {
    color: '#FFD700',
  },
  shareButtonText: {
    color: '#FFD700',
  },
});

export default DetailScreen; 