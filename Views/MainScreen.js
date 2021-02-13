/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../Helpers/colors';
import dim from '../Helpers/heightWidth';
import SearchBar from '../Helpers/searchingBar';
import Listers from '../Helpers/listers';
import {Data} from '../SampleData';
import {connect} from 'react-redux';
import FancyBtn from '../Helpers/FancyBtn';
import {setCrntPdt} from '../Redux/actions';
import NavPointer from '../Navigation/NavPointer';

function MainScreen(props) {
  useEffect(() => {
    ct(Data.category[0]);
  }, []);
  const [categories, setCategories] = useState(Data.category);
  const [cc, setCC] = useState(Data.category[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const ct = (tab) => {
    setCC(tab);
    const fPrd = Data.product.filter((item) => item.caregoryid === tab.id);
    setTabProducts(fPrd);
  };

  const op = (item) => {
    props.setCrntPdt(item);
    NavPointer.Navigate('SinglePrd');
  };

  const search = () => NavPointer.Navigate('Search');

  return (
    <HigherOrderScreen style={{backgroundColor: colors.lightBackground}}>
      <ScrollView bounces={false}>
        <View style={styles.contain}>
          <TouchableOpacity style={{width: '80%'}} onPress={search}>
            <SearchBar editable={false} />
          </TouchableOpacity>
          <FancyBtn
            IconLibrary={EvilIcons}
            icon="search"
            iconSize={dim.width * 0.07}
            onPress={search}
          />
        </View>
        <Text
          style={{
            marginLeft: dim.width * 0.04,
            marginVertical: dim.height * 0.01,
            fontSize: dim.width * 0.06,
            fontWeight: 'bold',
          }}>
          Products
        </Text>
        <View style={{}}>
          <Listers
            data={categories}
            renderItem={({item}) => <Tabs item={item} cc={cc} ct={ct} />}
          />
        </View>
        <Text
          style={{
            marginLeft: dim.width * 0.04,
            marginTop: dim.height * 0.03,
            fontSize: dim.width * 0.057,
            fontWeight: 'bold',
            color: colors.darkGray,
          }}>
          {cc.category}
        </Text>
        <View>
          {tabProducts.length > 0 && (
            <Listers
              data={tabProducts}
              renderItem={({item}) => <HorizontalList item={item} op={op} />}
            />
          )}
        </View>
        {props.favs.length > 0 && (
          <>
            <Text
              style={{
                marginLeft: dim.width * 0.04,
                fontSize: dim.width * 0.057,
                fontWeight: 'bold',
                color: colors.primary,
              }}>
              Your Favourites
            </Text>
            <View>
              <Listers
                data={props.favs}
                renderItem={({item}) => <HorizontalList item={item} op={op} />}
              />
            </View>
          </>
        )}
      </ScrollView>
    </HigherOrderScreen>
  );
}

const Tabs = ({item, cc, ct}) => {
  return (
    <TouchableOpacity
      onPress={() => ct(item)}
      style={{
        width: dim.width * 0.23,
        height: dim.height * 0.17,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: dim.width * 0.006,
        marginLeft: dim.width * 0.04,
        marginRight: dim.width * 0.02,
        backgroundColor:
          item.category === cc.category ? colors.primary : colors.secondary,
      }}>
      <ImageBackground
        source={item.category === cc.category ? item.iconwhite : item.iconBrown}
        style={{
          width: dim.width * 0.13,
          height: dim.height * 0.07,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          marginTop: dim.height * 0.007,
          fontSize: dim.width * 0.04,
          fontWeight: 'bold',
          width: '80%',
          textAlign: 'center',
          color: item.category === cc.category ? colors.secondary : 'black',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

export const HorizontalList = ({item, op}) => {
  return (
    <TouchableOpacity
      onPress={() => op(item)}
      style={{
        margin: 20,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        width: dim.width * 0.56,
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: colors.secondary,
          paddingHorizontal: dim.width * 0.06,
          width: '100%',
          paddingTop: dim.height * 0.07,
          marginTop: -dim.height * 0.065,
          paddingBottom: dim.height * 0.04,
          borderRadius: 30,
        }}>
        <View>
          <Text
            style={{
              fontSize: dim.width * 0.044,
              color: colors.primary,
              fontWeight: 'bold',
              width: '100%',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: dim.width * 0.042,
              color: colors.darkGray,
              width: '100%',
            }}>
            {item.subText}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: dim.width * 0.055,
              fontWeight: 'bold',
            }}>
            ${item.price}
          </Text>
        </View>
      </View>
      <ImageBackground
        source={item.images}
        style={{
          width: dim.width * 0.46,
          height: dim.height * 0.22,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    favs: state.toggleFav,
  };
};

export default connect(mapStateToProps, {setCrntPdt})(MainScreen);

const styles = StyleSheet.create({
  contain: {
    paddingHorizontal: dim.width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: dim.height * 0.025,
    paddingTop: dim.height * 0.035,
  },
  sb1: {
    zIndex: 5,
    position: 'absolute',
    height: '50%',
    width: '100%',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    elevation: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: dim.height * 0.015,
    paddingLeft: dim.width * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  searchbtnOuterwrap: {
    width: dim.width * 0.13,
    height: (dim.height * 0.125) / 2,
    overflow: 'hidden',
  },
  searchBtnWrap: {
    width: '100%',
    height: dim.height * 0.125,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 50,
    position: 'absolute',
    overflow: 'hidden',
  },
});
