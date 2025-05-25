// MealPlanningScreen.js

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Alert,
  Keyboard,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather'; // Requires 'react-native-vector-icons'

// For better dropdowns (optional, but recommended for UX)
// import { Picker } from '@react-native-picker/picker'; // Requires '@react-native-picker/picker'

// Enable LayoutAnimation for smooth UI transitions (e.g., adding/removing items)
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Mock Data & Helpers (for UI demonstration purposes) ---
const mockRecipes = [
  { id: 'rec1', name: 'Chicken Stir-fry', category: 'Dinner', baseServings: 4, ingredients: [] },
  { id: 'rec2', name: 'Oatmeal', category: 'Breakfast', baseServings: 1, ingredients: [] },
  { id: 'rec3', name: 'Quinoa Salad', category: 'Lunch', baseServings: 2, ingredients: [] },
  { id: 'rec4', name: 'Fruit Smoothie', category: 'Snack', baseServings: 1, ingredients: [] },
  { id: 'rec5', name: 'Lentil Soup', category: 'Dinner', baseServings: 6, ingredients: [] },
  { id: 'rec6', name: 'Scrambled Eggs', category: 'Breakfast', baseServings: 1, ingredients: [] },
  { id: 'rec7', name: 'Pasta with Pesto', category: 'Dinner', baseServings: 4, ingredients: [] },
  { id: 'rec8', name: 'Turkey Sandwich', category: 'Lunch', baseServings: 1, ingredients: [] },
];

const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date.toISOString().split('T')[0]); // YYYY-MM-DD format
  }
  return days;
};

const formatDateForDisplay = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const getMealTypeLabel = (type) => {
    switch (type) {
        case 'breakfast': return 'Breakfast';
        case 'lunch': return 'Lunch';
        case 'dinner': return 'Dinner';
        case 'snack': return 'Snack';
        default: return '';
    }
};

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
const categories = [...new Set(mockRecipes.map(r => r.category))]; // For category pickers

// --- Main Component ---
const MealPlanningScreen = () => {
  // --- State Management for UI/UX ---
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  // Meal plan structure: Array of objects with date, mealType, type ('recipe' or 'custom'), etc.
  const [mealPlan, setMealPlan] = useState([]);
  const [isAddMealModalVisible, setIsAddMealModalVisible] = useState(false);
  
  // State for new meal form
  const [selectedRecipeForNewMeal, setSelectedRecipeForNewMeal] = useState(null); // Full recipe object
  const [newMealCustomText, setNewMealCustomText] = useState('');
  const [newMealDate, setNewMealDate] = useState(getWeekDays(new Date())[0]);
  const [newMealType, setNewMealType] = useState('lunch');
  const [newMealServings, setNewMealServings] = useState('1'); // String for TextInput

  // State for inline editing
  const [editingMealId, setEditingMealId] = useState(null);
  const [editingFieldName, setEditingFieldName] = useState(null); // 'name', 'servings', 'category'
  const editingInputRef = useRef(null); // Ref for auto-focusing inline editor

  // State for recipe search within modal
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Memoize week days to avoid re-calculating on every render
  const weekDays = React.useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

  // --- Mock Data Loading (Replace with actual data fetching/persistence) ---
  useEffect(() => {
    // Simulate loading a meal plan for the current week
    setMealPlan([
      { id: 'm1', type: 'recipe', recipeId: 'rec1', servings: 4, date: weekDays[0], mealType: 'dinner', addedDate: new Date().toISOString() },
      { id: 'm2', type: 'custom', customText: 'Eating Out', date: weekDays[1], mealType: 'dinner', addedDate: new Date().toISOString() },
      { id: 'm3', type: 'recipe', recipeId: 'rec3', servings: 2, date: weekDays[2], mealType: 'lunch', addedDate: new Date().toISOString() },
      { id: 'm4', type: 'recipe', recipeId: 'rec4', servings: 1, date: weekDays[0], mealType: 'snack', addedDate: new Date(Date.now() - 86400000 * 3).toISOString() }, // Older date for "added date"
    ]);
  }, [weekDays]); // Re-run when week changes (for mock purposes)

  // --- UI/UX Handlers (placeholders for actual logic) ---

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

  const handleAddMealSubmit = () => {
    if (!selectedRecipeForNewMeal && !newMealCustomText.trim()) {
      Alert.alert('Error', 'Please select a recipe or enter custom text.');
      return;
    }

    const newMeal = {
      id: Date.now().toString(), // Unique ID
      date: newMealDate,
      mealType: newMealType,
      type: selectedRecipeForNewMeal ? 'recipe' : 'custom',
      addedDate: new Date().toISOString(),
      ...(selectedRecipeForNewMeal && {
        recipeId: selectedRecipeForNewMeal.id,
        servings: Number(newMealServings) || selectedRecipeForNewMeal.baseServings,
      }),
      ...(!selectedRecipeForNewMeal && { customText: newMealCustomText.trim() }),
    };

    // Use LayoutAnimation for smooth add
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMealPlan([...mealPlan, newMeal]);

    // Reset form states
    setIsAddMealModalVisible(false);
    setSelectedRecipeForNewMeal(null);
    setNewMealCustomText('');
    setNewMealServings('1');
    setSearchQuery('');
    setFilteredRecipes([]);

    Alert.alert('Success', 'Meal added!'); // Simple toast/feedback
  };

  const handleRemoveMeal = (id) => {
    Alert.alert(
      'Remove Meal',
      'Are you sure you want to remove this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMealPlan(mealPlan.filter(meal => meal.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Inline editing: Start
  const startEditing = (mealId, field) => {
    setEditingMealId(mealId);
    setEditingFieldName(field);
    setTimeout(() => editingInputRef.current?.focus(), 50); // Auto-focus
  };

  // Inline editing: Stop (on blur or submit)
  const stopEditing = () => {
    setEditingMealId(null);
    setEditingFieldName(null);
    Keyboard.dismiss(); // Hide keyboard
  };

  // Inline editing: Handle value change
  const handleMealItemEdit = (mealId, field, value) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMealPlan(prevPlan => prevPlan.map(meal => {
      if (meal.id === mealId) {
        return { ...meal, [field]: value };
      }
      return meal;
    }));
  };

  // Filter recipes for search in modal
  useEffect(() => {
    if (searchQuery.length > 1) {
      setFilteredRecipes(mockRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredRecipes([]);
    }
  }, [searchQuery]);

  // --- UI/UX Rendering Logic ---

  // Renders a single meal item within a day/meal type slot
  const renderMealItem = ({ item }) => {
    const recipe = item.type === 'recipe' ? mockRecipes.find(r => r.id === item.recipeId) : null;
    const isEditingName = editingMealId === item.id && editingFieldName === 'name';
    const isEditingServings = editingMealId === item.id && editingFieldName === 'servings';
    const isEditingCategory = editingMealId === item.id && editingFieldName === 'category'; // For future category inline edit

    return (
      <View style={styles.mealItemCard}>
        <View style={styles.mealItemContent}>
          {/* Inline Editing for Name/Custom Text */}
          {isEditingName ? (
            <TextInput
              ref={editingInputRef}
              style={styles.inlineEditInput}
              value={item.type === 'recipe' ? (recipe?.name || '') : (item.customText || '')}
              onChangeText={(text) => handleMealItemEdit(item.id, item.type === 'recipe' ? 'name' : 'customText', text)}
              onBlur={stopEditing}
              onSubmitEditing={stopEditing}
            />
          ) : (
            <TouchableOpacity onPress={() => startEditing(item.id, 'name')}>
              <Text style={styles.mealItemName}>
                {item.type === 'recipe' ? recipe?.name : item.customText || 'Custom Meal'}
              </Text>
            </TouchableOpacity>
          )}

          {item.type === 'recipe' && (
            <View style={styles.mealItemDetailsRow}>
              {/* Inline Editing for Servings */}
              {isEditingServings ? (
                <TextInput
                  ref={editingInputRef}
                  style={styles.inlineEditServingsInput}
                  keyboardType="numeric"
                  value={String(item.servings)}
                  onChangeText={(text) => handleMealItemEdit(item.id, 'servings', Number(text))}
                  onBlur={stopEditing}
                  onSubmitEditing={stopEditing}
                />
              ) : (
                <TouchableOpacity onPress={() => startEditing(item.id, 'servings')}>
                  <Text style={styles.mealItemDetailText}>{item.servings} servings</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.mealItemDetailSeparator}> • </Text>
              {/* Category Selection for Recipes */}
              {/* This would ideally be a custom Picker/Modal for inline editing */}
              <Text style={styles.mealItemDetailText}>{recipe?.category || 'N/A'}</Text>
              <Text style={styles.mealItemDetailSeparator}> • </Text>
              <Text style={styles.mealItemDetailDate}>{formatDateForDisplay(item.addedDate)}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => handleRemoveMeal(item.id)} style={styles.deleteButton}>
          <Icon name="x-circle" size={20} color="#FF6347" />
        </TouchableOpacity>
      </View>
    );
  };

  // Renders a column for each day of the week
  const renderDayColumn = (dateString) => {
    return (
      <View key={dateString} style={styles.dayColumn}>
        <Text style={styles.dayColumnHeader}>{formatDateForDisplay(dateString).split(',')[0]}</Text> {/* Just day name */}
        <Text style={styles.dayColumnDate}>{formatDateForDisplay(dateString).split(',')[1]}</Text> {/* Date */}

        <ScrollView style={styles.mealTypesScroll}>
          {mealTypes.map(mealType => (
            <View key={`${dateString}-${mealType}`} style={styles.mealTypeSection}>
              <Text style={styles.mealTypeTitle}>{getMealTypeLabel(mealType)}</Text>
              {mealPlan
                .filter(meal => meal.date === dateString && meal.mealType === mealType)
                .map(item => (
                  <View key={item.id} style={styles.mealSlot}>
                    {renderMealItem({ item })}
                  </View>
                ))}
              {/* Add Meal to specific slot */}
              <TouchableOpacity
                style={styles.addMealToSlotButton}
                onPress={() => {
                  setNewMealDate(dateString);
                  setNewMealType(mealType);
                  setIsAddMealModalVisible(true);
                }}
              >
                <Icon name="plus" size={16} color="#007BFF" />
                <Text style={styles.addMealToSlotButtonText}>Add</Text>
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

      {/* Global Actions Bar */}
      <View style={styles.globalActionsBar}>
        <TouchableOpacity style={styles.globalActionButton} onPress={() => Alert.alert('AI Plan', 'AI-Powered meal planning coming soon!')}>
          <Icon name="zap" size={20} color="#fff" />
          <Text style={styles.globalActionButtonText}>AI Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.globalActionButton} onPress={() => Alert.alert('Shopping List', 'Generate shopping list from plan.')}>
          <Icon name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.globalActionButtonText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.globalActionButton} onPress={() => Alert.alert('Print/Export', 'Print or export plan.')}>
          <Icon name="printer" size={20} color="#fff" />
          <Text style={styles.globalActionButtonText}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.globalActionButton} onPress={() => setIsAddMealModalVisible(true)}>
          <Icon name="plus-circle" size={20} color="#fff" />
          <Text style={styles.globalActionButtonText}>Add Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Main Calendar Grid Scrollable */}
      <ScrollView horizontal contentContainerStyle={styles.calendarGridContainer}>
        {weekDays.map(renderDayColumn)}
      </ScrollView>

      {/* Add Meal Modal */}
      <Modal
        visible={isAddMealModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddMealModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Meal</Text>

            {/* Recipe Search */}
            <TextInput
              style={styles.modalInput}
              placeholder="Search recipe by name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 1 && (
              <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.searchResultRow}
                    onPress={() => {
                      setSelectedRecipeForNewMeal(item);
                      setSearchQuery(item.name); // Show selected recipe name
                      setFilteredRecipes([]); // Clear results
                    }}
                  >
                    <Text style={styles.searchResultText}>{item.name} <Text style={styles.searchResultCategory}>({item.category})</Text></Text>
                  </TouchableOpacity>
                )}
                style={styles.searchResultsContainer}
                keyboardShouldPersistTaps="always" // Keep keyboard active for further typing
              />
            )}

            <Text style={styles.modalOrText}>— OR —</Text>

            {/* Manual/Placeholder Entry */}
            <TextInput
              style={styles.modalInput}
              placeholder="Enter custom meal text (e.g., Leftovers)"
              value={newMealCustomText}
              onChangeText={(text) => {
                setNewMealCustomText(text);
                setSelectedRecipeForNewMeal(null); // Clear recipe if custom text is entered
                setNewMealServings('1');
                setSearchQuery(''); // Clear search
              }}
            />

            {/* Date and Meal Type Pickers */}
            <View style={styles.modalPickerRow}>
              <Text style={styles.modalPickerLabel}>Date:</Text>
              {/* Replace with @react-native-picker/picker or similar for better UX */}
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newMealDate}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue) => setNewMealDate(itemValue)}
                >
                  {weekDays.map(day => (
                    <Picker.Item key={day} label={formatDateForDisplay(day)} value={day} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.modalPickerRow}>
              <Text style={styles.modalPickerLabel}>Meal Type:</Text>
               <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newMealType}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue) => setNewMealType(itemValue)}
                >
                  {mealTypes.map(type => (
                    <Picker.Item key={type} label={getMealTypeLabel(type)} value={type} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Servings for recipes */}
            {selectedRecipeForNewMeal && (
              <TextInput
                style={styles.modalInput}
                placeholder="Servings (e.g., 2, 4)"
                keyboardType="numeric"
                value={newMealServings}
                onChangeText={setNewMealServings}
              />
            )}

            {/* Modal Action Buttons */}
            <View style={styles.modalActionButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsAddMealModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddMealSubmit}>
                <Text style={styles.modalButtonText}>Add Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Light background
  },
  header: {
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  weekNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  navButton: {
    padding: 8,
  },
  weekRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
  },
  globalActionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#6A5ACD', // Purple for actions
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  globalActionButton: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  globalActionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },
  calendarGridContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  dayColumn: {
    width: 140, // Fixed width for each day
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingTop: 10,
  },
  dayColumnHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  dayColumnDate: {
    fontSize: 12,
    textAlign: 'center',
    color: '#777777',
    marginBottom: 10,
  },
  mealTypesScroll: {
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  mealTypeSection: {
    marginBottom: 15,
  },
  mealTypeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 3,
  },
  mealSlot: {
    minHeight: 60, // Minimum height for a meal slot
    backgroundColor: '#F0F8FF', // Light blue for meal backgrounds
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0E0FF',
  },
  mealItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  mealItemContent: {
    flex: 1,
  },
  mealItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  mealItemDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  mealItemDetailText: {
    fontSize: 11,
    color: '#666666',
  },
  mealItemDetailSeparator: {
    fontSize: 11,
    color: '#999999',
    marginHorizontal: 4,
  },
  mealItemDetailDate: {
    fontSize: 10,
    color: '#999999',
  },
  inlineEditInput: {
    fontSize: 14,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#007BFF',
    paddingVertical: 0,
    color: '#333333',
    minWidth: 80, // Ensure visibility
  },
  inlineEditServingsInput: {
    fontSize: 11,
    color: '#666666',
    borderBottomWidth: 1,
    borderBottomColor: '#007BFF',
    paddingVertical: 0,
    width: 30,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 8,
  },
  addMealToSlotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E6F0FF', // Light blue
    borderWidth: 1,
    borderColor: '#C0D9FF',
  },
  addMealToSlotButtonText: {
    color: '#007BFF',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '500',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%', // Limit height for scrollability
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
  },
  searchResultRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#F9F9F9',
  },
  searchResultText: {
    fontSize: 15,
    color: '#333333',
  },
  searchResultCategory: {
    fontSize: 13,
    color: '#888888',
  },
  searchResultsContainer: {
    maxHeight: 150, // Limit height of search results list
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden', // Clip content
  },
  modalOrText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#777777',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    height: 50, // Standard height for input/picker
    overflow: 'hidden', // For picker border
  },
  modalPickerLabel: {
    fontSize: 16,
    color: '#333333',
    paddingLeft: 12,
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerStyle: {
    height: 50,
    width: '100%',
    color: '#333333',
  },
  modalActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  addButton: {
    backgroundColor: '#6A5ACD', // Primary action color
  },
  cancelButton: {
    backgroundColor: '#B0B0B0', // Gray for cancel
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MealPlanningScreen;
