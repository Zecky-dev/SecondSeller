import {CONSTANTS} from '@utils'
import { StyleSheet } from 'react-native'
import THEMECOLORS from '@utils/colors'
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export const getStyles = theme => {
    const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT; // Eğer tema dark ise THEMECOLORS.DARK, değilse THEMECOLORS.LIGHT bilgilerini alır.
    return StyleSheet.create({
        container: {
            flexDirection: 'row', // Nesneleri yatay oalrak yerleştirir.
            alignItems: 'center', // Nesneleri dikey olarak ortalar
            backgroundColor: COLORS.cardBackground, // @utils/colors dosyasından arkaplan rengini alıyoruz.
            padding: CONSTANTS.padding.L2, // @utils/constants dosyasından boşluğu ayarlama
            marginHorizontal: CONSTANTS.margin.L3, // @utils/constants dosyasından yatay boşluk ayarlama
            marginVertical: CONSTANTS.margin.L1, // @utils/constants dosyasından dikey boşluk ayarlama
            borderRadius: CONSTANTS.margin.L2, // @utils/constants dosyasından mesaj kartının kenar yuvarlaması
            borderWidth: 1, // Kenar genişliği ayarlama
            borderColor: COLORS.blackMuted, //  @utils/colors dosyasından mesaj kartının kenar rengini ayarlama 
        },
        image: {
            width: 80, // Görüntü genişliği ayarlama
            height: 80, // Görüntü yüksekliği ayarlama
            borderRadius: 40, // Görüntü kenar yuvarlamasını ayarlama
        },
        name: {
            color: COLORS.cardTitle, // @utils/colors dosyasından mesaj kartı rengini ayarlama
            fontSize: CONSTANTS.fontSize.L5, // @utils/constants dosyasından yazı boyutunu ayarlama
            textAlign: 'center', // yazıyı yatay olarak hizalama
        },
        advertisementTitle: {
            textAlign: 'center', // yazıyı yatay olarak hizalama
            color: COLORS.cardDescription, // @utils/colors dosyasından mesaj kartı açıklamasının yazı rengini ayarlama
            fontSize: CONSTANTS.fontSize.L3, // @utils/constants dosyasından mesaj kartının boyutunu ayarlama
            fontStyle: 'italic',  // mesaj kartının yazı tipini ayarlama
        },
    });
};