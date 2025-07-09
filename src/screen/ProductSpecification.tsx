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
  available?: boolean;
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
  const isUnavailable = product.available === false;
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageCard}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>⭐ {product.rating?.rate ?? "N/A"}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>📦 Description</Text>
            <Text style={styles.value}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>🏷️ Category</Text>
            <Text style={styles.value}>{product.category}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>📊 Rating Count</Text>
            <Text style={styles.value}>{product.rating?.count ?? "N/A"} ratings</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isUnavailable ? (
          <View style={styles.unavailableBox}>
            <Text style={styles.unavailableText}>⚠️ Not Available</Text>
          </View>
        ) : quantity === 0 ? (
          <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>🛒 Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cartActionRow}>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => decrementQuantity(product.id)}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyDisplay}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => addToCart(product)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.goToCartButton}
              onPress={() => navigation.navigate('AddedCart')}
            >
              <Text style={styles.buttonText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductSpecification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    paddingBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageCard: {
    backgroundColor: '#fff',
    width: width,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  contentBox: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  ratingBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  section: {
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  goToCartButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  cartActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#E0E7FF',
    padding: 10,
    borderRadius: 8,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  qtyDisplay: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
    color: '#111827',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  unavailableBox: {
    backgroundColor: '#F87171',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  unavailableText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

