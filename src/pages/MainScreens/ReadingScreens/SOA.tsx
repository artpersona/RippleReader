import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, BackHandler, Image} from 'react-native';
import SOABg from '../../../assets/svg/soa_bg.svg';
import {CustomHeader} from '../../../components';
import {colors, height} from '../../../common';
import {Button} from 'react-native-paper';
import commonstyles from '../../../styles/commonstyles';
import RNPrint from 'react-native-print';
import {getSOAAPI} from '../../../services/meterReadingAPI';
import {moderateScale} from 'react-native-size-matters';
import {useUserStore} from '../../../stores';
import SOACard from '../../../components/SOACard';
import ViewShot from 'react-native-view-shot';
import {captureRef} from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

type Props = {
  navigation: any;
  route: any;
};

function SOA({route, navigation}: Props) {
  const viewShotRef = React.useRef(null) as any;

  const {isConnected} = useUserStore() as any;
  const [soaData, setSoaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    (async () => {
      setLoading(true);
      if (route.params.soa_id) {
        try {
          const data = await getSOAAPI(route.params.soa_id);
          setSoaData(data);
          setLoading(false);
        } catch (e) {
          console.log('error', e);
          setLoading(false);
        }
      }
    })();
  }, [route.params.soa_id, isConnected]);

  useEffect(() => {
    if (!isConnected && route.params?.offlineSOA) {
      setSoaData(route.params.offlineSOA);
    }
  }, [isConnected, route.params.offlineSOA]);

  async function printSOA() {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
        result: 'base64',
      });

      const imageUri = `data:image/png;base64,${uri}`;
      const imageData = Image.getSize(imageUri);

      const pdfOptions = {
        html: `
          <html>
            <head>
              <style>
                body { margin: 0; padding: 0; text-align: center; background-color: white; }
                img { max-width: 100%; height: auto; max-height: 100vh; }
              </style>
            </head>
            <body>
              <img src="data:image/jpeg;base64,${uri}" />
            </body>
          </html>
        `,
        fileName: 'Statement_of_Account',
        base64: true, // Set to true if you want base64 output
      };

      const pdf = (await RNHTMLtoPDF.convert(pdfOptions)) as any;
      await RNPrint.print({filePath: pdf.filePath});
    } catch (error) {
      console.error('Print Error:', error);
    }
  }

  useEffect(() => {
    const backAction = () => {
      if (route?.params?.fromBilling) {
        navigation.navigate('HomeLanding');
        return true;
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('soa data is: ', soaData);

  return (
    <View style={styles.container}>
      <CustomHeader
        showBackButton
        backAction={
          route?.params?.fromBilling
            ? () => {
                navigation.navigate('HomeLanding');
              }
            : null
        }
        isTransparent={true}
        title="eSOA"
      />
      <ScrollView
        style={styles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentStyle}>
        <View>
          <SOABg
            width={'100%'}
            height={height * 0.67}
            preserveAspectRatio={'none'}
            style={[styles.mtNeg15, styles.soaBG]}
          />
        </View>
        <ViewShot
          ref={viewShotRef}
          options={{
            format: 'jpg',
            quality: 1,
            fileName: soaData?.soa_number ?? '',
            width: 79,
          }}>
          <SOACard soaData={soaData} />
        </ViewShot>
      </ScrollView>
      <View style={styles.floatingBottomButton}>
        <Button
          mode="contained"
          onPress={printSOA}
          style={[commonstyles.button, styles.paymentButton]}
          contentStyle={commonstyles.buttonContent}
          labelStyle={styles.paymentLabel}
          loading={loading}>
          Print Statement of Account
        </Button>
      </View>
    </View>
  );
}

export default SOA;

const styles = StyleSheet.create({
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(10),
    color: colors.historyLabel,
    opacity: 0.75,
  },
  soaBG: {
    position: 'absolute',
    paddingBottom: 20,
  },
  red: {
    color: colors.danger,
  },
  noticeContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(10),
    color: colors.historyLabel,
    textAlign: 'justify',
    lineHeight: 20,
  },
  noticeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
    textAlign: 'center',
    marginBottom: 10,
  },
  noticeContainer: {
    marginTop: 20,
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  contentStyle: {
    paddingBottom: height * 0.2,
  },
  paymentLabel: {
    color: colors.white,
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Regular',
  },
  paymentButton: {
    backgroundColor: colors.tertiary,
    shadowColor: colors.tertiary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderWidth: 1,
  },
  floatingBottomButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  compTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
  },
  compTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
  },
  opa5: {opacity: 0.5},
  dottedSeparator: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
  },
  computationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  computationLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
  },
  computationDetails: {
    marginVertical: 15,
  },
  boxValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
    marginTop: 3,
  },
  boxLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(10),
    color: colors.historyLabel,
  },
  boxDetails: {
    flex: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.greyBorder,
  },
  boxContainers: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  amountText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(14),
    color: colors.historyMoney,
    textTransform: 'uppercase',
  },
  paymentContainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  totalAmountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
    opacity: 0.75,
  },

  detailsContainer: {},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.historyCardLow,
    marginVertical: 5,
  },
  eSoaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    color: colors.historyLabel,
  },
  projectName: {
    marginVertical: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(16),
    color: colors.historyLabel,
  },
  headerContainer: {
    alignItems: 'center',
  },
  flex1: {
    flexGrow: 1,
  },
  testComponent: {
    height: 300,
    backgroundColor: 'blue',
    width: 200,
    marginBottom: 20,
  },
  mtNeg15: {
    marginTop: -15,
  },
  mainContainer: {
    width: '90%',
    alignSelf: 'center',
    top: height * 0.05,
    paddingHorizontal: '7%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
