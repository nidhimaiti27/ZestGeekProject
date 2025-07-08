import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const ProductSpecification = ({ route }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.imageCard}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>📦 Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.label}>🏷️ Category</Text>
          <Text style={styles.value}>{product.category}</Text>

          <Text style={styles.label}>⭐ Rating</Text>
          <Text style={styles.value}>{product.rating?.rate} / 5</Text>
        </View>

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductSpecification;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    alignItems: 'center',
  },
  imageCard: {
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width: 400,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 17,
    paddingHorizontal: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: '#111827',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  infoBox: {
    borderRadius: 10,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 13,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    color: '#1F2937',
  },
  value: {
    fontSize: 15,
    color: '#374151',
    marginTop: 2,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginTop: 4,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
