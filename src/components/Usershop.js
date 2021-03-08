import React, {Component, useEffect, useState} from 'react';
import {
  Text,  View,  ScrollView,  StyleSheet, Image,  ActivityIndicator,
  TouchableOpacity,  FlatList,  ToastAndroid, 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  Paragraph} from 'react-native-paper';
import { useNavigation} from '@react-navigation/native';
import {colors, images} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {api, cardimage} from './constant';

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
          onPress={() => navigation.navigate('UserCart')}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Shopdata = (props) => {
    const showToast = () => {
      ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
      setNumber(number + 1);
      console.log(number);
    };
  
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [ifLoading, setIsLoading] = useState(false);
  console.log("props........."+props.shopids)
    useEffect(() => {
      setIsLoading(true);
  
      const uri = 
      api.probyshop +
      '?id=' +
      props.shopid;
      fetch(uri)
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          setData(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [props.shopid]);
    let navigation = useNavigation();
    const pic = cardimage;
    if (ifLoading) {
      return (
        <View style={{paddingTop: 100}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  
    return (
      <FlatList
        numColumns={2}
        data={data.Data}
        renderItem={({item}) => {
          const AddToCart = (e) => {
            AsyncStorage.getItem('userData').then((result) => {
                console.log('userData id' + result);
                let user = JSON.parse(result);
                const uri =
                  api.addcart +
                  '&guest_id=118050922'+
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + user.user_id;
              console.log(uri);
              fetch(uri)
                .then((response) => response.json())
                .then((json) => {
                  setCart(json); 
                  ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
            });
          };
  
          return (
            <View style={{height: 250, width: "50%", }}>
                       <TouchableOpacity 
                      onPress={() =>
                        navigation.navigate('Userproductdetail', {id: item.pro_id, pic: featuredslider + item.image_name })
                      }>
                      <Image
                        source={{uri: pic + item.image_name}}
                        style={{width: 120, height: 120, alignSelf:'center'}}
                        resizeMode="center"></Image>
    
                      <Paragraph
                        style={{
                          fontSize: 12,
                          marginLeft: 20,
                          color: colors.LIGHTGREY.DEFAULT,
                        }}>
                          {item.cat_id}
                      
                      </Paragraph>
                      <Paragraph style={{marginLeft: 20}}>
                        {item.pro_name}
                      </Paragraph></TouchableOpacity>
                      <Paragraph
                        style={{
                          marginLeft: 20,
                          fontSize: 14,
                          color: colors.ORANGE.DEFAULT,
                        }}>
                        PKR {item.pro_price}
                      </Paragraph>
                      <TouchableOpacity
                        style={{
                          borderColor: colors.ORANGE.DEFAULT,
                          width: '80%',
                          borderWidth: 1,
                          marginTop: 5,
                          marginLeft: 20,
                          marginRight: 20,
                        }}
                        onPress={AddToCart}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: colors.ORANGE.DEFAULT,
                            textAlign: 'center',
                          }}>
                          Add
                        </Text>
                      </TouchableOpacity>
                    </View>
          );
        }}
      />
    );
  };
const ShopScreen = ({navigation, route}) => {
   navigation = useNavigation();
  const {shop_id} = route.params;
  //const {cat} = route.params;
  console.log('params Shop id', shop_id);
  useEffect(() => {
    async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log('data', JSON.parse(userData));
    };
  }, []);

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
          marginBottom: 10,
        }}>
        Home <Feather name="chevron-right" size={15} /> Shop
      </Text>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
        <Shopdata shopid={shop_id} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopScreen;
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});