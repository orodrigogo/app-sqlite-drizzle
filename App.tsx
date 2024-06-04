import { View, Text, ActivityIndicator } from "react-native"

import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import migrations from "./drizzle/migrations"

import { useDrizzleStudio } from "expo-drizzle-studio-plugin"

import { Home } from "./src/app/home"

const DATABASE_NAME = "database.db"
const expoDB = openDatabaseSync(DATABASE_NAME)
const db = drizzle(expoDB)

export default function App() {
  const { success, error } = useMigrations(db, migrations)

  useDrizzleStudio(expoDB)

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    )
  }

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <Home />
    </SQLiteProvider>
  )
}
