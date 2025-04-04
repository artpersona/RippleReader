/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CustomHeader} from '../../../components';
import {colors} from '../../../common';
import MeterReadingHero from '../../../assets/svg/meter_reading.svg';
import {height} from '../../../common';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import commonstyles from '../../../styles/commonstyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-toast-message';
import {moderateScale} from 'react-native-size-matters';
import useDownloadStore from '../../../stores/download.store';
import {NavigationRoutes} from '../../../utils';
import ReadingConfirmatoryModal from '../../../components/ReadingConfirmatoryModal';

type Props = {
  navigation: any;
  route: any;
};

function MeterReadingOffline({navigation, route}: Props) {
  const {account, offlineReading} = route.params;
  const {modifyReadingAction} = useDownloadStore() as any;
  const [hasNewImage, setHasNewImage] = useState(false);
  const [image, setImage] = React.useState('');
  const [imageData, setImageData] = React.useState('' as any);
  const [visible, setIsVisible] = React.useState(false);
  const [meterReading, setMeterReading] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (offlineReading) {
      setImageData(offlineReading.attachment);
      setImage(offlineReading.attachment.base64);
      setMeterReading(
        offlineReading.present_reading.toString().padStart(8, '0'),
      );
    }
  }, [offlineReading]);

  const submitValidator = () => {
    if (!meterReading) {
      Alert.alert('Please enter a meter reading');
      return;
    }

    if (parseInt(meterReading, 10) < parseInt(account.last_reading, 10)) {
      Alert.alert('Meter reading cannot be less than the previous reading');
      return;
    }

    if (!image) {
      Alert.alert('Please take a photo of the meter reading');
      return;
    }

    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!meterReading) {
      Alert.alert('Please enter a meter reading');
      return;
    }

    if (parseInt(meterReading, 10) < 1) {
      Alert.alert('Meter reading cannot be zero');
      return;
    }

    if (parseInt(meterReading, 10) < parseInt(account.last_reading, 10)) {
      Alert.alert('Meter reading cannot be less than the previous reading');
      return;
    }

    if (!image) {
      Alert.alert('Please take a photo of the meter reading');
      return;
    }
    const formattedImage = {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
      base64: imageData.base64,
    };

    // convert image to base64

    const params: {[key: string]: any} = {
      account_id: account.account_id,
      project_id: account.project_id,
      cluster_id: account.cluster_id,
      meter_id: account.meter_id,
      user_id: 1,
      reading_datetime: new Date().toISOString(),
      present_reading: parseInt(meterReading, 10),
      consumption:
        parseInt(meterReading, 10) - parseInt(account.last_reading, 10),
      status: 20,
      attachment: formattedImage,
      previous_reading_id: account.last_reading_id,
      previous_reading: parseInt(account.last_reading, 10),
    };

    console.log('params is: ', params);

    const formData = new FormData();
    for (const key in params) {
      if (key === 'attachment') {
        formData.append(key, {
          uri: params[key].uri,
          type: params[key].type,
          name: params[key].name,
        });
      } else {
        formData.append(key, params[key]);
      }
    }

    if (
      parseInt(meterReading, 10) - parseInt(account.last_reading, 10) >
      1000
    ) {
      Alert.alert(
        'High Consumption',
        'Your consumption is higher than the average, are you sure you want to proceed?',
        [
          {
            text: 'Yes',
            onPress: () => {
              submitHelper(formData, params);
            },
          },
          {
            text: 'No',
            onPress: () => {
              setLoading(false);
              return;
            },
          },
        ],
      );
    } else {
      submitHelper(formData, params);
    }
  };

  const submitHelper = (formData: any, params: any) => {
    const details = {
      accountDetails: account,
      readingDetails: params,
    };
    modifyReadingAction(formData, details);
    Toast.show({
      type: 'success',
      text1: 'Queued action updated',
    });
    navigation.navigate(NavigationRoutes.TASKQUEUE);
  };

  const handleCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 1,
      },
      (response: any) => {
        if (response.didCancel) {
          return;
        }
        setImage(response.assets[0].uri);
        setImageData(response.assets[0]);
        setHasNewImage(true);
      },
    );

    // launchImageLibrary(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: true,
    //     maxHeight: 500,
    //     maxWidth: 500,
    //   },
    //   (response: any) => {
    //     if (response.didCancel) {
    //       return;
    //     }
    //     setImage(response.assets[0].uri);
    //     setImageData(response.assets[0]);
    //     setHasNewImage(true);
    //   },
    // );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title={'Update   Reading'}
        showBackButton
      />
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={{
          paddingBottom: height * 0.25,
        }}
        showsVerticalScrollIndicator={false}>
        <MeterReadingHero width={'80%'} style={styles.hero} />
        <View style={styles.meterInput}>
          <Text style={styles.mainLabel}>Water Meter Consumption</Text>
          <TextInput
            style={styles.input}
            placeholder="00000000"
            keyboardType="numeric"
            value={meterReading}
            returnKeyType="done"
            onChangeText={text => {
              if (text.length < meterReading.length) {
                setMeterReading(text.padStart(8, '0'));
                return;
              }
              if (text[0] !== '0' && text.length > 8) {
                return;
              }
              const numericText = text.replace(/[^0-9]/g, '');
              let paddedText = numericText.padStart(8, '0');
              paddedText = paddedText.slice(-8);
              setMeterReading(paddedText);
            }}
          />
        </View>
        <Text style={styles.usageText}>Usage - Account Details</Text>
        <View style={styles.usageContainer}>
          <View style={styles.row}>
            <View style={styles.details}>
              <Text style={styles.detailsLabel}>Account Number</Text>
              <Text style={styles.detailsValue}>{account.account_number}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.detailsLabel}>Account Name</Text>
              <Text style={styles.detailsValue}>{account.account_name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.details}>
              <Text style={styles.detailsLabel}>Address</Text>
              <Text style={styles.detailsValue}>{account.address}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.detailsLabel}>Previous Reading</Text>
              <Text style={styles.detailsValue}>{account.last_reading}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.details}>
              <Text style={styles.detailsLabel}>Previous Reading Date</Text>
              <Text style={styles.detailsValue}>
                {account.last_reading_date
                  ? account.last_reading_date
                  : 'No initial reading yet'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        {image ? (
          <View style={styles.photoPreview}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image
                source={{
                  uri: hasNewImage ? image : `data:image/gif;base64,${image}`,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.photoDetails}>
              <Text style={styles.label}>Photo has been selected</Text>
              <View style={styles.extraDetails}>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                  <Text style={styles.actionText}>View Full Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setImage('')}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <Button
            mode="contained"
            onPress={handleCamera}
            icon={() => (
              <MaterialIcon name="add-a-photo" size={20} color="white" />
            )}
            style={[commonstyles.button, commonstyles.bgPrimary]}
            contentStyle={commonstyles.buttonContent}>
            Take a photo
          </Button>
        )}

        <Button
          mode="contained"
          style={[commonstyles.button, commonstyles.bgPrimary]}
          onPress={submitValidator}
          loading={loading}
          contentStyle={commonstyles.buttonContent}>
          Update Reading
        </Button>
      </View>

      <ImageView
        images={[
          {
            uri: hasNewImage ? image : `data:image/gif;base64,${image}`,
          },
        ]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <ReadingConfirmatoryModal
        isVisible={modalVisible}
        onSubmit={handleSubmit}
        onCancel={() => setModalVisible(false)}
        data={{
          previousReading: parseInt(account.last_reading, 10),
          currentReading: parseInt(meterReading, 10),
          totalConsumption:
            parseInt(meterReading, 10) - parseInt(account.last_reading, 10),
        }}
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
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: colors.homeComponent,
  },
  extraDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  photoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {width: 50, height: 50, borderRadius: 5, marginRight: 10},
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    marginVertical: 5,
    flex: 1,
  },
  detailsValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(12),
    color: colors.homeComponent,
    marginTop: 3,
  },
  detailsLabel: {
    fontFamily: 'Poppins-Light',
    fontSize: moderateScale(10),
    color: colors.homeComponent,
  },
  usageContainer: {
    marginTop: 10,
    backgroundColor: '#EBF6FF',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  usageText: {
    fontFamily: 'Poppins-Light',
    fontSize: moderateScale(12),
    color: colors.homeComponent,
  },
  input: {
    height: 150,
    borderColor: '#EAF5FD',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    shadowColor: '#EAF5FD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    textAlign: 'center',
    elevation: 3,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(17),
    color: colors.homeComponent,
    textAlignVertical: 'center',
  },
  mainLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: colors.homeComponent,
  },
  meterInput: {
    marginTop: height * 0.03,
    marginBottom: 20,
  },
  hero: {
    transform: [{scale: 1.15}],
    alignSelf: 'center',
  },
  mainContent: {
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MeterReadingOffline;
