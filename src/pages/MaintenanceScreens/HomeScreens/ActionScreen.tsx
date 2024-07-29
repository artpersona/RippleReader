import React from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {ControlledInput, CustomHeader} from '../../../components';
import commonstyles from '../../../styles/commonstyles';
import {colors} from '../../../common';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {addActionAPI} from '../../../services/maintenanceAPI';
import Toast from 'react-native-toast-message';
import {moderateScale} from 'react-native-size-matters';
import {useUserStore} from '../../../stores';

type Props = {
  route: any;
  navigation: any;
};

function ActionScreen({route, navigation}: Props) {
  const {account} = route.params;
  const {user} = useUserStore() as any;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [loading, setLoading] = React.useState(false);
  console.log('user is: ', user);
  const onSubmit = (data: any) => {
    const params = {
      id: account.id,
      actions_taken: data.actions_taken,
      actions_taken_user_id: user.userId,
    };
    setLoading(true);

    addActionAPI(params)
      .then(() => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          bottomOffset: 50,
          text1: 'Success',
          text2: 'Ticket has been created',
        });
        navigation.goBack();
      })
      .catch((err: any) => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: 50,
          text1: 'Action Failed',
          text2: 'An error occured while updating the ticket',
        });
        console.log(err);
      })
      .finally(() => setLoading(false));
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

      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.usageContainer}>
          <View style={styles.row}>
            <View>
              <Text style={styles.detailsLabel}>Control Number</Text>
              <Text style={styles.detailsValue}>{account.control_no}</Text>
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

        <Text style={styles.title}>Details of Concern</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.infoText}>{account.details_of_concern}</Text>
        </View>
        {account.findings && account.findings !== '' && (
          <View style={styles.findingsContainer}>
            <Text style={styles.title}>Findings</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.infoText}>{account.findings}</Text>
            </View>
          </View>
        )}

        <View style={styles.mt10}>
          <Text style={styles.title}>Action Taken</Text>

          <ControlledInput
            placeholder="How did you resolve the issue?"
            mode="outlined"
            style={[commonstyles.inputContainer, styles.bgWhite]}
            name="actions_taken"
            control={control}
            outlineColor={
              errors['actions_taken'] ? colors.danger : colors.inputBorder
            }
            activeOutlineColor={
              errors['actions_taken'] ? colors.danger : colors.tertiary
            }
            numberOfLines={3}
            multiline
            rules={{
              required: 'Description is required',
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          style={[commonstyles.button, commonstyles.bgPrimary]}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          contentStyle={commonstyles.buttonContent}>
          Submit Action
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
  findingsContainer: {
    marginTop: 10,
  },
  mt10: {
    marginTop: 10,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: colors.homeComponent,
  },
  detailsContainer: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 5,
  },
  detailsValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: colors.homeComponent,
    marginTop: 3,
  },
  detailsLabel: {
    fontFamily: 'Poppins-Light',
    fontSize: moderateScale(12),
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
    fontSize: moderateScale(16),
  },

  label: {
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    fontSize: moderateScale(12),
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

export default ActionScreen;
