import React, {Component, useEffect, useState} from 'react';
import {Text, View, ScrollView,ActivityIndicator, FlatList, TextInput, Image} from 'react-native';
import {Item, Input, Label, Picker, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images, colors} from './constant';
import {api, } from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';


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
          <TouchableOpacity    onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={30} />
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
        <TouchableOpacity style={{marginLeft:190}}>
          <AntDesign name="shoppingcart" size={30} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
let Login = () => {
  let navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [Orders, setorders] = useState([]);


  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('userData').then((result) => {
      console.log('userData id' + result);
      let Rnumber = JSON.parse(result);
      const uri = api.checkorders + Rnumber.user_id
      console.log(uri);
      
  
      fetch(uri)
        .then((response) => response.json())
        .then((json) => {
          setorders(json);
          setLoading(false);
         console.log(Orders)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    });
  }, []);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="black"  />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <SafeAreaView />
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 5}}>
        Home <Feather name="chevron-right" size={15} /> Order Detail
      </Text>
      <FlatList
         key={'_'}
        
              data={Orders.Data}
              renderItem={({item}) => {
               
               
                return (
                  
                  <View    style={{
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 1,
                    elevation: 1,
                    alignItems:'center',
                    height: 100,
                    margin: 5,
                    flexDirection:'row'
                  }}>
                  <View style={{width: "30%",  }} >
                  <Image
                      source={{uri: item.product_image + "1605106312product-7.jpg"}}
                      style={{width: 80, height: 80, alignSelf:'center'}}
                      ></Image>
                    </View>
                  <View style={{width: "70%", }}>
                    <Text style={{textAlign: 'center', fontWeight:'bold'}}>Status: {item.order_status}</Text>
                    
                      <Text style={{fontWeight:'200'}}>Name: {item.pro_name}</Text>
                       
                      <Text style={{fontWeight:'200'}}>Price: {item.pro_price}</Text>
                      
                      
                      <Text style={{fontWeight:'200'}}>Quantity: {item.order_qty}</Text>
                    
                      
                      
                  </View>
                  
                
                  
                  </View>
                );
              }}
            />
   
      
    </View>
  );
};

export default Login;
