import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import commonstyles from '../styles/commonstyles';

import Modal from 'react-native-modal';
type Props = {
  data: any;
  isVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

function ReadingConfirmatoryModal({
  data,
  isVisible,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>Submission Confirmation</Text>
          </View>
          <View style={{}}>
            <Text style={styles.subText}>
              Are you sure you want to submit the following readings?
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>Previous Reading</Text>
              <Text style={styles.label}>{data.previousReading}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Current Reading</Text>
              <Text style={styles.label}>{data.currentReading}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.totalText}>Total Consumption</Text>
              <Text style={styles.totalText}>{data.totalConsumption}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={onSubmit}
              style={[commonstyles.button, commonstyles.bgPrimary]}
              contentStyle={commonstyles.buttonContent}
              labelStyle={[commonstyles.buttonLabel, commonstyles.colorWhite]}>
              Confirm
            </Button>

            <Button
              mode="contained"
              onPress={onCancel}
              style={[commonstyles.button, commonstyles.bgError]}
              contentStyle={commonstyles.buttonContent}
              labelStyle={[commonstyles.buttonLabel, commonstyles.colorWhite]}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ReadingConfirmatoryModal;
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', padding: 15, borderRadius: 10},
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10,
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'red',
  },
  subText: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {fontFamily: 'Poppins-Regular'},
  totalText: {fontFamily: 'Poppins-Bold'},

  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
});
