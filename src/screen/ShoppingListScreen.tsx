import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import ProductCard from '../component/products/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  available?: boolean;
}

interface RenderItemProps {
  item: Product;
  onAddToCart: () => void;
}

const ShoppingListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { cartItems, addToCart } = useCart();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<any>(); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await response.json();

      const updatedData = data.map((item) => {
        if (item.id === 3 || item.id === 7) {
          return { ...item, available: false };
        }
        return item;
      });

      setProducts(updatedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate('ProductSpecification', { product: item })}
      onAddToCart={() => addToCart(item)} 
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>🔥 Summer Sale: 20% OFF on All Items!</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddedCart')}
          style={styles.cartContainer}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.cartCount}>{cartItems.length}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        ListHeaderComponent={() => (
          <Text style={styles.sectionTitle}>🛍️ Popular Products</Text>
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default ShoppingListScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF2E0',
        paddingHorizontal: 10,
    },
    banner: {
        backgroundColor: '#FDE68A',
        padding: 12,
        marginBottom: 10,
    },
    bannerText: {
        color: '#B45309',
        fontWeight: '700',
        textAlign: 'center',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4,
        marginBottom: 10
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 15,
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        // backgroundColor: '#fff',
        // borderRadius: 8,
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    cartIcon: {
        fontSize: 17,
        marginRight: 4,
    },
    cartCount: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#4F46E5',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 10,
        alignSelf: 'center',
    },
    list: {
        paddingBottom: 20,
    },
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
