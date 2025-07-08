import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item, onPress, onAddToCart }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
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
});
