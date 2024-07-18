import React, {useEffect} from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  ControlledDropdown,
  ControlledInput,
  CustomHeader,
} from '../../../components';
import commonstyles from '../../../styles/commonstyles';
import {colors} from '../../../common';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {createTicket} from '../../../services/maintenanceAPI';
import Toast from 'react-native-toast-message';
import useMaintenanceStore from '../../../stores/maintenance.store';
type Props = {
  route: any;
  navigation: any;
};

function CustomerCare({route, navigation}: Props) {
  const {ccfTypes} = useMaintenanceStore() as any;
  const {account} = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [image, setImage] = React.useState('');
  const [imageData, setImageData] = React.useState('' as any);

  const [visible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [typesOfConcern, setTypesOfConcern] = React.useState([]);

  useEffect(() => {
    if (ccfTypes) {
      console.log('ccfTypes', ccfTypes);
      setTypesOfConcern(
        ccfTypes.map((item: any) => ({
          label: item.name,
          value: item.id,
        })),
      );
    }
  }, [ccfTypes]);

  const handleCamera = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
      },
      (response: any) => {
        if (response.didCancel) {
          return;
        }
        setImage(response.assets[0].uri);
        setImageData(response.assets[0]);
      },
    );
  };

  const onSubmit = (data: any) => {
    if (!image) {
      Alert.alert('Please take a photo of the issue');
      return;
    }

    const formattedImage = {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    };

    const params: {[key: string]: any} = {
      type: data.concern,
      account_id: account.id,
      details_of_concern: data.details_of_concern,
      attachment: formattedImage,
    };

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

    setLoading(true);
    createTicket(formData)
      .then((res: any) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          bottomOffset: 50,
          text1: 'Success',
          text2: 'Ticket has been created',
        });
        console.log('res', res);
        setLoading(false);
        navigation.goBack();
      })
      .catch((err: any) => {
        console.log('err is: ', err);
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: 50,
          text1: err.response.data.message || 'Error',
          text2: 'An error occurred',
        });
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title={'Meter Actions'}
        showBackButton
      />

      <View style={styles.mainContent}>
        <View style={styles.usageContainer}>
          <View style={styles.row}>
            <View>
              <Text style={styles.detailsLabel}>Account Number</Text>
              <Text style={styles.detailsValue}>{account.account_number}</Text>
            </View>

            <View>
              <Text style={styles.detailsLabel}>Account Name</Text>
              <Text style={styles.detailsValue}>{account.account_name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.detailsLabel}>Address</Text>
              <Text style={styles.detailsValue}>{account.address}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Type of Concern</Text>
        <ControlledDropdown
          control={control}
          errors={errors}
          name="concern"
          rules={{
            required: 'Type of concern is required',
          }}
          data={typesOfConcern}
        />

        <ControlledInput
          placeholder="Describe your concern here..."
          mode="outlined"
          style={[commonstyles.inputContainer, styles.bgWhite]}
          name="details_of_concern"
          control={control}
          outlineColor={
            errors['details_of_concern'] ? colors.danger : colors.inputBorder
          }
          activeOutlineColor={
            errors['details_of_concern'] ? colors.danger : colors.tertiary
          }
          numberOfLines={3}
          multiline
          rules={{
            required: 'Description is required',
          }}
        />
      </View>

      <View style={styles.bottomContainer}>
        {image ? (
          <View style={styles.photoPreview}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image source={{uri: image}} style={styles.image} />
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
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          contentStyle={commonstyles.buttonContent}>
          Submit Request
        </Button>
      </View>

      <ImageView
        images={[
          {
            uri: image,
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
  detailsValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.homeComponent,
    marginTop: 3,
  },
  detailsLabel: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: colors.homeComponent,
  },
  usageContainer: {
    marginBottom: 10,
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
  photoDetails: {
    width: '80%',
  },
  actionText: {
    fontFamily: 'Poppins-LightItalic',
    fontSize: 12,
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
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    fontSize: 16,
  },

  label: {
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    fontSize: 12,
  },

  accountDetails: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: colors.inputBorder,
  },
  mainContent: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bgWhite: {
    backgroundColor: colors.white,
    marginTop: 10,
    minHeight: 200,
  },
  title: {
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default CustomerCare;
