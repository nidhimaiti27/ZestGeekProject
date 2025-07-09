import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartItemCardProps {
  item: Product;
  onNavigate: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItemCard = ({
  item,
  onNavigate,
  onIncrement,
  onDecrement,
  onRemove
}: CartItemCardProps) => {
  return (
    <TouchableOpacity onPress={onNavigate}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>$ {item.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={onDecrement} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{item.quantity}</Text>
            <TouchableOpacity onPress={onIncrement} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: -14,
  },
  quantityButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 14,
  },
  quantityText: {
    fontSize: 17,
    fontWeight: '500',
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  removeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
