import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import dim from './heightWidth';
import colors from './colors';

function FancySearchBtn(props) {
  const IconLibrary = props.IconLibrary;

  return (
    <View
      style={{
        ...styles.searchbtnOuterwrap,
        width: props.btnWidth ? props.btnWidth : dim.width * 0.13,
        height: props.btnHeight
          ? props.btnHeight * 0.5
          : (dim.height * 0.125) / 2,
      }}>
      <View
        style={{
          ...styles.searchBtnWrap,
          height: props.btnHeight ? props.btnHeight : dim.height * 0.125,
        }}>
        <TouchableOpacity
          style={{...styles.sb1, ...props.iconStyle}}
          onPress={props.onPress}>
          <IconLibrary
            name={props.icon}
            size={props.iconSize}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  sb1: {
    zIndex: 5,
    position: 'absolute',
    height: '50%',
    width: '100%',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: dim.height * 0.015,
    paddingLeft: dim.width * 0.02,
  },
});

export default FancySearchBtn;
