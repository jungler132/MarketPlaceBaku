import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

interface AdCardProps {
  title: string;
  price: number;
  quantity: number;
  description: string;
  address: string;
  imageUrl: string;
  onPress?: () => void;
}

const AdCard: React.FC<AdCardProps> = ({
  title,
  price,
  quantity,
  description,
  address,
  imageUrl,
  onPress,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#128C7E" />
          </View>
        )}
        {hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Ошибка загрузки изображения</Text>
          </View>
        ) : (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>
            {quantity} шт.
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.price}>
          {price.toLocaleString()} ₽
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.address} numberOfLines={1}>
            📍 {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  errorText: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  quantityBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quantityText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    letterSpacing: 0.2,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'serif',
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 8,
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'sans-serif',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  address: {
    fontSize: 14,
    color: '#CCCCCC',
    flex: 1,
    fontFamily: 'sans-serif',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});

export default AdCard; 