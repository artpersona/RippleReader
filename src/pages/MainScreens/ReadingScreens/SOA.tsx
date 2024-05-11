import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SOABg from '../../../assets/svg/soa_bg.svg';
import Nabua from '../../../assets/svg/nabua_logo.svg';
import {CustomHeader} from '../../../components';
import {colors, height} from '../../../common';
import DashedLine from 'react-native-dashed-line';
import {Button} from 'react-native-paper';
import commonstyles from '../../../styles/commonstyles';
import RNPrint from 'react-native-print';
import {getSOAAPI} from '../../../services/meterReadingAPI';

type Props = {
  navigation: any;
  route: any;
};

function SOA({navigation, route}: Props) {
  const [loading, setLoading] = useState(false);

  const [soa, setSoa] = useState<any>({});

  useEffect(() => {
    if (route.params.id) {
      getSOAAPI(route.params.id)
        .then((res: any) => {
          console.log('res', res);
          setSoa(res);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          setLoading(false);
        });
    }
    4;
  }, [route.params.id]);

  function printSOA() {
    RNPrint.print({
      html: `<html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SOA HTML</title>
      <style>
        /* Styles */
        #mainContainer {
          width: 83%;
          height: auto;
          margin: 0 auto;
          padding-top: 12%;
        }
      
        #headerContainer {
          text-align: center;
        }
      
        #detailsContainer {
          margin-top: 15px;
        }
      
        #paymentContainer {
          text-align: center;
        }
      
        .boxDetails {
          flex: 0.5;
          padding: 5px 15px;
          border-radius: 5px;
          border: 1.5px solid #E5E5E5;
        }
      
        .computationRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 5px 0;
        }
      </style>
      </head>
      <body>
      <div id="mainContainer">
        <div id="headerContainer">
        <img src="data:image/png;base64, https://firebasestorage.googleapis.com/v0/b/tubig-3a1de.appspot.com/o/image%2034.png?alt=media&token=bfd05d56-32b8-439d-86bc-86a64760e561 " style="width: $imgWidth; height: $imgHeight"/>
        <h2 style="margin: 5px 0; font-family: 'Poppins-SemiBold'; font-size: 16px; color: #3E3E3E;">Tubig Nabua Inc.</h2>
          <h3 style="font-family: 'Poppins-Regular'; font-size: 14px; color: #707070;">Electronic Statement of Account</h3>
        </div>
        <hr style="border: 1px solid #E5E5E5; margin: 15px 0;">
        <div id="detailsContainer">
          <div id="paymentContainer">
            <h4 style="font-family: 'Poppins-Regular'; font-size: 12px; color: #707070; opacity: 0.75;">Total Amount</h4>
            <h2 style="font-family: 'Poppins-SemiBold'; font-size: 22px; color: #007BFF;">₱ 907.77</h2>
          </div>
          <div id="boxContainers" style="display: flex; gap: 10px; margin-top: 15px;">
            <div class="boxDetails">
              <p style="font-family: 'Poppins-Regular'; font-size: 10px; color: #707070;">Account Number</p>
              <p style="font-family: 'Poppins-Medium'; font-size: 12px; color: #707070; margin-top: 3px;">011-01-01-06150</p>
            </div>
            <div class="boxDetails">
              <p style="font-family: 'Poppins-Regular'; font-size: 10px; color: #707070;">Payment Time</p>
              <p style="font-family: 'Poppins-Medium'; font-size: 12px; color: #707070; margin-top: 3px;">25 Feb 2023, 13:22</p>
            </div>
          </div>
          <div class="computationDetails" style="margin-top: 15px;">
            <h4 style="font-family: 'Poppins-Regular'; font-size: 12px; color: #707070;">Computation</h4>
            <div class="computationRow">
              <p style="font-family: 'Poppins-Regular'; font-size: 12px; color: #707070;">Previous Account</p>
              <div style="flex: 1; height: 1px; margin: 0 10px; border-bottom: 1px dashed #1B399D;"></div>
              <p style="font-family: 'Poppins-Regular'; font-size: 12px; color: #707070;">₱ 907.77</p>
            </div>
            <div class="computationRow">
              <p style="font-family: 'Poppins-Regular'; font-size: 12px; color: #707070;">Other Charges</p>
              <div style="flex: 1; height: 1px; margin: 0 10px; border-bottom: 1px dashed #1B399D;"></div>
              <p style="font-family: 'Poppins-Regular'; font-size: 12px; color: #707070;">₱ 0.00</p>
            </div>
            <!-- Add other computation rows here -->
          </div>
          <hr style="border: 1px solid #E5E5E5; margin: 15px 0;">
          <div class="computationRow">
            <p style="font-family: 'Poppins-SemiBold'; font-size: 12px; color: #707070;">Total Amount Due</p>
            <p style="font-family: 'Poppins-SemiBold'; font-size: 12px; color: #707070;">₱ 907.77</p>
          </div>
        </div>
      </div>
      </body>
      </html>`,
    });
  }

  const renderMainComponent = () => {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.flex1}>
          <View style={styles.headerContainer}>
            <Nabua width={50} height={50} />
            <Text style={styles.projectName}>Tubig Nabua Inc.</Text>
            <Text style={styles.eSoaText}>Electronic Statement of Account</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.paymentContainer}>
              <Text style={styles.totalAmountText}>Total Amount</Text>
              <Text style={styles.amountText}>₱ {soa.total_amount}</Text>
            </View>

            <View style={styles.boxContainers}>
              <View style={styles.boxDetails}>
                <Text style={styles.boxLabel}>SOA Number</Text>
                <Text style={styles.boxValue}>{soa.soa_number}</Text>
              </View>
              <View style={styles.boxDetails}>
                <Text style={styles.boxLabel}>Due Date</Text>
                <Text style={styles.boxValue}>{soa.due_date}</Text>
              </View>
            </View>

            <View style={styles.computationDetails}>
              <Text style={styles.computationLabel}>Computation</Text>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Previous Account</Text>
                <View style={styles.dottedSeparator}>
                  <DashedLine
                    dashLength={3}
                    dashThickness={1}
                    dashColor="#1B399D"
                    dashStyle={styles.opa5}
                  />
                </View>
                <Text style={styles.compTitle}>
                  ₱ {soa.balance_from_prev_bill}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Other Charges</Text>
                <View style={styles.dottedSeparator}>
                  <DashedLine
                    dashLength={3}
                    dashThickness={1}
                    dashColor="#1B399D"
                    dashStyle={styles.opa5}
                  />
                </View>
                <Text style={styles.compTitle}>₱ 0.00</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Total Consumption</Text>
                <View style={styles.dottedSeparator}>
                  <DashedLine
                    dashLength={3}
                    dashThickness={1}
                    dashColor="#1B399D"
                    dashStyle={styles.opa5}
                  />
                </View>
                <Text style={styles.compTitle}>₱ {soa.amount}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Discount</Text>
                <View style={styles.dottedSeparator}>
                  <DashedLine
                    dashLength={3}
                    dashThickness={1}
                    dashColor="#1B399D"
                    dashStyle={styles.opa5}
                  />
                </View>
                <Text style={styles.compTitle}>₱ {soa.discount}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.computationRow}>
              <Text style={styles.compTotal}>Total Amount Due</Text>
              <View style={styles.dottedSeparator}>
                <DashedLine
                  dashLength={3}
                  dashThickness={1}
                  dashColor="#1B399D"
                  dashStyle={styles.opa5}
                />
              </View>
              <Text style={styles.compTotal}>₱ {soa.total_amount}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader showBackButton isTransparent={true} title="eSOA" />
      <View style={styles.shadow}>
        <SOABg
          width={'100%'}
          height={height * 0.67}
          preserveAspectRatio={'none'}
          style={styles.mtNeg15}
        />
      </View>

      {renderMainComponent()}
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
  paymentLabel: {
    color: colors.white,
    fontSize: 12,
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
    backgroundColor: 'transparent',
  },
  compTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: colors.historyLabel,
  },
  compTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
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
    fontSize: 12,
    color: colors.historyLabel,
  },
  computationDetails: {
    marginVertical: 15,
  },
  boxValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.historyLabel,
    marginTop: 3,
  },
  boxLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
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
    fontSize: 22,
    color: colors.historyMoney,
  },
  paymentContainer: {
    alignItems: 'center',
  },
  totalAmountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.historyLabel,
    opacity: 0.75,
  },
  detailsContainer: {},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.historyCardLow,
    marginVertical: 15,
  },
  eSoaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.historyLabel,
  },
  projectName: {
    marginVertical: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.historyLabel,
  },
  headerContainer: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
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
    position: 'absolute',
    width: '83%',
    height: height * 0.55,
    alignSelf: 'center',
    top: height * 0.12,
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
