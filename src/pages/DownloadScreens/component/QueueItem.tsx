import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../common';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../../../utils';
import {Button} from 'react-native-paper';
import commonstyles from '../../../styles/commonstyles';
import RNPrint from 'react-native-print';
import useDownloadStore from '../../../stores/download.store';

type Props = {
  item: any;
};

const {width} = Dimensions.get('window');

function QueueItem({item}: Props) {
  const {markReadingActionAsPrinted} = useDownloadStore() as any;
  const navigation = useNavigation() as any;
  const [htmlString, setHtmlString] = useState('');

  const icon: any = {
    queued: <Ionicons name="time-outline" size={40} color={colors.yellow} />,
    completed: (
      <Ionicons name="checkmark-done-circle-sharp" size={40} color={'green'} />
    ),
    printed: <Ionicons name="print" size={40} color={colors.primary} />,
  };

  const title: any = {
    queued: 'Queued',
    completed: 'Completed',
  };

  const editReading = () => {
    navigation.navigate(NavigationRoutes.OFFLINE_READING, {
      account: item.details.accountDetails,
      offlineReading: item.details?.readingDetails,
    });
  };

  async function printSOA() {
    await RNPrint.print({
      html: htmlString,
    });
    await markReadingActionAsPrinted(item);
  }

  useEffect(() => {
    if (item?.soaData) {
      const totalAmount = Number(item?.soaData?.total_amount || 0);
      const previousBalance = Number(
        item?.soaData?.balance_from_prev_bill || 0,
      );
      const total = totalAmount + previousBalance;

      // Format as PHP currency
      const formattedTotal = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(total);

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
                                item?.soaData?.logo
                              }" width="60" style="float: left;">
                          </td>
                          <td width="570">
                              <span style="color: #044381;font-weight: bold; font-size: 20px;line-height: 25px;">${
                                item?.soaData?.project_name
                              }</span><br>
                              <span style="color: #044381; line-height: 15px; font-weight: normal; font-size: 15px;">Electronic Statement of Account</span>
                          </td>
                      </tr>
                  </table>
                  <table style="width:100%;">
                      <tr>
                          <td style="text-align: center; font-size: 10px;">
                              ${item?.soaData?.project_location}<br>
                              ${
                                item?.soaData?.project_tin
                                  ? 'VAT Reg. TIN: ' +
                                    item?.soaData?.project_tin +
                                    '<br>'
                                  : ''
                              }
                              ${
                                item?.soaData?.project_contact
                                  ? 'Hotlines: ' +
                                    item?.soaData?.project_contact
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
                                item?.soaData?.date_generated,
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
                            item?.soaData?.account_number
                          }</td>
                      </tr>
                      <tr>
                          <td>Account Name</td>
                          <td style="text-align: right;">${
                            item?.soaData?.establishment_name ||
                            item?.soaData?.first_name +
                              ' ' +
                              item?.soaData?.middle_name +
                              ' ' +
                              item?.soaData?.last_name +
                              ' ' +
                              item?.soaData?.suffix_name
                          }</td>
                      </tr>
                      <tr>
                          <td>Address</td>
                          <td style="text-align: right;">${
                            item?.soaData?.address
                          }</td>
                      </tr>
                      <tr>
                          <td>Meter No. & Brand</td>
                          <td style="text-align: right;">${
                            item?.soaData?.serial_no
                          }</td>
                      </tr>
                      <tr>
                          <td>Rate Classification</td>
                          <td style="text-align: right;">${
                            item?.soaData?.building_type_name
                          }</td>
                      </tr>
                      <tr>
                          <td>Sequence No.</td>
                          <td style="text-align: right;">${
                            item?.soaData?.soa_number
                          }</td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1">
                      <tr>
                          <td>Reading Date</td>
                          <td style="text-align: right;">${new Date(
                            item?.soaData?.reading_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                      </tr>
                      <tr>
                          <td>Period Covered</td>
                          <td style="text-align: right;">${
                            item?.soaData?.previous_reading
                              ? new Date(
                                  item?.soaData?.previous_reading?.reading_datetime,
                                ).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                }) + ' to '
                              : ''
                          }${new Date(
        item?.soaData?.reading_date,
      ).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</td>
                      </tr>
                      <tr>
                          <td>Present Reading</td>
                          <td style="text-align: right;">${
                            item?.soaData?.present_reading
                          }</td>
                      </tr>
                      <tr>
                          <td>Previous Reading</td>
                          <td style="text-align: right;">${
                            item?.soaData?.previous_reading?.present_reading ||
                            ''
                          }</td>
                      </tr>
                      <tr>
                          <td>Consumption</td>
                          <td style="text-align: right;">${
                            item?.soaData?.consumption
                          }</td>
                      </tr>
                      <tr>
                          <td>Total Current Bill</td>
                          <td style="text-align: right;">${
                            item?.soaData?.amount
                          }</td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px solid #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="width: 60%;"><strong>Current Charges</strong></td>
                          <td style="width: 20%;text-align: right;"></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${
                            item?.soaData?.amount
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Basic Charge</td>
                          <td style="width: 20%;text-align: right;">₱${
                            item?.soaData?.basic_charge
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td>VAT</td>
                          <td style="width: 20%;text-align: right;">₱${
                            item?.soaData?.vat_amount
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      ${
                        item?.soaData?.discount > 0
                          ? `
                      <tr>
                          <td>Discount</td>
                          <td style="width: 20%;text-align: right;"> - ₱${item?.soaData?.discount}</td>
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
                            item?.soaData?.balance_from_prev_bill
                          }</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Arrears</td>
                          <td style="width: 20%;text-align: right;">₱${
                            item?.soaData?.balance_from_prev_bill
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>TOTAL AMOUNT DUE</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>${formattedTotal}</strong></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>PENALTY</strong></td>
                          <td style="width: 20%;text-align: right;">₱${
                            item?.soaData?.amount * 0.1
                          }</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;"><strong>TOTAL AMOUNT AFTER DUE DATE</strong></td>
                          <td></td>
                          <td style="width: 20%;text-align: right;"><strong>₱${(
                            parseFloat(item?.soaData?.total_amount) +
                            parseFloat(item?.soaData?.balance_from_prev_bill) +
                            parseFloat(item?.soaData?.amount) * 0.1
                          ).toFixed(2)}</strong></td>
                      </tr>
                  </table>
                  <div style="border-bottom: 1px dotted #E7EBF4;"></div>
                  <br>
                  <table width="100%" class="dot-table" cellpadding="1" >
                      <tr>
                          <td style="width: 60%;">Due Date</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            item?.soaData?.due_date,
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
                            item?.soaData?.disconnection_date,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Reference No</td>
                          <td style="width: 20%;text-align: right;">${item?.soaData?.meter_reading_id
                            ?.toString()
                            ?.padStart(8, '0')}</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Meter Reader</td>
                          <td style="width: 20%;text-align: right;">${
                            item?.soaData?.meter_reader
                          }</td>
                          <td style="width: 20%;text-align: right;"></td>
                      </tr>
                      <tr>
                          <td style="width: 60%;">Date/Time</td>
                          <td style="width: 20%;text-align: right;">${new Date(
                            item?.soaData?.reading_date,
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
  }, [item?.soaData]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={editReading}
      disabled={item.status !== 'queued'}>
      <View style={styles.infoContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.accountNumber}>
            {item?.details?.accountDetails?.account_number}
          </Text>
          <Text style={styles.accountName}>
            {item?.details?.accountDetails?.account_name}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          {icon[item.status]}
          <Text style={styles.subtext}>{title[item.status]}</Text>
        </View>
      </View>
      <View style={styles.queuedReading}>
        <View style={styles.readingDetails}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Previous Reading: </Text>
            <Text style={styles.value}>
              {item?.details?.readingDetails?.previous_reading ?? '0'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Present Reading: </Text>
            <Text style={styles.value}>
              {item?.details?.readingDetails?.present_reading}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Consumption: </Text>
            <Text style={styles.value}>
              {item?.details?.readingDetails?.consumption}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `data:image/gif;base64,${item?.details?.readingDetails?.attachment?.base64}`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      {(item.status === 'completed' || item.status === 'printed') && (
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            style={[commonstyles.button, commonstyles.bgPrimary]}
            onPress={printSOA}
            contentStyle={commonstyles.buttonContent}>
            Print SOA
          </Button>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    borderTopWidth: 1,
    borderColor: 'whitesmoke',
    marginTop: 5,
    paddingTop: 10,
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.primary,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.mediumGray,
  },
  readingDetails: {
    flex: 0.5,
  },
  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    elevation: 2,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    columnGap: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  queuedReading: {
    borderTopWidth: 1,
    borderColor: 'whitesmoke',
    marginTop: 5,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.mediumGray,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  accountName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.mediumGray,
  },
  accountNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.primary,
  },
  detailsContainer: {
    gap: 5,
  },
  container: {
    marginVertical: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 16,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
});

export default QueueItem;
