import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItemCard from '../component/CartProduct/CartItemCard';
const AddedCart = () => {
  const { cartItems, removeFromCart } = useCart();

  const renderItem = ({ item }) => (
    <CartItemCard item={item} onRemove={() => removeFromCart(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🛒 Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>No items in the cart.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default AddedCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
    textAlign: 'center',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});
