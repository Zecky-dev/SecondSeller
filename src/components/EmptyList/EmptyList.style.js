import { StyleSheet } from "react-native";
import THEMECOLORS from '@utils/colors';  // @utils/colors dosyasından THEMECOLORS adında nesneyi çağırdık.
import {CONSTANTS} from '@utils'; //@utils dosyasından CONTANTS adında nesneyi çağırdık.

export const getStyles = theme => {
    const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT; // Eğer tema dark ise  THEMECOLORS.DARK, değilse THEMECOLORS.LIGHT kullanılır.
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.pageBackground,  //  @utils/colors dosyasından THEMECOLORS içindeki 
            justifyContent: 'center',  // Dikey olarak ortalama
        },
        vector: {
            width: '90%', // Genişliği %90 yaptık.
            height: '50%', // Yüksekliği %50 yaptık.
            alignSelf: 'center', // Yatay olarak ortalama
            resizeMode: 'contain', // görüntünün boyutunu korur.
        },
        label: {
            color: COLORS.textColor, // Yazı rengini  @utils/colors dosyasından çektik.
            textAlign: 'center', // Yazı ortalama
            fontWeight: '300', //  Yazı kalınlığı
            marginTop: CONSTANTS.margin.L4, //  @utils/constants dosyasından üst kısım ile boşluk bırakma oranını aldık.
            fontSize: CONSTANTS.fontSize.L6, //  @utils/constants dosyasından yazı boyutunu aldık.
        },
    });
};