import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../../../common';
import {CustomHeader} from '../../../components';
import {getAccountDetailsAPI} from '../../../services/meterReadingAPI';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationRoutes} from '../../../utils';
import ImageView from 'react-native-image-viewing';
import {moderateScale} from 'react-native-size-matters';
import {useUserStore} from '../../../stores';
type Props = {
  navigation: any;
  route: any;
};

function AccountLanding({navigation, route}: Props) {
  const {isCompleted, accountNumber, id, offlineData} = route.params;
  const {isConnected} = useUserStore() as any;
  const [account, setAccount] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [visible, setIsVisible] = React.useState(false);

  const navigateToReadingScreen = () => {
    navigation.navigate(NavigationRoutes.METER_READING, {
      account,
      id,
    });
  };

  const navigateToSOAScreen = () => {
    navigation.navigate(NavigationRoutes.SOA, {
      soa_id: account.soa_id,
    });
  };

  const navigateToCCF = () => {
    navigation.navigate(NavigationRoutes.CUSTOMER_CARE_LANDING, {
      id,
      account,
    });
  };

  useEffect(() => {
    if (isConnected) {
      if (id) {
        getAccountDetailsAPI(id)
          .then((res: any) => {
            console.log('res is: ', res);
            setAccount(res);
            setLoading(false);
          })
          .catch((error: any) => {
            console.log('error', error);
            setLoading(false);
          });
      }
    } else {
      setAccount(offlineData);
      setLoading(false);
    }
  }, [id, isConnected, offlineData]);
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
            Prevous Reading: {account?.last_reading ?? 'No reading records yet'}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={[styles.row, styles.border]}>
              <Text style={styles.label}>Name: </Text>
              <Text style={styles.value}>{account?.account_name}</Text>
            </View>

            <View style={[styles.row, styles.border]}>
              <Text style={styles.label}>Address: </Text>
              <Text style={styles.value}>{account?.address}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Last Reading: </Text>
              <Text style={styles.value}>
                {account?.last_reading_date
                  ? account.last_reading_date
                  : 'No reading records yet'}
              </Text>
            </View>
            {account?.last_reading_attachment && (
              <View style={styles.photoPreview}>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                  <Image
                    source={{uri: account?.last_reading_attachment}}
                    style={styles.image}
                  />
                </TouchableOpacity>
                <View style={styles.photoDetails}>
                  <Text style={styles.label}>Meter reading attachment</Text>
                  <View style={styles.extraDetails}>
                    <TouchableOpacity onPress={() => setIsVisible(true)}>
                      <Text style={styles.actionText}>View Full Image</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
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

            {isConnected && (
              <TouchableOpacity
                style={styles.clickable}
                onPress={navigateToCCF}>
                <AntDesign name="swap" size={25} color={colors.blueBarWick} />
                <Text style={styles.clickabletext}>Customer Care</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <ImageView
        images={[
          {
            uri: account?.last_reading_attachment,
          },
        ]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  photoDetails: {
    width: '80%',
  },
  actionText: {
    fontFamily: 'Poppins-LightItalic',
    fontSize: moderateScale(12),
    color: colors.homeComponent,
    textDecorationLine: 'underline',
  },
  extraDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  photoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {width: 50, height: 50, borderRadius: 5, marginRight: 10},
  otherTools: {
    marginTop: 20,
  },
  clickabletext: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(12),
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
    fontSize: moderateScale(11),
    color: colors.historyLabel,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: colors.historyLabel,
  },
  label: {
    fontFamily: 'Poppins-Light',
    fontSize: moderateScale(12),
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
