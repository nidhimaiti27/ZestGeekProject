import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import TodoItem1 from '../component/Todos/TodoItem1';

interface TodoItem {
  id: string;
  task: string;
}

interface FormData {
  task: string;
}

export function TodoSreen1() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      task: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (editingId) {
      setTodos((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, task: data.task } : item
        )
      );
      setEditingId(null);
    } else {
      const newTask: TodoItem = {
        id: Date.now().toString(),
        task: data.task,
      };
      setTodos([...todos, newTask]);
    }
    reset();
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string, task: string) => {
    setEditingId(id);
    setValue('task', task);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <View style={{ justifyContent: 'center' }}>
        <Text
          style={{ alignSelf: 'center', fontSize: 20, marginTop: 12, fontWeight: 'bold' }}
        >
          Todo with react hook form
        </Text>
        <Controller
          control={control}
          name="task"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter a task"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="done"
            />
          )}
        />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={styles.buttonText}>{editingId ? 'Update Task' : 'Add Task'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem1
              item={item}
              onDelete={handleDelete}
              onEdit={() => handleEdit(item.id, item.task)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#4F46E5',
    margin: 12,
    borderRadius: 12,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 6,
    marginBottom: 12,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});
