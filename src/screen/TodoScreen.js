import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { TodoItem } from '../component/TodoItem';

function TodoScreen  () {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);

    const handleAdd = () => {
        if (task.trim()) {
            setTodos([...todos, { id: Date.now().toString(), text: task }]);
            setTask('');
             Keyboard.dismiss();
        }
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(item => item.id !== id));
    };

    const handleEdit = (id, newText) => {
        setTodos(todos.map(item => item.id === id ? { ...item, text: newText } : item));
    };

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Text style={styles.heading}> ToDo App</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a task"
                        value={task}
                        onChangeText={setTask}
                        placeholderTextColor="#888"
                        onSubmitEditing={handleAdd} 
                        returnKeyType="done" 
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={todos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TodoItem item={item} onDelete={handleDelete} onEdit={handleEdit} />
                    )}
                    contentContainerStyle={styles.list}
                />


            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    addButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    list: {
        paddingBottom: 100,
    },
});
