import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CartItemCard = ({ item, onRemove }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    color: '#4F46E5',
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  removeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
