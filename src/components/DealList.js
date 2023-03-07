import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';

import DealItem from './DealItem';

const DealList = ({
    deals,
    onItemPress
}) => {
    return (
        < View style={styles.list} >
            <FlatList
                data={deals}
                renderItem={({ item }) => (
                    <DealItem deal={item} onPress={onItemPress} />
                )}
            />
        </ View>
    );
};

DealList.propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        paddingTop: 50,
    },
});

export default DealList;
