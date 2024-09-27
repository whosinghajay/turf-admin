import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Image,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Turf} from '../types/types';
import {API_SERVER} from '../../envVar';
import LinearGradient from 'react-native-linear-gradient';
import {default as DeleteIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as EditIcon} from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import CommentIcon from 'react-native-vector-icons/Feather';

interface TurfInfo {
  success: boolean;
  total: number;
  turf: Turf[];
}

const HomeScreen = () => {
  const [turfList, setTurfList] = useState<TurfInfo>({
    success: false,
    total: 0,
    turf: [],
  });
  if (turfList.turf.length > 0) {
    console.log(turfList.turf[0].turfName);
  } else {
    console.log('turfList is empty');
  }

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_SERVER}/api/v1/turf/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setTurfList(result);
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}: {item: Turf}) => {
    return (
      <TouchableHighlight underlayColor="#fff" onPress={() => {}}>
        <View className="mx-2 mt-[12px] relative">
          <Image
            source={{uri: `${API_SERVER}/${item.image}`}}
            style={{
              width: 304,
              height: 172.86,
              borderRadius: 12,
            }}
            className="max-w-full mx-auto"
          />

          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              borderRadius: 12,
            }}>
            {/* This LinearGradient covers the entire image */}
          </LinearGradient>

          <View className="absolute bottom-3 left-4 gap-[3px] right-4">
            <Text className="text-white font-semibold" style={{fontSize: 24}}>
              {item.turfName}
            </Text>
            <View className="flex-row items-center">
              <Icon name="location-pin" size={14} color="white" />
              <Text className="text-white ml-1" style={{fontSize: 14}}>
                {item.turfLocation}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row gap-2">
                <Image
                  source={require('../assests/icons/starIcon.png')}
                  style={{width: 81, height: 19}}
                />
                <Text className="text-yellow-300">4.0</Text>
              </View>
              <View className="flex-row gap-1 items-center">
                <CommentIcon name="message-square" size={15} color="white" />
                <Text className="text-white">441 Comment</Text>
              </View>
            </View>
          </View>
          <View className="absolute right-4 top-3 gap-2">
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => Alert.alert('Edit')}>
              <EditIcon name="edit" size={20} color="white" />
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => Alert.alert('Delete')}>
              <DeleteIcon name="delete" size={20} color="white" />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

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
          Here's the list of all turves
        </Text>

        {loading ? ( // Conditional rendering
          <Text className="text-center">Loading...</Text>
        ) : turfList.turf.length > 0 ? (
          <View>
            <FlatList
              data={turfList.turf}
              renderItem={renderItem}
              keyExtractor={item => item._id.toString()}
              contentContainerStyle={{paddingBottom: 20}}
              horizontal={true}
            />
          </View>
        ) : (
          <Text className="text-center">No turfs available</Text>
        )}

        <View className="border-[0.5px] border-gray-500 w-[70%] self-center"></View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
