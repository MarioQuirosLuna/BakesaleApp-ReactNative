import React, { useEffect, useState, useRef } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    //Dimensions
} from 'react-native';
import { fetchInitialDeals, fetchDealSearchResults } from '../Ajax';

import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

const App = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
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
    const fadeInOut = (value = 1) => {
        //const width = Dimensions.get('window').width;
        Animated.timing(fadeAnim, {
            toValue: value,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start(({ finished }) => {
            if (finished) {
                fadeInOut(value * -1);
            }
        });
    };

    useEffect(() => {
        if (dealsFromSearch.length > 0) {
            setDeals(dealsFromSearch);
        } else {
            fetchData();
        }
    }, [refresh]);

    useEffect(() => {
        fadeInOut();
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
        <Animated.View style={[{ opacity: fadeAnim }, styles.container]}>
            <Text style={styles.header}>BakeSale App...</Text>
        </Animated.View>
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