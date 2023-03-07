import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { priceDisplay } from '../util';

const DealItem = ({
    deal,
    onPress
}) => {
    const handlePress = () => {
        onPress(deal.key);
    };
    return (
        <TouchableOpacity style={styles.container}
            onPress={handlePress}>
            <Image source={{ uri: deal.media[0] }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text>{deal.cause.name}</Text>
                    <Text>{priceDisplay(deal.price)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

DealItem.propTypes = {
    deal: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 150,
    },
    info: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default DealItem;