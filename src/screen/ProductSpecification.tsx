import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type Props = {
  route: {
    params: {
      product: Product;
    };
  };
};

const { width } = Dimensions.get('window');

const ProductSpecification = ({ route }: Props) => {
  const { product } = route.params;
  const { cartItems, addToCart, decrementQuantity } = useCart();
  const navigation = useNavigation<any>();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageCard}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>📦 Description</Text>
            <Text style={styles.value}>{product.description}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>🏷️ Category</Text>
            <Text style={styles.value}>{product.category}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>⭐ Rating</Text>
            <Text style={styles.value}>{product.rating?.rate} / 5</Text>
          </View>
        </View>

        {quantity === 0 ? (
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decrementQuantity(product.id)}
              >
                <Text style={styles.quantitySymbol}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => addToCart(product)}
              >
                <Text style={styles.quantitySymbol}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate('AddedCart')}
            >
              <Text style={styles.buttonText}>Go to Cart 🛒</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductSpecification;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor:'#fff',

  },
  imageCard: {
    backgroundColor: '#fff',
    width: width * 1,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 12,
    alignSelf:'flex-start'
  },
  infoCard: {
    backgroundColor: '#fff',
    width: width * 0.9,
    borderRadius: 12,
    marginBottom: 2,
  },
  infoItem: {
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  buttonPrimary: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantitySymbol: {
    fontSize: 20,
    color: '#4F46E5',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
});
