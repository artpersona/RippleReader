import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Nabua from '../assets/svg/nabua_logo.svg';
import {colors, height} from '../common';
import {moderateScale} from 'react-native-size-matters';
import dayjs from 'dayjs';

type Props = {
  soaData: any;
};

function SOACard({soaData}: Props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Nabua width={50} height={50} />
        <View>
          <Text style={styles.projectName}>{soaData?.project_name}</Text>
          <Text style={styles.eSoaText}>Electronic Statement of Account</Text>
          <Text style={styles.locationText}>{soaData?.project_location}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.paymentContainer}>
          <Text style={styles.totalAmountText}>Statement of Account</Text>
          <Text style={styles.amountText}>
            For the month of{' '}
            {new Date(soaData?.date_generated_raw).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
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
            <Text style={styles.compTitle}>{soaData?.building_type_name}</Text>
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
            <Text style={[styles.compTitle, styles.bold]}>Current Charges</Text>
            <Text style={[styles.compTitle, styles.bold]}>
              {parseFloat(soaData?.basic_charge) +
                parseFloat(soaData?.vat_amount)}
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
              <Text style={styles.compTitle}>Discount</Text>
              <Text style={[styles.compTitle, styles.red]}>
                {soaData?.discount}
              </Text>
            </View>
          )}

          <View style={styles.computationRow}>
            <Text style={[styles.compTitle, styles.bold]}>Other Charges</Text>
            <Text style={[styles.compTitle, styles.bold]}>N/A</Text>
          </View>

          <View style={styles.computationRow}>
            <Text style={styles.compTitle}>Application / Reconnection Fee</Text>
            <Text style={styles.compTitle}>N/A</Text>
          </View>

          <View style={styles.computationRow}>
            <Text style={styles.compTitle}>Promissory Note Amount</Text>
            <Text style={styles.compTitle}>N/A</Text>
          </View>

          <View style={styles.computationRow}>
            <Text style={styles.compTitle}>Labor / Materials and Others</Text>
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
            <Text style={styles.compTitle}>{soaData?.disconnection_date}</Text>
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
            Pay your water bill by the due date to avoid penalties. Service may
            be disconnected if there are arrears before the stated disconnection
            date. For bill inquiries, visit our office or call our hotlines by
            the 10th of the month. You can also message us at
            facebook.com/tubignabuainc.
          </Text>
        </View>
      </View>
    </View>
  );
}

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

export default SOACard;
