import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { fetchInitialDeals } from '../Ajax';

import DealList from './DealList';
import DealDetail from './DealDetail';

const App = () => {
    const [deals, setDeals] = useState([]);
    const [currentDealId, setCurrentDealId] = useState(null);

    const fetchData = async () => {
        setDeals(await fetchInitialDeals());
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            <DealDetail
                initialDealData={findCurrentDealHandler()}
                goBackToList={unSetCurrentDealIdHandler}
            />
        );
    }
    if (deals.length > 0) {
        return (
            <DealList deals={deals} onItemPress={setCurrentDealIdHandler} />
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
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default App;