import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {CustomHeader} from '../../components';
import Wave from '../../assets/svg/wave.svg';
import colors from '../../common/colors';
import {Button} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import commonstyles from '../../styles/commonstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useUserStore} from '../../stores';
import {ControlledInput} from '../../components';

type Props = {};

function ProfileLanding({}: Props) {
  const {user} = useUserStore() as any;

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      ...user,
    },
  });

  console.log('email is: ', user);

  return (
    <View style={styles.container}>
      <CustomHeader
        showBackButton={false}
        chevronColor="white"
        isTransparent={true}
      />
      <View style={styles.bannerHeader}>
        <Wave width={'100%'} height={'80%'} preserveAspectRatio={'none'} />
      </View>
      <View style={styles.profilePicture}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}>{user?.name}</Text>

      <KeyboardAwareScrollView
        style={styles.scrollView}
        viewIsInsideTabBar={true}>
        <View style={styles.newContainer}>
          <ControlledInput
            label="Name"
            mode="outlined"
            style={commonstyles.inputContainer}
            name="name"
            control={control}
            error={errors?.name}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.tertiary}
            editable={false}
          />
          <ControlledInput
            label="Email"
            mode="outlined"
            style={commonstyles.inputContainer}
            name="email"
            control={control}
            error={errors?.address}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.tertiary}
            editable={false}
          />

          <ControlledInput
            label="Contact"
            mode="outlined"
            style={commonstyles.inputContainer}
            name="mobile"
            control={control}
            error={errors?.contact}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.tertiary}
            editable={false}
          />
        </View>
      </KeyboardAwareScrollView>

      {isDirty && (
        <View style={styles.floatingBottomContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit(data => console.log('data is: ', data))}
            style={[commonstyles.button, commonstyles.bgPrimary]}
            contentStyle={commonstyles.buttonContent}>
            Update
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newContainer: {
    flex: 1,
    marginTop: 5,
  },
  floatingBottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.white,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  activeTabText: {
    color: colors.tertiary,
    fontFamily: 'Poppins-SemiBold',
  },
  activeTab: {
    backgroundColor: colors.segmentedActive,
    borderRadius: 30,
  },
  tabText: {
    color: colors.segmentedText,
    fontFamily: 'Poppins-Regular',
  },
  tab: {
    backgroundColor: colors.segmentedInactive,
    borderColor: colors.segmentedInactive,
  },
  tabsContainer: {
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: colors.segmentedInactive,
    borderRadius: 30,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: colors.white,
    paddingBottom: 50,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: '120%',
    height: '120%',
    padding: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bannerHeader: {
    height: 182,
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
});

export default ProfileLanding;
