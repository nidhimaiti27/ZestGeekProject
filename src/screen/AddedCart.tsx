import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ListRenderItem } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItemCard from '../component/cartProduct/CartItemCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const AddedCart = ({ navigation }: Props) => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <CartItemCard
      item={item}
      onNavigate={() => navigation.navigate('ProductSpecification', { product: item })}
      onIncrement={() => incrementQuantity(item.id)}
      onDecrement={() => decrementQuantity(item.id)}
      onRemove={() => removeFromCart(item.id)}
    />
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
