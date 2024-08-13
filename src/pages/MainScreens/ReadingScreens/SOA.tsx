import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import SOABg from '../../../assets/svg/soa_bg.svg';
import Nabua from '../../../assets/svg/nabua_logo.svg';
import {CustomHeader} from '../../../components';
import {colors, height} from '../../../common';
import {Button} from 'react-native-paper';
import commonstyles from '../../../styles/commonstyles';
import RNPrint from 'react-native-print';
import {getSOAAPI} from '../../../services/meterReadingAPI';
import {moderateScale} from 'react-native-size-matters';
import dayjs from 'dayjs';

type Props = {
  navigation: any;
  route: any;
};

function SOA({route, navigation}: Props) {
  const [soaData, setSoaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
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
  }, [route.params.soa_id]);

  useEffect(() => {
    if (soaData) {
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
                                soaData?.logo
                              }" width="60" style="float: left;">
                          </td>
                          <td width="570">
                              <span style="color: #044381;font-weight: bold; font-size: 20px;line-height: 25px;">${
                                soaData?.project_name
                              }</span><br>
                              <span style="color: #044381; line-height: 15px; font-weight: normal; font-size: 15px;">Electronic Statement of Account</span>
                          </td>
                      </tr>
                  </table>
                  <table style="width:100%;">
                      <tr>
                          <td style="text-align: center; font-size: 10px;">
                              ${soaData?.project_location}<br>
                              ${
                                soaData?.project_tin
                                  ? 'VAT Reg. TIN: ' +
                                    soaData?.project_tin +
                                    '<br>'
                                  : ''
                              }
                              ${
                                soaData?.project_contact
                                  ? 'Hotlines: ' + soaData?.project_contact
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
                                soaData?.date_generated,
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
                            soaData?.account_number
                          }</td>
                      </tr>
                      <tr>
                          <td>Account Name</td>
                          <td style="text-align: right;">${
                            soaData?.establishment_name ||
                            soaData?.first_name +
                              ' ' +
                              soaData?.middle_name +
                              ' ' +
                              soaData?.last_name +
                              ' ' +
                              soaData?.suffix_name
                          }</td>
                      </tr>
                      <tr>
                          <td>Address</td>
                          <td style="text-align: right;">${
                            soaData?.address
                          }</td>
                      </tr>
                      <tr>
                          <td>Meter No. & Brand</td>
                          <td style="text-align: right;">${
                            soaData?.serial_no
                          }</td>
                      </tr>
                      <tr>
                          <td>Rate Classification</td>
                          <td style="text-align: right;">${
                            soaData?.building_type_name
                          }</td>
                      </tr>
                      <tr>
                          <td>Sequence No.</td>
                          <td style="text-align: right;">${
                            soaData?.soa_number
                          }</td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1">
                      <tr>
                          <td>Reading Date</td>
                          <td style="text-align: right;">${new Date(
                            soaData?.reading_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                      </tr>
                      <tr>
                          <td>Period Covered</td>
                          <td style="text-align: right;">${
                            soaData?.previous_reading
                              ? new Date(
                                  soaData?.previous_reading,
                                ).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                }) + ' to '
                              : ''
                          }${new Date(soaData?.reading_date).toLocaleDateString(
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
                            soaData?.present_reading
                          }</td>
                      </tr>
                      <tr>
                          <td>Previous Reading</td>
                          <td style="text-align: right;">${
                            soaData?.previous_reading || ''
                          }</td>
                      </tr>
                      <tr>
                          <td>Consumption</td>
                          <td style="text-align: right;">${
                            soaData?.consumption
                          }</td>
                      </tr>
                      <tr>
                          <td>Total Current Bill</td>
                          <td style="text-align: right;">${soaData?.amount}</td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="width: 60%;"><strong>Current Charges</strong></td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soaData?.amount
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Basic Charge</td>
                          <td style="width: 20%;text-align: right;">₱${
                            soaData?.basic_charge
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td>VAT</td>
                          <td style="width: 20%;text-align: right;">₱${
                            soaData?.vat_amount
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      ${
                        soaData?.discount > 0
                          ? `
                      <tr>
                          <td>Discount</td>
                          <td style="width: 20%;text-align: right;"> - ₱${soaData?.discount}</td>
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
                            soaData?.balance_from_prev_bill
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Arrears</td>
                          <td style="width: 20%;text-align: right;">₱${
                            soaData?.balance_from_prev_bill
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>TOTAL AMOUNT DUE</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soaData?.total_amount +
                            soaData?.balance_from_prev_bill
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>PENALTY</strong></td>
                          <td style="width: 20%;text-align: right;">₱${
                            soaData?.amount * 0.1
                          }</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>TOTAL AMOUNT AFTER DUE DATE</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            soaData?.total_amount +
                            soaData?.balance_from_prev_bill +
                            soaData?.amount * 0.1
                          }</strong></td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px dotted #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="width: 60%;">Due Date</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            soaData?.due_date,
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
                            soaData?.disconnection_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Reference No</td>
                          <td style="width: 20%;text-align: right;">${soaData?.meter_reading_id
                            ?.toString()
                            ?.padStart(8, '0')}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Meter Reader</td>
                          <td style="width: 20%;text-align: right;">${
                            soaData?.meter_reader
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Date/Time</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            soaData?.reading_date,
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
  }, [soaData]);

  function printSOA() {
    RNPrint.print({
      html: htmlString,
    });
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
        <View style={styles.shadow}>
          <SOABg
            width={'100%'}
            height={height * 0.67}
            preserveAspectRatio={'none'}
            style={[styles.mtNeg15, styles.soaBG]}
          />
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Nabua width={50} height={50} />
            <View>
              <Text style={styles.projectName}>{soaData?.project_name}</Text>
              <Text style={styles.eSoaText}>
                Electronic Statement of Account
              </Text>
              <Text style={styles.locationText}>
                {soaData?.project_location}
              </Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.paymentContainer}>
              <Text style={styles.totalAmountText}>Statement of Account</Text>
              <Text style={styles.amountText}>
                For the month of{' '}
                {new Date(soaData?.date_generated_raw).toLocaleString(
                  'default',
                  {
                    month: 'long',
                  },
                )}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.computationDetails}>
              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Account Number</Text>
                <Text style={styles.compTitle}>{soaData?.account_number}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Account Name</Text>
                <Text style={styles.compTitle}>{soaData?.account_name}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Address</Text>
                <Text style={styles.compTitle}>
                  {soaData?.address !== '' ? soaData?.address : 'N/A'}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Meter No. & Brand</Text>
                <Text style={styles.compTitle}>{soaData?.serial_no}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Rate Classification</Text>
                <Text style={styles.compTitle}>
                  {soaData?.building_type_name}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Sequence No.</Text>
                <Text style={styles.compTitle}>{soaData?.soa_number}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.computationDetails}>
              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Reading Date</Text>
                <Text style={styles.compTitle}>{soaData?.reading_date}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Period Covered</Text>
                {soaData?.previous_reading ? (
                  <Text style={styles.compTitle}>{`${dayjs(
                    soaData?.previous_reading?.reading_datetime,
                  ).format('MMM DD')} - ${dayjs(soaData?.reading_date).format(
                    'MMM DD',
                  )}`}</Text>
                ) : (
                  <Text style={styles.compTitle}>{soaData?.reading_date}</Text>
                )}
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Present Reading</Text>
                <Text style={styles.compTitle}>{soaData?.present_reading}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Previous Reading</Text>
                <Text style={styles.compTitle}>
                  {soaData?.previous_reading?.present_reading ?? 'N/A'}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Consumption</Text>
                <Text style={styles.compTitle}>{soaData?.consumption}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Total Current Bill</Text>
                <Text style={styles.compTitle}>{soaData?.amount}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.computationDetails}>
              <View style={styles.computationRow}>
                <Text style={[styles.compTitle, styles.bold]}>
                  Current Charges
                </Text>
                <Text style={[styles.compTitle, styles.bold]}>
                  {soaData?.amount}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Basic Charge</Text>
                <Text style={styles.compTitle}>{soaData?.basic_charge}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>VAT</Text>
                <Text style={styles.compTitle}>{soaData?.vat_amount}</Text>
              </View>

              {parseInt(soaData?.discount, 10) > 0 && (
                <View style={styles.computationRow}>
                  <Text style={styles.compTitle}>VAT</Text>
                  <Text style={[styles.compTitle, styles.red]}>
                    {soaData?.discount}
                  </Text>
                </View>
              )}

              <View style={styles.computationRow}>
                <Text style={[styles.compTitle, styles.bold]}>
                  Other Charges
                </Text>
                <Text style={[styles.compTitle, styles.bold]}>N/A</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>
                  Application / Reconnection Fee
                </Text>
                <Text style={styles.compTitle}>N/A</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Promissory Note Amount</Text>
                <Text style={styles.compTitle}>N/A</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>
                  Labor / Materials and Others
                </Text>
                <Text style={styles.compTitle}>N/A</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={[styles.compTitle, styles.bold]}>
                  Previous Unpaid Amount
                </Text>
                <Text style={[styles.compTitle, styles.bold]}>
                  {soaData?.balance_from_prev_bill}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Arrears</Text>
                <Text style={styles.compTitle}>
                  {soaData?.balance_from_prev_bill}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={[styles.compTitle, styles.bold]}>
                  TOTAL AMOUNT DUE
                </Text>
                <Text style={[styles.compTitle, styles.bold]}>
                  {(
                    parseFloat(soaData?.total_amount) +
                    parseFloat(soaData?.balance_from_prev_bill)
                  ).toFixed(2)}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={[styles.compTitle, styles.bold]}>PENALTY</Text>
                <Text style={[styles.compTitle, styles.bold]}>
                  {(parseFloat(soaData?.amount) * 0.1).toFixed(2)}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={[styles.compTitle, styles.bold]}>
                  TOTAL AMOUNT AFTER DUE DATE
                </Text>
                <Text style={[styles.compTitle, styles.bold]}>
                  {(
                    parseFloat(soaData?.total_amount) +
                    parseFloat(soaData?.balance_from_prev_bill) +
                    parseFloat(soaData?.amount) * 0.1
                  ).toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.computationDetails}>
              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Due Date</Text>
                <Text style={styles.compTitle}>{soaData?.due_date}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Disconnection Date</Text>
                <Text style={styles.compTitle}>
                  {soaData?.disconnection_date}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Reference No.</Text>
                <Text style={styles.compTitle}>
                  {soaData?.meter_reading_id.toString().padStart(8, '0')}
                </Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Meter Reader</Text>
                <Text style={styles.compTitle}>{soaData?.meter_reader}</Text>
              </View>

              <View style={styles.computationRow}>
                <Text style={styles.compTitle}>Date/Time</Text>
                <Text style={styles.compTitle}>{soaData?.reading_date}</Text>
              </View>
            </View>
            <View style={styles.divider} />

            <View style={styles.noticeContainer}>
              <Text style={styles.noticeTitle}>Important Notice</Text>
              <Text style={styles.noticeContent}>
                Pay your water bill by the due date to avoid penalties. Service
                may be disconnected if there are arrears before the stated
                disconnection date. For bill inquiries, visit our office or call
                our hotlines by the 10th of the month. You can also message us
                at facebook.com/tubignabuainc.
              </Text>
            </View>
          </View>
        </View>
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
