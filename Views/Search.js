/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../Helpers/searchingBar';
import {Data} from '../SampleData';
import colors from '../Helpers/colors';
import dim from '../Helpers/heightWidth';
import NavPointer from '../Navigation/NavPointer';
import {HorizontalList} from './MainScreen';
import {connect} from 'react-redux';
import {setCrntPdt} from '../Redux/actions';
import UseHeader from '../Helpers/UseHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold'}}>No Search Found...</Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const op = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };
  const CardRender = (Arr) => {
    return Arr.map((item) => (
      <View
        key={item.id}
        style={{
          width: dim.width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <HorizontalList item={item} op={op} />
      </View>
    ));
  };

  const goBack = () => NavPointer.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <HigherOrderScreen style={{backgroundColor: colors.lightGrey4}}>
      <UseHeader
        leftIcon={AntDesign}
        Title="SEARCH"
        leftIconName="arrowleft"
        leftIconAction={goBack}
      />
      <View style={styles.SearchBarWrapper}>
        <View style={{width: '85%'}}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.TilesWrapper}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </HigherOrderScreen>
  );
}

export default connect(null, {setCrntPdt})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: dim.width * 0.03,
    paddingVertical: dim.height * 0.018,
  },
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: dim.height * 0.003,
  },
  container: {flex: 1},
});
