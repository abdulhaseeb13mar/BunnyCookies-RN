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
import dim from '../Helpers/heightWidth';
import {connect} from 'react-redux';
import FancyBtn from '../Helpers/FancyBtn';
import NavPointer from '../Navigation/NavPointer';
import {setFavAction, removeFavAction} from '../Redux/actions';

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
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '10%',
            }}>
            <TouchableOpacity style={styles.crossWrapper} onPress={goBack}>
              <AntDesign
                name="arrowleft"
                color="black"
                size={dim.width * 0.07}
              />
            </TouchableOpacity>
            <FancyBtn
              IconLibrary={AntDesign}
              icon={fav ? 'heart' : 'hearto'}
              iconSize={dim.width * 0.055}
              iconStyle={{
                paddingBottom: dim.height * 0.01,
                paddingLeft: dim.width * 0.02,
              }}
              btnWidth={dim.width * 0.11}
              btnHeight={dim.height * 0.11}
              onPress={toggleFav}
            />
          </View>
          <ImageBackground
            source={pdt.images}
            style={styles.singlepdImg}
            imageStyle={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            alignContent: 'flex-end',
            marginVertical: dim.height * 0.015,
            width: '100%',
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: dim.width * 0.07,
              fontWeight: 'bold',
            }}>
            {pdt.name}
          </Text>
          <Text
            style={{
              fontSize: dim.width * 0.06,
            }}>
            {pdt.subText}
          </Text>
          <Text
            style={{
              width: '90%',
              fontSize: dim.width * 0.041,
              color: colors.darkGray,
              lineHeight: dim.height * 0.03,
              marginVertical: dim.height * 0.013,
              fontWeight: 'bold',
            }}>
            {pdt.about}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: dim.width * 0.045}}>
              Kkal: <Text style={{fontWeight: 'bold'}}>{pdt.kkal}</Text>
            </Text>
            <Text style={{fontSize: dim.width * 0.045}}>
              Weigh: <Text style={{fontWeight: 'bold'}}>{pdt.weight}</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingVertical: dim.height * 0.02,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: colors.darkGray, fontSize: dim.width * 0.04}}>
              Total Price
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: dim.width * 0.06,
                fontWeight: 'bold',
              }}>
              ${pdt.price}
            </Text>
          </View>
          <Button
            onPress={infoScreen}
            title="buy now"
            buttonStyle={{
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              paddingHorizontal: dim.width * 0.07,
              backgroundColor: colors.primary,
              paddingVertical: dim.height * 0.015,
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

const mapStateToProps = (state) => {
  return {
    pdt: state.crntPrdt,
    favs: state.toggleFav,
  };
};
export default connect(mapStateToProps, {setFavAction, removeFavAction})(
  SinglePrd,
);
