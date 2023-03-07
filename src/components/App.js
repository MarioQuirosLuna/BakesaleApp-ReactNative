import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { fetchInitialDeals, fetchDealSearchResults } from '../Ajax';

import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

const App = () => {
    const [deals, setDeals] = useState([]);
    const [dealsFromSearch, setDealsFromSearch] = useState([]);
    const [currentDealId, setCurrentDealId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const fetchData = async () => {
        setDeals(await fetchInitialDeals());
    };
    const searchDeals = async (searchTerm) => {
        if (searchTerm) {
            let dealsFromSearch = await fetchDealSearchResults(searchTerm);
            setDealsFromSearch(dealsFromSearch);
            setRefresh(!refresh);
        }
        setDealsFromSearch([]);
        setRefresh(!refresh);
    };
    useEffect(() => {
        if (dealsFromSearch.length > 0) {
            setDeals(dealsFromSearch);
        } else {
            fetchData();
        }
    }, [refresh]);



    const setCurrentDealIdHandler = (dealId) => {
        setCurrentDealId(dealId);
    };
    const unSetCurrentDealIdHandler = () => {
        setCurrentDealId(null);
    };
    const findCurrentDealHandler = () => {
        return deals.find((deal) => deal.key === currentDealId);
    };
    if (currentDealId) {
        return (
            <View style={styles.main}>
                <DealDetail
                    initialDealData={findCurrentDealHandler()}
                    goBackToList={unSetCurrentDealIdHandler}
                />
            </View>
        );
    }
    const dealsToDisplay = dealsFromSearch.length > 0 ? dealsFromSearch : deals;
    if (dealsToDisplay.length > 0) {
        return (
            <View style={styles.main}>
                <SearchBar searchDeals={searchDeals} />
                <DealList deals={dealsToDisplay} onItemPress={setCurrentDealIdHandler} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>BakeSale App...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        marginTop: 20,
        marginBottom: 80
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default App;