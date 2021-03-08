import React, {useEffect, useState} from 'react';
import {Button, View, Text, BackHandler, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';


import UserHomeScreen from '../UserHomeScreen'
import AdDrawerContent from './AdDrawerContant';
import Userproductdetail from '../Userproductdetail';
import UserShop from '../Usershop';
import Userallproduct from '../Userallproduct'
import UserCart from '../usercart';
import CheckOut from '../CheckOut';
import OrderDetails from '../OrderDetails';
import MyProfile from '../MyProfile'
import userdashboard from '../userdashboard'
import CheckStatus from '../OrderDetails'
import ChangePassword from '../ChangePassword';
import Usersearchresult from '../Usersearchresult'
import UsercategoriesList from '../UsercategoriesList'
import UsercatagoriesProductList from '../UsercategoriesProductList'

const Drawer = createDrawerNavigator();

export default function RouteNav1() {
  
  return (
    <Drawer.Navigator initialRouteName="UserHomeScreen" 
     drawerContent={(props) => <AdDrawerContent {...props}  />}>

      <Drawer.Screen name="Userproductdetail" component={Userproductdetail} />
      <Drawer.Screen name="Usersearchresult" component={Usersearchresult}  />
      <Drawer.Screen name="UsercategoriesList" component={UsercategoriesList} />
      <Drawer.Screen name="UsercategoriesProductList" component={UsercatagoriesProductList} />
      
      <Drawer.Screen name="UserHomeScreen" component={UserHomeScreen}/>
      <Drawer.Screen  name="UserShop" component={UserShop}/>
      <Drawer.Screen name="Userallproduct" component={Userallproduct}  />
      <Drawer.Screen name="UserCart" component={UserCart} /> 
      <Drawer.Screen name="CheckOut" component={CheckOut} />
      <Drawer.Screen name="Userdashboard" component={userdashboard}    />
      <Drawer.Screen name="CheckStatus"  component={CheckStatus} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      
      <Drawer.Screen name="MyProfile" component={MyProfile} />


    </Drawer.Navigator>
  );
}

