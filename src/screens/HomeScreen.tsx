import {View, Text, ScrollView, TouchableHighlight, Image, StatusBar, FlatList} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <ScrollView>
      {/* header */}
      <StatusBar backgroundColor="#1D1CA3" />
      <View className="bg-[#1D1CA3] pt-5 pb-4 pl-5 rounded-b-3xl flex-row">
        <View className="mt-4 mb-4 flex-row">
          <Image
            source={require('../assests/images/profileImage.png')}
            style={{width: 92.82, height: 92.82}}
          />
          <View>
            <Text className="text-white text-xl mt-3 ml-4 font-semibold">
              Hey🖐Admin.
            </Text>

            <Text className="text-white text-sm mt-1 ml-4">
              +91 989-898-9898
            </Text>

              <View className="flex-row items-center mt-1">
                <Text className="text-white text-xs ml-4 font-light">
                  Indore, MP
                </Text>
              </View>
          </View>
        </View>
      </View>

      {/* body section - list of turves created*/}
      <View className="mx-3 mt-1">
        <Text className="text-base font-medium mx-2">
          Here's the list of turves created
        </Text>

        <View>
          {/* <FlatList
            data={turfList}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={{paddingBottom: 20}}
            horizontal={true}
          /> */}
        </View>

        <View className="border-[0.5px] border-gray-500 w-[70%] self-center"></View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
