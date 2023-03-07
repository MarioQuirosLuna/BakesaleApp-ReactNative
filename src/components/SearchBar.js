import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchDeals }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    };
    useEffect(() => {
        searchDeals(searchTerm);
    }, [searchTerm]);
    return (
        <TextInput
            placeholder='Search All Deals'
            style={styles.input}
            onChangeText={handleChange}
        />
    );
}

SearchBar.propTypes = {
    searchDeals: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default SearchBar;