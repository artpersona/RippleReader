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
import {moderateScale} from 'react-native-size-matters';

type Props = {
  navigation: any;
  route: any;
};

function SOA({route}: Props) {
  const [loading, setLoading] = useState(false);

  const [soa, setSoa] = useState<any>(null);
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    if (route.params.id) {
      getSOAAPI(route.params.id)
        .then((res: any) => {
          setSoa(res);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          setLoading(false);
        });
    }
  }, [route.params.id]);

  useEffect(() => {
    if (soa) {
      const tempHtmlString = `
      <html>
        <head>
          <style>
          @page {
              size: A4;
              margin: 10mm;
            }
            body {
              color: #044381;
            }
            table {
              color: #044381;
              font-size: 12px;
            }
            .dot-table td {
              max-width: 200px;
              overflow: hidden;
              white-space: nowrap;
            }
          </style>
        </head>
        <body>
         
      
            <table style="margin: auto;">
                      <tr>
                          <td width="70">
                              <img src="${
                                soa.logo
                              }" width="60" style="float: left;">
                          </td>
                          <td width="570">
                              <span style="color: #044381;font-weight: bold; font-size: 20px;line-height: 25px;">${
                                soa?.project_name
                              }</span><br>
                              <span style="color: #044381; line-height: 15px; font-weight: normal; font-size: 15px;">Electronic Statement of Account</span>
                          </td>
                      </tr>
                  </table>
                  <table style="width:100%;">
                      <tr>
                          <td style="text-align: center; font-size: 10px;">
                              ${soa?.project_location}<br>
                              ${
                                soa?.project_tin
                                  ? 'VAT Reg. TIN: ' + soa?.project_tin + '<br>'
                                  : ''
                              }
                              ${
                                soa?.project_contact
                                  ? 'Hotlines: ' + soa?.project_contact
                                  : ''
                              }
                          </td>
                      </tr>
                      <tr>
                          <td>
                          <br>
                          <br>
                              <h2 style="color: #044381;font-weight: bold; font-size: 17px; text-align: center;line-height: 20px;">STATEMENT OF ACCOUNT</h2>
                              <h2 style="color: #044381;font-weight: bold; font-size: 17px; text-align: center;line-height: 1.3em;">FOR THE MONTH OF ${new Date(
                                soa?.date_generated,
                              )
                                .toLocaleString('default', {month: 'long'})
                                .toUpperCase()}</h2>
                          </td>
                      </tr>
                  </table>
                  <br><br>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" style="margin: auto;text-align: left;" cellpadding="1">
                      <tr>
                          <td>Account Number</td>
                          <td style="text-align: right;">${
                            soa?.account_number
                          }</td>
                      </tr>
                      <tr>
                          <td>Account Name</td>
                          <td style="text-align: right;">${
                            soa?.establishment_name ||
                            soa?.first_name +
                              ' ' +
                              soa?.middle_name +
                              ' ' +
                              soa?.last_name +
                              ' ' +
                              soa?.suffix_name
                          }</td>
                      </tr>
                      <tr>
                          <td>Address</td>
                          <td style="text-align: right;">${soa?.address}</td>
                      </tr>
                      <tr>
                          <td>Meter No. & Brand</td>
                          <td style="text-align: right;">${soa?.serial_no}</td>
                      </tr>
                      <tr>
                          <td>Rate Classification</td>
                          <td style="text-align: right;">${
                            soa?.building_type_name
                          }</td>
                      </tr>
                      <tr>
                          <td>Sequence No.</td>
                          <td style="text-align: right;">${soa?.soa_number}</td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1">
                      <tr>
                          <td>Reading Date</td>
                          <td style="text-align: right;">${new Date(
                            soa?.reading_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                      </tr>
                      <tr>
                          <td>Period Covered</td>
                          <td style="text-align: right;">${
                            soa?.previous_reading
                              ? new Date(
                                  soa?.previous_reading,
                                ).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                }) + ' to '
                              : ''
                          }${new Date(soa?.reading_date).toLocaleDateString(
        'en-GB',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      )}</td>
                      </tr>
                      <tr>
                          <td>Present Reading</td>
                          <td style="text-align: right;">${
                            soa?.present_reading
                          }</td>
                      </tr>
                      <tr>
                          <td>Previous Reading</td>
                          <td style="text-align: right;">${
                            soa?.previous_reading || ''
                          }</td>
                      </tr>
                      <tr>
                          <td>Consumption</td>
                          <td style="text-align: right;">${
                            soa?.consumption
                          }</td>
                      </tr>
                      <tr>
                          <td>Total Current Bill</td>
                          <td style="text-align: right;">${soa?.amount}</td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="width: 60%;"><strong>Current Charges</strong></td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soa?.amount
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Basic Charge</td>
                          <td style="width: 20%;text-align: right;">₱${
                            soa?.basic_charge
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td>VAT</td>
                          <td style="width: 20%;text-align: right;">₱${
                            soa?.vat_amount
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      ${
                        soa?.discount > 0
                          ? `
                      <tr>
                          <td>Discount</td>
                          <td style="width: 20%;text-align: right;"> - ₱${soa?.discount}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      `
                          : ''
                      }
                      <tr>
                          <td style="width: 60%;"><strong>Other Charges</strong></td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Application / Reconnection Fee</td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Promissory Note Amount</td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td>Labor/Materials and Others</td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>Previous Unpaid Amount</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soa?.balance_from_prev_bill
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Arrears</td>
                          <td style="width: 20%;text-align: right;">₱${
                            soa?.balance_from_prev_bill
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>TOTAL AMOUNT DUE</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soa?.total_amount + soa?.balance_from_prev_bill
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>PENALTY</strong></td>
                          <td style="width: 20%;text-align: right;">₱${
                            soa?.amount * 0.1
                          }</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>TOTAL AMOUNT AFTER DUE DATE</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soa?.total_amount +
                            soa?.balance_from_prev_bill +
                            soa?.amount * 0.1
                          }</strong></td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px dotted #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="width: 60%;">Due Date</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            soa?.due_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Disconnection Date</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            soa?.disconnection_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Reference No</td>
                          <td style="width: 20%;text-align: right;">${soa?.meter_reading_id
                            ?.toString()
                            ?.padStart(8, '0')}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Meter Reader</td>
                          <td style="width: 20%;text-align: right;">${
                            soa?.meter_reader
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Date/Time</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            soa?.reading_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px dotted #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="font-size: 12px;text-align: center;">
                              <strong>Important Notice</strong><br>
                              Pay your water bill by the due date to avoid penalties. Service may be disconnected if there are arrears before the stated disconnection date.<br><br>
                              For bill inquiries, visit our office or call our hotlines by the 10th of the month. You can also message us at facebook.com/tubignabuainc.
                          </td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px dotted #E7EBF4;"></div>
                  <br>
            
        </body>
      </html>`;

      setHtmlString(tempHtmlString);
    }
  }, [soa]);

  function printSOA() {
    RNPrint.print({
      html: htmlString,
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
              <Text style={styles.amountText}>₱ {soa?.total_amount}</Text>
            </View>

            <View style={styles.boxContainers}>
              <View style={styles.boxDetails}>
                <Text style={styles.boxLabel}>SOA Number</Text>
                <Text style={styles.boxValue}>{soa?.soa_number}</Text>
              </View>
              <View style={styles.boxDetails}>
                <Text style={styles.boxLabel}>Due Date</Text>
                <Text style={styles.boxValue}>{soa?.due_date}</Text>
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
                  ₱ {soa?.balance_from_prev_bill}
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
                <Text style={styles.compTitle}>₱ {soa?.amount}</Text>
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
                <Text style={styles.compTitle}>₱ {soa?.discount}</Text>
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
              <Text style={styles.compTotal}>₱ {soa?.total_amount}</Text>
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

      {soa && renderMainComponent()}
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
    backgroundColor: 'transparent',
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
    fontSize: moderateScale(22),
    color: colors.historyMoney,
  },
  paymentContainer: {
    alignItems: 'center',
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
    marginVertical: 15,
  },
  eSoaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
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
