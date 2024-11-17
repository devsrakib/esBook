<<<<<<< HEAD
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Stack } from "expo-router";
// import Header from "@/components/UI/header/Header";
// import { Colors } from "@/constants/Colors";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useSQLiteContext } from "expo-sqlite";
// import { getSuppliers } from "@/databases/Database";
// import AllSuppliers from "@/components/UI/AllSuppliers";
// import Empty from "@/components/UI/Empty";
// import { FontAwesome5 } from "@expo/vector-icons";

// const page = () => {
//   const { bottom, top } = useSafeAreaInsets();
//   const [suppliers, setSuppliers] = useState<any>();
//   const db = useSQLiteContext();
//   useEffect(() => {
//     async function setup() {
//       const result = await getSuppliers(db);
//       setSuppliers(result);
//     }
//     setup();
//   }, []);
//   return (
//     <View
//       style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
//     >
//       <Stack.Screen
//         options={{
//           headerShown: false,
//           animation: "slide_from_right",
//           animationDuration: 100,
//         }}
//       />
//       <Header
//         children="All Supplier"
//         backgroundColor={Colors.mainColor}
//         textColor={Colors.white}
//       />

//       {suppliers?.length === 0 ? (
//         <Empty
//           text="No Supplier"
//           icon={<FontAwesome5 name="user-alt-slash" size={24} color="black" />}
//         />
//       ) : (
//         <FlatList
//           data={suppliers}
//           contentContainerStyle={{
//             gap: 10,
//             paddingTop: 10,
//           }}
//           renderItem={({ item }) => {
//             return <AllSuppliers item={item} />;
//           }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
// });

// export default page;

import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { getCustomers } from "@/databases/Database";
import AllCustomers from "@/components/UI/AllCustomers";
import useApiHook from "@/hooks/all_api_hooks";
import EmptyState from "@/components/UI/EmptyState";

const Page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const db = useSQLiteContext();
  const { data: customer, loading } = useApiHook("suppliers/");

  console.log(customer, "customer data");

=======
import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/UI/header/Header";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { getSuppliers } from "@/databases/Database";
import AllSuppliers from "@/components/UI/AllSuppliers";
import Empty from "@/components/UI/Empty";
import { FontAwesome5 } from "@expo/vector-icons";

const page = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [suppliers, setSuppliers] = useState<any>();
  const db = useSQLiteContext();
  useEffect(() => {
    async function setup() {
      const result = await getSuppliers(db);
      setSuppliers(result);
    }
    setup();
  }, []);
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 100,
        }}
      />
      <Header
        children="All Supplier"
<<<<<<< HEAD
        textColor={Colors.white}
        backgroundColor={Colors.mainColor}
      />
      <View style={styles.bodySection}>
        <FlatList
          data={customer?.data}
          contentContainerStyle={[
            styles.flatListContainer,
            customer &&
              customer?.data?.length === 0 &&
              styles.emptyListContainer,
          ]}
          renderItem={({ item, index }) => {
            return <AllCustomers item={item} index={index} />;
          }}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <EmptyState
                message="No Supplier Found"
                icon="person"
                iconSize={60}
                color={Colors.text}
              />
            </View>
          }
        />
      </View>
=======
        backgroundColor={Colors.mainColor}
        textColor={Colors.white}
      />

      {suppliers?.length === 0 ? (
        <Empty
          text="No Supplier"
          icon={<FontAwesome5 name="user-alt-slash" size={24} color="black" />}
        />
      ) : (
        <FlatList
          data={suppliers}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 10,
          }}
          renderItem={({ item }) => {
            return <AllSuppliers item={item} />;
          }}
        />
      )}
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
<<<<<<< HEAD
  bodySection: {
    flex: 1, // Take full available space
    paddingVertical: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    gap: 10,
    flexGrow: 1,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
=======
});

export default page;
>>>>>>> 33edb8771ade265b3a093c070c22c8ef3821d12b
