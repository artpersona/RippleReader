import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {CustomHeader, ListEmpty, TicketThread} from '../../../components';
import {colors} from '../../../common';
import {getAccountTickets} from '../../../services/maintenanceAPI';
import {Button} from 'react-native-paper';
import {NavigationRoutes} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
type Props = {
  route: any;
  navigation: any;
};

function CustomerCareLanding({route, navigation}: Props) {
  const [tickets, setTickets] = useState([]);
  const {id, account} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        getAccountTickets(id)
          .then((res: any) => {
            console.log('res is: ', res);
            setTickets(res);
          })
          .catch((error: any) => {
            console.log('error in getting accounts ticket: ', error);
            setTickets([]);
          });
      }
    }, [id]),
  );

  const renderItem = ({item}: any) => {
    return <TicketThread key={item.id} item={item} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        chevronColor={colors.header}
        titleStyle={{
          color: colors.header,
        }}
        title={'Customer Care'}
        showBackButton
      />

      <View style={styles.addNew}>
        <Button
          mode="contained"
          buttonColor={colors.primary}
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate(NavigationRoutes.CUSTOMER_CARE, {
              account,
              id,
            })
          }>
          Add New Ticket
        </Button>
      </View>
      <View style={styles.mainContent}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tickets}
          renderItem={renderItem}
          ListEmptyComponent={<ListEmpty message="No tickets found" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
  },
  addNew: {
    margin: 20,
    backgroundColor: colors.inputBackground,
  },
  mainContent: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});

export default CustomerCareLanding;
