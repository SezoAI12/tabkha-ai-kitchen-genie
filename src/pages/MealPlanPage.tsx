// MealPlanningScreen.js

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Picker, // Or use react-native-picker-select for better UX
  Alert,
  Keyboard,
  LayoutAnimation, // For simple animations
  Platform, // For platform-specific layout animation
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // For notch/status bar safety
import Icon from 'react-native-vector-icons/Feather'; // Example icon library (install 'react-native-vector-icons')

// --- Interfaces for Type Safety (if using TypeScript) ---
interface Meal {
  id: string;
  recipeId?: string; // ID of the recipe
  customText?: string; // For "Eating out", "Leftovers"
  type: 'recipe' | 'custom';
  servings?: number;
  date: string; // 'YYYY-MM-DD'
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  addedDate: string; // ISO string for creation date
}

interface RecipeSummary {
  id: string;
  name: string;
  category: string;
  // ... other minimal recipe details needed for display/selection
}

// --- Helper Functions ---
const getWeekDays = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date.toISOString().split('T')[0]); // YYYY-MM-DD
  }
  return days;
};

const formatDateForDisplay = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const getMealTypeLabel = (type: string) => {
    switch (type) {
        case 'breakfast': return 'Breakfast';
        case 'lunch': return 'Lunch';
        case 'dinner': return 'Dinner';
        case 'snack': return 'Snack';
        default: return '';
    }
};

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MealPlanningScreen = () => {
  // --- State Management ---
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date()); // Start of the currently displayed week
  const [mealPlan, setMealPlan] = useState<Meal[]>([]); // All planned meals
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMealRecipeId, setNewMealRecipeId] = useState<string | null>(null);
  const [newMealCustomText, setNewMealCustomText] = useState('');
  const [newMealDate, setNewMealDate] = useState(getWeekDays(new Date())[0]); // Default to today
  const [newMealType, setNewMealType] = useState('lunch');
  const [newMealServings, setNewMealServings] = useState('1'); // As string for input
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [editingFieldName, setEditingFieldName] = useState<string | null>(null); // 'customText' or 'servings'
  const editingInputRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingRecipes, setIsSearchingRecipes] = useState(false);
  const [searchResults, setSearchResults] = useState<RecipeSummary[]>([]); // Mock search results

  // Mock data for recipes (replace with actual data fetching)
  const mockRecipes: RecipeSummary[] = [
    { id: 'rec1', name: 'Chicken Stir-fry', category: 'Dinner' },
    { id: 'rec2', name: 'Oatmeal', category: 'Breakfast' },
    { id: 'rec3', name: 'Quinoa Salad', category: 'Lunch' },
    { id: 'rec4', name: 'Fruit Smoothie', category: 'Snack' },
    { id: 'rec5', name: 'Lentil Soup', category: 'Dinner' },
  ];

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const weekDays = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

  // --- Mock Data Loading (Replace with AsyncStorage/API) ---
  useEffect(() => {
    // In a real app, load mealPlan from AsyncStorage or an API
    setMealPlan([
      { id: 'm1', type: 'recipe', recipeId: 'rec1', servings: 2, date: weekDays[0], mealType: 'dinner', addedDate: new Date().toISOString() },
      { id: 'm2', type: 'custom', customText: 'Eating Out', date: weekDays[1], mealType: 'dinner', addedDate: new Date().toISOString() },
      { id: 'm3', type: 'recipe', recipeId: 'rec3', servings: 1, date: weekDays[2], mealType: 'lunch', addedDate: new Date().toISOString() },
    ]);
  }, [weekDays]); // Re-load when weekDays change (for mock purposes)

  // --- Helper to Update Meal Plan ---
  const updateMealPlan = (updatedMeals: Meal[]) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMealPlan(updatedMeals);
    // In a real app, persist to AsyncStorage or API
  };

  // --- Handlers ---
  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handleAddMeal = () => {
    if (newMealRecipeId === null && !newMealCustomText.trim()) {
      Alert.alert('Error', 'Please select a recipe or enter custom text.');
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      date: newMealDate,
      mealType: newMealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      type: newMealRecipeId ? 'recipe' : 'custom',
      addedDate: new Date().toISOString(),
      ...(newMealRecipeId && { recipeId: newMealRecipeId, servings: Number(newMealServings) || 1 }),
      ...(!newMealRecipeId && { customText: newMealCustomText.trim() }),
    };

    updateMealPlan([...mealPlan, newMeal]);
    setIsAddingMeal(false);
    setNewMealRecipeId(null);
    setNewMealCustomText('');
    setNewMealServings('1');
    Alert.alert('Success', 'Meal added to plan!');
  };

  const handleRemoveMeal = (id: string) => {
    Alert.alert(
      'Remove Meal',
      'Are you sure you want to remove this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => updateMealPlan(mealPlan.filter(meal => meal.id !== id)),
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditMealField = (mealId: string, field: 'customText' | 'servings', value: string | number) => {
    updateMealPlan(mealPlan.map(meal =>
      meal.id === mealId ? { ...meal, [field]: value } : meal
    ));
  };

  const startEditing = (mealId: string, field: 'customText' | 'servings') => {
    setEditingMealId(mealId);
    setEditingFieldName(field);
    setTimeout(() => { // Focus after state update and re-render
      editingInputRef.current?.focus();
    }, 50);
  };

  const stopEditing = () => {
    setEditingMealId(null);
    setEditingFieldName(null);
    Keyboard.dismiss();
  };

  const handleSearchRecipes = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) { // Perform search after 2 characters
      setIsSearchingRecipes(true);
      // Simulate API call
      setTimeout(() => {
        setSearchResults(mockRecipes.filter(rec =>
          rec.name.toLowerCase().includes(text.toLowerCase())
        ));
        setIsSearchingRecipes(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsSearchingRecipes(false);
    }
  };

  // --- AI Auto-Planning (Conceptual) ---
  const handleAutoPlan = () => {
    Alert.alert(
      'AI Auto-Planning (Premium)',
      'This feature will generate a meal plan based on your preferences and health goals.\n\n(In a real app, this would involve a modal for preferences and a backend AI API call)',
      [
        {
          text: 'Generate Mock Plan',
          onPress: () => {
            // Simulate AI generating a plan
            const mockGeneratedPlan: Meal[] = [
              { id: 'ai1', type: 'recipe', recipeId: 'rec2', servings: 1, date: weekDays[0], mealType: 'breakfast', addedDate: new Date().toISOString() },
              { id: 'ai2', type: 'recipe', recipeId: 'rec3', servings: 2, date: weekDays[1], mealType: 'lunch', addedDate: new Date().toISOString() },
              { id: 'ai3', type: 'custom', customText: 'Leftovers', date: weekDays[2], mealType: 'dinner', addedDate: new Date().toISOString() },
            ];
            updateMealPlan([...mealPlan, ...mockGeneratedPlan]);
            Alert.alert('Plan Generated', 'A mock plan has been added!');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // --- Render Functions ---
  const renderMealItem = ({ item }: { item: Meal }) => {
    const recipe = item.type === 'recipe' ? mockRecipes.find(r => r.id === item.recipeId) : null;

    return (
      <View style={styles.mealItem}>
        <View style={styles.mealItemContent}>
          {editingMealId === item.id && editingFieldName === 'customText' && item.type === 'custom' ? (
            <TextInput
              ref={editingInputRef}
              style={styles.editableText}
              value={item.customText}
              onChangeText={(text) => handleEditMealField(item.id, 'customText', text)}
              onBlur={stopEditing}
              onSubmitEditing={stopEditing}
            />
          ) : (
            <TouchableOpacity onPress={() => item.type === 'custom' && startEditing(item.id, 'customText')}>
              <Text style={styles.mealName}>
                {item.type === 'recipe' ? recipe?.name : item.customText || 'Unknown Meal'}
              </Text>
            </TouchableOpacity>
          )}

          {item.type === 'recipe' && (
            <View style={styles.mealDetails}>
              {editingMealId === item.id && editingFieldName === 'servings' ? (
                <TextInput
                  ref={editingInputRef}
                  style={styles.editableServings}
                  keyboardType="numeric"
                  value={String(item.servings)}
                  onChangeText={(text) => handleEditMealField(item.id, 'servings', Number(text))}
                  onBlur={stopEditing}
                  onSubmitEditing={stopEditing}
                />
              ) : (
                <TouchableOpacity onPress={() => startEditing(item.id, 'servings')}>
                  <Text style={styles.mealQuantity}>{item.servings} servings</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.mealCategory}> • {recipe?.category || 'N/A'}</Text>
            </View>
          )}
          <Text style={styles.mealAddedDate}>Added: {formatDateForDisplay(item.addedDate)}</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveMeal(item.id)} style={styles.removeButton}>
          <Icon name="trash-2" size={18} color="#FF6347" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDayColumn = (dateString: string) => {
    const mealsForDay = mealPlan.filter(meal => meal.date === dateString);
    const dayLabel = formatDateForDisplay(dateString);

    return (
      <View key={dateString} style={styles.dayColumn}>
        <Text style={styles.dayHeader}>{dayLabel}</Text>
        <ScrollView style={styles.mealsContainer}>
          {mealTypes.map(type => (
            <View key={`${dateString}-${type}`} style={styles.mealTypeSection}>
              <Text style={styles.mealTypeHeader}>{getMealTypeLabel(type)}:</Text>
              {mealsForDay.filter(meal => meal.mealType === type).length === 0 ? (
                <Text style={styles.noMealText}>No meals planned.</Text>
              ) : (
                <FlatList
                  data={mealsForDay.filter(meal => meal.mealType === type)}
                  renderItem={renderMealItem}
                  keyExtractor={item => item.id}
                  scrollEnabled={false} // Nested FlatList
                />
              )}
              <TouchableOpacity
                style={styles.addMealToDayButton}
                onPress={() => {
                  setNewMealDate(dateString);
                  setNewMealType(type);
                  setIsAddingMeal(true);
                }}
              >
                <Icon name="plus" size={16} color="#007BFF" />
                <Text style={styles.addMealToDayButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Planner</Text>
      </View>

      {/* Week Navigation */}
      <View style={styles.weekNavigator}>
        <TouchableOpacity onPress={handlePreviousWeek} style={styles.navButton}>
          <Icon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.weekRange}>
          {formatDateForDisplay(weekDays[0])} - {formatDateForDisplay(weekDays[6])}
        </Text>
        <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
          <Icon name="chevron-right" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Global Actions */}
      <View style={styles.globalActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAutoPlan}>
          <Icon name="zap" size={18} color="#fff" />
          <Text style={styles.actionButtonText}>AI Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setIsAddingMeal(true)}>
          <Icon name="plus-circle" size={18} color="#fff" />
          <Text style={styles.actionButtonText}>Add New</Text>
        </TouchableOpacity>
        {/* Sorting/Filtering can be added here, perhaps as a modal or dropdown */}
      </View>

      {/* Calendar Grid */}
      <ScrollView horizontal contentContainerStyle={styles.calendarGrid}>
        {weekDays.map(renderDayColumn)}
      </ScrollView>

      {/* Add Meal Modal */}
      <Modal
        visible={isAddingMeal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddingMeal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Meal to Plan</Text>

            <TextInput
              style={styles.input}
              placeholder="Search for a recipe..."
              value={searchQuery}
              onChangeText={handleSearchRecipes}
            />
            {isSearchingRecipes && <Text style={styles.loadingText}>Searching...</Text>}
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => {
                    setNewMealRecipeId(item.id);
                    setNewMealCustomText(''); // Clear custom text
                    setSearchQuery(item.name); // Show selected recipe name in search input
                    setSearchResults([]); // Clear results
                  }}
                >
                  <Text>{item.name} ({item.category})</Text>
                </TouchableOpacity>
              )}
              style={styles.searchResultsList}
            />

            <Text style={styles.orText}>OR</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter custom meal text (e.g., Leftovers)"
              value={newMealCustomText}
              onChangeText={(text) => {
                setNewMealCustomText(text);
                setNewMealRecipeId(null); // Clear recipe selection if custom text is typed
                setSearchQuery(''); // Clear search query
              }}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Date:</Text>
              <Picker
                selectedValue={newMealDate}
                style={styles.picker}
                onValueChange={(itemValue) => setNewMealDate(itemValue)}
              >
                {weekDays.map(day => (
                  <Picker.Item key={day} label={formatDateForDisplay(day)} value={day} />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Meal Type:</Text>
              <Picker
                selectedValue={newMealType}
                style={styles.picker}
                onValueChange={(itemValue) => setNewMealType(itemValue)}
              >
                {mealTypes.map(type => (
                  <Picker.Item key={type} label={getMealTypeLabel(type)} value={type} />
                ))}
              </Picker>
            </View>

            {newMealRecipeId && (
              <TextInput
                style={styles.input}
                placeholder="Servings"
                keyboardType="numeric"
                value={newMealServings}
                onChangeText={setNewMealServings}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsAddingMeal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddMeal}>
                <Text style={styles.buttonText}>Add Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  weekNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navButton: {
    padding: 5,
  },
  weekRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  globalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
  },
  calendarGrid: {
    paddingVertical: 10,
  },
  dayColumn: {
    width: 150, // Fixed width for each day column, adjust as needed
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dayHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  mealsContainer: {
    padding: 8,
    minHeight: 300, // Ensure columns have enough height
  },
  mealTypeSection: {
    marginBottom: 10,
  },
  mealTypeHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  noMealText: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  mealItem: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 6,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  mealItemContent: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  mealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  mealQuantity: {
    fontSize: 12,
    color: '#666',
  },
  mealCategory: {
    fontSize: 12,
    color: '#666',
  },
  mealAddedDate: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  editableText: {
    fontSize: 14,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 0,
    color: '#333',
  },
  editableServings: {
    fontSize: 12,
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 0,
    width: 40,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  addMealToDayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E0F7FA', // Light teal
  },
  addMealToDayButtonText: {
    color: '#007BFF',
    marginLeft: 5,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 5,
    color: '#666',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  picker: {
    flex: 1,
    height: 40,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  addButton: {
    backgroundColor: '#007BFF',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchResultsList: {
    maxHeight: 150, // Limit height of search results
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  loadingText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  }
});

export default MealPlanningScreen;
