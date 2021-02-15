/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import HigherOrderScreen from '../Helpers/HigherOrderScreen';
import colors from '../Helpers/colors';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dim from '../Helpers/heightWidth';
import {connect} from 'react-redux';
import NavPointer from '../Navigation/NavPointer';
import {setFavAction, removeFavAction} from '../Redux/actions';
import c from '../Assets/frosted27.png';
import Feather from 'react-native-vector-icons/Feather';
import UseHeader from '../Helpers/UseHeader';
import {Badge} from 'react-native-elements';

function SinglePrd(props) {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const pdt = props.pdt;

  const checkIfFav = () => {
    for (let i = 0; i < props.favs.length; i++) {
      if (props.favs[i].id === pdt.id) {
        setFav(true);
        break;
      }
    }
  };

  const goBack = () => NavPointer.GoBack();

  const infoScreen = () => NavPointer.Navigate('InfoScreen');

  const toggleFav = () => {
    fav ? props.removeFavAction(pdt.id) : props.setFavAction(pdt);
    setFav(!fav);
  };

  return (
    <HigherOrderScreen
      statusBar={colors.lightBackground}
      style={{backgroundColor: colors.lightBackground}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: dim.width * 0.05,
          paddingVertical: dim.height * 0.01,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <UseHeader
            leftIcon={AntDesign}
            rightIcon={Feather}
            rightIconName="shopping-bag"
            Title=""
            leftIconName="arrowleft"
            leftIconAction={goBack}
          />
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: dim.width * 0.075,
              color: colors.primary,
              fontWeight: 'bold',
            }}>
            {pdt.categoryName}
          </Text>
          <View
            style={{
              marginTop: dim.height * 0.02,
              elevation: 3,
              borderRadius: 20,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: dim.height * 0.018,
              paddingHorizontal: dim.width * 0.03,
            }}>
            <ImageBackground
              source={pdt.images}
              style={{
                width: '90%',
                height: dim.height * 0.25,
              }}
              resizeMode="center"
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                fontSize: dim.width * 0.06,
                marginTop: dim.height * 0.008,
              }}>
              ${pdt.price}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: dim.width * 0.058,
                marginTop: dim.height * 0.008,
              }}>
              {pdt.productName}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.lightGrey3,
                fontSize: dim.width * 0.038,
                marginTop: dim.height * 0.008,
                textAlign: 'center',
              }}>
              {pdt.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            marginBottom: dim.height * 0.02,
            paddingVertical: dim.height * 0.015,
            // backgroundColor: 'white',
            borderRadius: 50,
            // elevation: 3,
          }}>
          {/* <FontAwesome
            name="minus-circle"
            color={colors.primary}
            size={dim.width * 0.12}
          />
          <View
            style={{
              backgroundColor: 'white',
              width: dim.width * 0.1,
              height: dim.width * 0.1,
              transform: [{scale: 1.53}],
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
              padding: 2,
              borderColor: colors.primary,
              borderWidth: 0.7,
            }}>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: dim.width * 0.05,
              }}>
              1
            </Text>
          </View>
          <FontAwesome
            name="plus-circle"
            color={colors.primary}
            size={dim.width * 0.12}
          /> */}
          <Button
            raised
            title="Add to cart"
            titleStyle={{fontSize: dim.width * 0.05}}
            buttonStyle={{
              paddingVertical: dim.height * 0.015,
              backgroundColor: colors.primary,
            }}
            containerStyle={{
              width: '100%',
              borderRadius: 50,
            }}
          />
        </View>
      </View>
    </HigherOrderScreen>
  );
}

const styles = StyleSheet.create({
  singlepdImg: {
    width: '100%',
    height: '85%',
  },
});
const border = {
  borderColor: 'red',
  borderWidth: 1,
};
const mapStateToProps = (state) => {
  return {
    pdt: state.crntPrdt,
    favs: state.toggleFav,
  };
};
export default connect(mapStateToProps, {setFavAction, removeFavAction})(
  SinglePrd,
);
