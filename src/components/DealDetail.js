import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { priceDisplay } from '../util';
import { fetchDealDetail } from '../Ajax';

const DealDetail = ({
    initialDealData,
    goBackToList
}) => {
    const [fullDeal, setFullDeal] = useState({});

    const fetchData = async () => {
        setFullDeal(await fetchDealDetail(initialDealData.key));
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBackToList}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <View style={styles.details}>
                <Image source={{ uri: initialDealData.media[0] }} style={styles.image} />
                <View style={styles.titleContainer}>
                    <Text style={[styles.titleText, styles.textBold]}>{initialDealData.title}</Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.priceAndCause}>
                        <Text style={[styles.price, styles.textBold]}>{priceDisplay(initialDealData.price)}</Text>
                        <Text>{initialDealData.cause.name}</Text>
                    </View>
                    <View>
                        {fullDeal.user &&
                            (<View>
                                <Image source={{ uri: fullDeal.user.avatar }} style={styles.avatar} />
                                <Text>{fullDeal.user.name}</Text>
                            </View>)
                        }
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textBold}>{fullDeal.description}</Text>
                </View>
            </View>
        </View >
    );
};

DealDetail.propTypes = {
    initialDealData: PropTypes.object.isRequired,
    goBackToList: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    backLink: {
        margin: 10,
        color: '#22f',
        fontSize: 20,
    },
    details: {
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 150,
    },
    titleContainer: {
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
        padding: 10,
    },
    titleText: {
        fontSize: 16,
        marginBottom: 5,
    },
    info: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    priceAndCause: {
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
    },
    avatar: {
        width: 60,
        height: 60,
    },
    descriptionContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        margin: 10,
        marginTop: 0,
        borderRadius: 5,
    },
    textBold: {
        fontWeight: 'bold',
    },
});

export default DealDetail;