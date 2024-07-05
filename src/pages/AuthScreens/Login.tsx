import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomHeader} from '../../components';
import {FieldErrors, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {ControlledInput} from '../../components';
import commonstyles from '../../styles/commonstyles';
import {colors, height} from '../../common';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {useUserStore} from '../../stores';
import {loginAPI} from '../../services/authApi';
import JWT from 'expo-jwt';

type Props = {};

function Login({}: Props) {
  const {setUser} = useUserStore() as any;
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleLogin = async (data: any) => {
    setLoading(true);
    await loginAPI(data)
      .then((response: any) => {
        const {user} = JWT.decode(response.token, 'GTI_KEY');
        if (user.roleId === '101' || user.roleId === '102') {
          setUser(user);
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            bottomOffset: 50,
            text1: 'You are not authorized to access this application',
          });
        }
      })
      .catch((err: any) => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: 50,
          text1: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmissionError = (error: FieldErrors) => {
    let convertedErrors = Object.entries(error);
    const errorMessage = convertedErrors[0][1]?.message;
    console.log(errorMessage);

    if (errorMessage !== '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        bottomOffset: 50,
        text1: errorMessage as string,
      });
      return;
    }
  };

  return (
    <>
      <CustomHeader showBackButton={true} />
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Login with your Tubig Pilipinas account!
        </Text>

        <View style={styles.form}>
          <ControlledInput
            // label="Email"
            placeholder="Enter your email address"
            mode="outlined"
            style={commonstyles.inputContainer}
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            }}
            error={errors?.email}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.tertiary}
          />
          <ControlledInput
            placeholder="Enter your password"
            mode="outlined"
            style={commonstyles.inputContainer}
            secureTextEntry={!showPasswordText}
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
            }}
            error={errors?.password}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.tertiary}
            right={
              <TextInput.Icon
                icon={showPasswordText ? 'eye-outline' : 'eye-off-outline'}
                color={colors.tertiary}
                onPress={() => setShowPasswordText(prev => !prev)}
              />
            }
          />
        </View>

        <View style={styles.footerContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit(handleLogin, handleSubmissionError)}
            style={[commonstyles.button, commonstyles.bgPrimary]}
            contentStyle={commonstyles.buttonContent}
            labelStyle={[commonstyles.buttonLabel, commonstyles.colorWhite]}
            loading={loading}>
            Log In
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  rememberText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 10,
    color: colors.mediumGray,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  form: {
    marginTop: height * 0.05,
    rowGap: 10,
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    color: colors.loginHeader,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: height * 0.05,
  },
});

export default Login;
