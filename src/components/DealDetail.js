import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    PanResponder,
    Animated,
    Button,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Linking
} from 'react-native';
import { priceDisplay } from '../util';
import { fetchDealDetail } from '../Ajax';

const DealDetail = ({
    initialDealData,
    goBackToList
}) => {
    const width = Dimensions.get('window').width;
    const imageXPos = useRef(new Animated.Value(0)).current;

    const imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (evt, gestureState) => {
            imageXPos.setValue(gestureState.dx);
        },
        onPanResponderRelease: (evt, gestureState) => {
            //if the movement is more than 40% of the screen width
            if (Math.abs(gestureState.dx) > width * 0.4) {
                const direction = Math.sign(gestureState.dx);
                Animated.timing(imageXPos, {
                    toValue: direction * width,
                    duration: 250,
                    useNativeDriver: false,
                }).start(() => handleSwipe(-1 * direction));
            } else {
                Animated.spring(imageXPos, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    const handleSwipe = (indexDirection) => {
        if (!fullDeal.media[imageIndex + indexDirection]) {
            Animated.spring(imageXPos, {
                toValue: 0,
                useNativeDriver: false,
            }).start();
            return;
        }

        setImageIndex(imageIndex + indexDirection);
        imageXPos.setValue(indexDirection * width);
        Animated.spring(imageXPos, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    };

    const [fullDeal, setFullDeal] = useState(initialDealData);
    const [imageIndex, setImageIndex] = useState(0);

    const fetchData = async () => {
        setFullDeal(await fetchDealDetail(initialDealData.key));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openDealUrl = () => {
        Linking.openURL(fullDeal.url);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBackToList}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <View>
                <Animated.Image
                    {...imagePanResponder.panHandlers}
                    source={{ uri: initialDealData.media[imageIndex] }}
                    style={[{ left: imageXPos }, styles.image]}
                />
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
                <Button title="Buy this deal!" onPress={openDealUrl} />
            </View>
        </View >
    );
};

DealDetail.propTypes = {
    initialDealData: PropTypes.object.isRequired,
    goBackToList: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    backLink: {
        marginHorizontal: 10,
        marginBottom: 16,
        color: '#22f',
        fontSize: 20,
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
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 50,
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