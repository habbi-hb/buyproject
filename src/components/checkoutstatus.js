/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors, images} from './constant';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Alert,
  Modal,
  TouchableHighlight,
  SectionList,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {CheckBox,Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {api} from './constant';
import {CommonActions, useNavigation} from '@react-navigation/native';

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
        <TouchableOpacity style={{position: 'absolute', right: '3%'}}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CheckOut = ({route, navigation}) => {
    const [statusdata, setstatusdata]=useState([]);
    const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Cname, setCname] = useState('');
  const [Country, setCountry] = useState('');
  const [Address, setAddress] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zip, setZip] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Payment, setPayment] = useState('cash');  
  const [index, setIndex] = useState(); 

    var arrayData = [];
   
    useEffect(() => {
       
      AsyncStorage.getItem('puser')
      .then(req => JSON.parse(req))
      .then(json => setstatusdata(json))
      .catch(error => console.log(error))
      
        
    
      }, []);
      const getdata =() =>{
        AsyncStorage.getItem('puser')
      .then(req => JSON.parse(req))
      .then(json => setstatusdata(json))
      .catch(error => console.log(error))

      }
      console.log("data.....",statusdata[0])
      const handleCheckOutTap = (e) => {
        setLoading(true);
         AsyncStorage.getItem('userData').then((result) => {
           console.log('userData ID' + result);
           let user = JSON.parse(result);
       
    
           const uri =
             api.checkout +
             'first_name=' +
             Fname +
            '&last_name=' +
            Lname +
            '&company_name=' +
            Cname +
            '&country=' +
            Country +
            '&address_one=' +
            Address +
            '&address_two=' +
            Street +
            '&city=' +
            City +
            '&state=' +
            State +
            '&zip=' +
            Zip +
            '&phone=' +
            Phone +
            '&email=' +
            Email +
            '&payment=cash&' +
            'user_id=' + user.user_id;
          console.log(uri);
          fetch(uri)
            .then((response) => response.json())
            .then((json) => {
              setData(json);
              setLoading(false);
              Alert.alert(data.result);
             
             
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        });
    
     
      };
      const deleteitem = (e) => {
        statusdata.splice(e,1);
         AsyncStorage.setItem('puser',JSON.stringify(statusdata))
         getdata();
  
      }
  

      
  
  
      if (isLoading) {
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="black" />
          </View>
        );
      }


  const {total} = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 10}}>
        Home <Feather name="chevron-right" size={15} /> Shopping Cart{' '}
        <Feather name="chevron-right" size={15} /> Check Out Status
      </Text>
      <ScrollView
        style={{
          width: '95%',
          height: '86%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        showsVerticalScrollIndicator={false}>

    <View>
      {statusdata.map((items, key) => {
        return (

          <View key={items.key} style={{borderWidth: 1, margin: 5,padding: 5}}>

            {items.map((subItems, sIndex) => {
              return ( 
              <View key={items.sIndex} style={{flexDirection:'row', justifyContent: 'space-between', }}>
                <TouchableOpacity  onPress={() => {handleCheckOutTap(),  setLname(subItems.Lname), setFname(subItems.Fname),
                 setAddress(subItems.Address), setCname("abc"), setCity(subItems.City), setCountry(subItems.Country),
                  setEmail(subItems.Email), setPhone(subItems.Phone), setState(subItems.State),setStreet(subItems.Street) }
                 } style={{width: "70%" }} >
              <Text style={{fontSize: 20}}>Name: {subItems.Fname} {subItems.Lname} </Text>
              <Text style={{fontSize: 14}}>Address: {subItems.Address} {subItems.Street} {subItems.City} {subItems.Country} {subItems.Zip} </Text>
           
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => {deleteitem(key)}}
              style={{width: "30%",alignItems:'flex-end' }}>
                <Icon style={{color:'#fc7782', fontSize: 35 }} size={12} active name="delete" type="MaterialCommunityIcons" />
             
              </TouchableOpacity>
              </View>
             
              
                )
            })}
          </View>
        );
      })}
      </View>
      {getdata}
    

    
   
   
  
   
  
  <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.ORANGE.DEFAULT,
                padding: 10,
                width: '100%',
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate('CheckOut', {
                  totall: total,
                })
              }>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.ORANGE.DEFAULT,
                  textAlign: 'center',
                }}>
                Add New 
              </Text>
            </TouchableOpacity>
            
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: '7%'},
  text: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  font: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  login: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    marginVertical: 10,
  },
  logins: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginVertical: 10,
  },
  form: {
    flexDirection: 'column',
    margin: 20,
  },
  btns: {
    fontSize: 20,
    color: 'orange',
    marginRight: 15,
  },
  btn: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 5,
    color: '#808080',
  },
  textb: {
    width: '100%',
    height: 44,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 13,
  },
  textbb: {
    margin: 15,
  },
  chck: {
    flexDirection: 'row',
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CheckOut;
