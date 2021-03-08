import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Button, Card, Title, Paragraph} from 'react-native-paper';

import {Avatar,} from 'react-native-elements';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {catlist, colors, images} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {api} from './constant';
//import {black} from 'react-native-paper/lib/typescript/styles/colors';

const RenderHeader = () => {
  let navigation = useNavigation();
  return (
    <View style={{height: '10%'}}>
      <View
        style={{
          width: '95%',
          height: 90,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity>
          <Entypo
            name="menu"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>
        <Image source={images.logo} style={{height: 30, width: '30%'}} />
        <Text
          style={{
            position: 'absolute',
            right: '-1%',
            top: '20%',
            fontSize: 10,
            backgroundColor: colors.ORANGE.DEFAULT,
            borderRadius: 50,
            zIndex: 12,
            height: 18,
            width: 18,
            textAlign: 'center',
            paddingTop: 2,
            color: 'white',
          }}>
          23
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', right: '3%'}}
          onPress={() => navigation.navigate('Cart')}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
let CategoriesList = ({route}) => {
  let navigation = useNavigation();
 
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <RenderHeader />

      <Text
        style={{
          padding: 10,
          borderRadius: 1,
          elevation: 1,
        }}>
        Signup <Feather name="chevron-right" size={15} /> Privacy policy
      </Text>
      <Text style={{fontSize: 25, fontWeight:'bold', margin: 5}}>Privacy policy</Text>
      <View style={{margin:10}}> 
      <Paragraph>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in
         the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
           versions of Lorem Ipsum.
      </Paragraph>
      <Paragraph>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in
         the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
           versions of Lorem Ipsum.
      </Paragraph>
      </View>

    </View>
  );
};

export default CategoriesList;
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
});
