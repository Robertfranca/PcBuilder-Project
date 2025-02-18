import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Import data
import SsdData from '../../web-scraping-api/controllers/updateAllHardwareData.json'; // Adjust path if necessary

export default function SsdScreen({ navigation }) {
  // Filter the data to include only items with 'SSD' in the product name
  const ssdData = SsdData.filter(item => item.productName.includes('SSD'));

  // Prepend the base URL to the image URL
  const prependBaseUrl = (url) => {
    if (url && !url.startsWith('http')) {
      return `https://www.kabum.com.br${url}`;
    }
    return url;
  };

  // Function to handle the option selection
  const handleOptionSelect = (item) => {
    navigation.navigate('SsdDetailScreen', { ssd: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an SSD Option</Text>
      <FlatList
        data={ssdData} // Use filtered SSD data
        keyExtractor={(item, index) => index.toString()} // Use index if URL or unique key is not available
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handleOptionSelect(item)}>
            <Image source={{ uri: prependBaseUrl(item.imageUrl) }} style={styles.image} />
            <Text style={styles.buttonText}>{item.productName}</Text>
            <Text style={styles.buttonPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'purple',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 100, // Adjust width and height as needed
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonPrice: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});
