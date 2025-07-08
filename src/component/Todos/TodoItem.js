import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export  function TodoItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleSave = () => {
    onEdit(item.id, newText);
    setIsEditing(false);
  };

  return (
    <View style={styles.item}>
      {isEditing ? (
        <>
          <TextInput
            value={newText}
            onChangeText={setNewText}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}>{item.text}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editBtn}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
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
  saveBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
