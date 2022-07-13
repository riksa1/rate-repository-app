import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const FilterComponent = ({ state, setState }) => {
  const [selectedFilter, setSelectedFilter] = useState("Latest");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  const onChangeSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    setState({ ...state, searchKeyword: value });
  }, [value]);

  useEffect(() => {
    if (selectedFilter === "Latest") {
      setState({ ...state, orderDirection: "DESC", orderBy: "CREATED_AT" });
    } else if (selectedFilter === "HighestRated") {
      setState({ ...state, orderDirection: "DESC", orderBy: "RATING_AVERAGE" });
    } else {
      setState({ ...state, orderDirection: "ASC", orderBy: "RATING_AVERAGE" });
    }
  }, [selectedFilter]);

  return (
    <View>
      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Searchbar style={{ width: "100%" }} placeholder="Search" onChangeText={onChangeSearch} value={search} />
      </View>
      <View style={{ marginVertical: 10, marginLeft: 10 }}>
        <Picker selectedValue={selectedFilter} onValueChange={(itemValue) => setSelectedFilter(itemValue)}>
          <Picker.Item label="Latest repositories" value="Latest" />
          <Picker.Item label="Highest rated repositories" value="HighestRated" />
          <Picker.Item label="Lowest rated repositories" value="LowestRated" />
        </Picker>
      </View>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, setState, state, onEndReach }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={<FilterComponent setState={setState} state={state} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [state, setState] = useState({ first: 15, orderDirection: "DESC", orderBy: "CREATED_AT", searchKeyword: "" });
  const { repositories, fetchMore } = useRepositories(state);

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} state={state} setState={setState} />;
};

export default RepositoryList;
