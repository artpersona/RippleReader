import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {colors} from '../common';

type Props = {
  item: any;
};

const width = Dimensions.get('window').width;

const imageSize = width * 0.25;

function TicketThread({item}: Props) {
  const [visible, setIsVisible] = useState(false);
  const [readMore, setReadMore] = useState(false);

  let statusColor = null;

  switch (item?.status?.toString()) {
    case '10':
      statusColor = {
        backgroundColor: '#c4cdd4',
        color: '#6c757d',
        text: 'Pending',
      };
      break;
    case '20':
      statusColor = {
        backgroundColor: colors.yellow,
        color: colors.white,
        text: 'Processing',
      };
      break;
    case '30':
      statusColor = {
        backgroundColor: '#b24723',
        color: colors.white,
        text: 'Rejected',
      };
      break;
    case '40':
      statusColor = {
        backgroundColor: '#4b864e',
        color: colors.white,
        text: 'Completed',
      };
      break;
    default:
      statusColor = {
        backgroundColor: '#c4cdd4',
        color: '#6c757d',
        text: 'Pending',
      };
  }
  console.log('item', item);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.controlText}>{item.control_no}</Text>
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: statusColor.backgroundColor},
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color: statusColor.color,
              },
            ]}>
            {statusColor.text}
          </Text>
        </View>
      </View>

      <View
        style={
          readMore
            ? [
                styles.detailsContainer,
                {
                  flexDirection: 'column',
                },
              ]
            : styles.detailsContainer
        }>
        <View
          style={
            readMore
              ? [
                  styles.issueTextContainer,
                  {
                    width: '100%',
                    marginBottom: 10,
                  },
                ]
              : styles.issueTextContainer
          }>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Reported Issue </Text>
            <Text style={styles.dateText}>
              {new Date(item.created_when).toLocaleDateString()}
            </Text>
          </View>
          <Text
            style={styles.value}
            onTextLayout={e => {
              setReadMore(e.nativeEvent.lines.length > 10);
            }}>
            {item.details_of_concern}
          </Text>
        </View>
        {item?.attachment && (
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={
              readMore
                ? [
                    styles.imageContainer,
                    {
                      width: '100%',
                      backgroundColor: colors.inputBackground,
                    },
                  ]
                : styles.imageContainer
            }>
            <Image
              source={{uri: item.attachment}}
              style={styles.image}
              resizeMode={readMore ? 'contain' : 'cover'}
            />
          </TouchableOpacity>
        )}
      </View>

      {item.findings && (
        <>
          <View style={styles.separator} />

          <View style={styles.separator} />
          <View style={styles.findingsContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Admin Findings </Text>

              <Text style={styles.dateText}>
                {new Date(item.findings_date).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.findings}</Text>
            </View>
          </View>
        </>
      )}
      {item.actions_taken && (
        <View style={styles.actionTakenHere}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Action taken</Text>
            <Text style={styles.dateText}>
              {new Date(item.findings_date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.value}>{item.actions_taken}</Text>
          </View>
        </View>
      )}

      <ImageView
        images={[
          {
            uri: item.attachment,
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
  actionTakenHere: {
    padding: 10,
  },
  valueContainer: {
    backgroundColor: colors.inputBackground,
    padding: 10,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: colors.greyBorder,
    marginVertical: 10,
  },

  labelRow: {
    marginBottom: 5,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: colors.mutedText,
  },

  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.black,
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: colors.mutedText,
  },
  issueTextContainer: {
    width: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  statusContainer: {
    minWidth: 100,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findingsContainer: {
    padding: 5,
    paddingHorizontal: 10,
  },
  controlText: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.mutedBlue,
  },
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.greyBorder,
  },
});

export default TicketThread;
