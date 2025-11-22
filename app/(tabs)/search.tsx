import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';
import SearchBar from '../../components/SearchBar';
import EmptySearchState from '../../components/EmptySearchState';

export default function SearchScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const hasNoResults = searchQuery.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient
        colors={colors.background as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10 }]}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {hasNoResults && (
          <EmptySearchState />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingBottom: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
});
