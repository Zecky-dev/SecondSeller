import React from "react";

import {View, Text, Image} from 'react-native';

import {getStyles} from './EmptyList.style';
import {useTheme} from '@context/ThemeContext';

const EmptList =({label, vector}) => { // label (yazı için) ve vector (görsel için) adında iki props alır.
    const {theme} = useTheme();  // Kaydedilmiş mevcut tema alınır.
    const styles = getStyles(theme); // Temaya göre stil oluşturur.

    return (
        <View style={styles.container}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

export default EmptList;  