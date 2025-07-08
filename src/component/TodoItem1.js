import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem1 = ({ item, onDelete, onEdit }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.task}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem1;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth:1,
    borderColor:"#4F46E5"
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    // marginTop: 10,
  },
  editBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
