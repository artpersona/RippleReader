import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../common';
import {CustomHeader} from '../../../components';
import {getAccountDetailsAPI} from '../../../services/meterReadingAPI';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationRoutes} from '../../../utils';
type Props = {
  navigation: any;
  route: any;
};

function AccountLanding({navigation, route}: Props) {
  const {isCompleted, accountNumber, id} = route.params;
  const [account, setAccount] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const navigateToReadingScreen = () => {
    navigation.navigate(NavigationRoutes.METER_READING, {
      account,
      id,
    });
  };

  const navigateToSOAScreen = () => {
    navigation.navigate(NavigationRoutes.SOA, {
      account,
      id,
    });
  };

  const navigateToCCF = () => {
    navigation.navigate(NavigationRoutes.CUSTOMER_CARE, {
      account,
      id,
    });
  };

  useEffect(() => {
    if (id) {
      getAccountDetailsAPI(id)
        .then((res: any) => {
          console.log('res', res);
          setAccount(res);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          setLoading(false);
        });
    }
  }, [id]);
  return (
    <View style={styles.container}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title={accountNumber}
        showBackButton
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {!loading && (
        <View style={styles.mainContainer}>
          <Text style={styles.previousText}>
            Prevous Reading: {account.last_reading}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={[styles.row, styles.border]}>
              <Text style={styles.label}>Name: </Text>
              <Text style={styles.value}>{account.account_name}</Text>
            </View>

            <View style={[styles.row, styles.border]}>
              <Text style={styles.label}>Address: </Text>
              <Text style={styles.value}>{account.address}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Last Reading: </Text>
              <Text style={styles.value}>
                {account.last_reading_date
                  ? account.last_reading_date
                  : 'No reading records yet'}
              </Text>
            </View>
          </View>

          <View style={styles.otherTools}>
            <Text style={styles.otherText}>Other tools:</Text>
            {isCompleted ? (
              <TouchableOpacity
                style={styles.clickable}
                disabled={!isCompleted}
                onPress={navigateToSOAScreen}>
                <Octicons name="log" size={25} color={colors.blueBarWick} />
                <Text style={styles.clickabletext}>Statement of Account</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.clickable}
                disabled={isCompleted}
                onPress={navigateToReadingScreen}>
                <Octicons name="meter" size={25} color={colors.blueBarWick} />
                <Text style={styles.clickabletext}>Meter Reading</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.clickable} onPress={navigateToCCF}>
              <AntDesign name="swap" size={25} color={colors.blueBarWick} />
              <Text style={styles.clickabletext}>Meter Actions</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  otherTools: {
    marginTop: 20,
  },
  clickabletext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 10,
    color: colors.homeComponent,
  },
  clickable: {
    marginVertical: 8,
    backgroundColor: colors.filter,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
  },
  otherText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A5C5DC',
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: colors.homeComponent,
  },
  row: {
    paddingVertical: 5,
  },
  previousText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: colors.historyLabel,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.historyLabel,
  },
  label: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: colors.historyLabel,
    textTransform: 'uppercase',
  },

  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    borderColor: colors.homeComponent,
    marginVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AccountLanding;
