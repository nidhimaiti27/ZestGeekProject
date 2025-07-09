import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  available?: boolean;
}

interface ProductCardProps {
  item: Product;
  onPress: () => void;
  onAddToCart: () => void;

}

const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
  const { cartItems, addToCart, removeFromCart, decrementQuantity } = useCart();
  const navigation = useNavigation<any>();
  const cartItem = cartItems.find((ci) => ci.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const isDisabled = item.available === false;

  return (
    <TouchableOpacity
      style={[styles.card, isDisabled && styles.disabledCard]}
      onPress={onPress}
      activeOpacity={isDisabled ? 1 : 0.9}

    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.price}>$ {item.price}</Text>

      {isDisabled ? (
        <View style={styles.unavailableBadge}>
          <Text style={styles.unavailableText}>Not Available</Text>
        </View>
      ) : quantity === 0 ? (
        <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => decrementQuantity(item.id)}
            >
              <Text style={styles.counterText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddedCart')}
          >
            <Text style={styles.buttonText}>Go to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;


const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    gap:10

  },
  counterButton: {
    borderWidth: 2,
    borderColor: '#4F46E5',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  counterText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledCard: {
    opacity: 0.5,
  },

  unavailableBadge: {
    marginTop: 8,
    backgroundColor: '#F87171',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },

  unavailableText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },

});