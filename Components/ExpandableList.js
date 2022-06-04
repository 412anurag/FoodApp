import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, Image,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ExpandableListView extends Component {

    constructor() {
      super();
      this.state = {
        layoutHeight: 0
      }
    }
  
    
    static getDerivedStateFromProps(props,state) {
      if (props.item.expanded) {
          return {
            layoutHeight: null
          }
      }
      else {
          return {
            layoutHeight: 0
          }
      }
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        return true;
      }
      return false;
    }
  
    showSelectedItem = (item) => {
      Alert.alert(item);
    }
  
    render() {
      return (
        <View >
          <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.categoryView}>
          <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJiUkB-pJw3Y8KM9okeLCoFKzuCFrBqLLog&usqp=CAU'}}
              style={{ width: 30,height: 30,marginLeft:10}} />
            <Text style={styles.categoryText}>{this.props.item.title} </Text>
            <Icon name={this.props.item.expanded?"caret-up":"caret-down"} size={20} color="#ddd" style={styles.iconStyle} />
          </TouchableOpacity>
          <View style={{ height: this.state.layoutHeight, overflow: 'hidden' }}>
            {
              this.props.item.data.map((item, key) => (
                <TouchableOpacity key={key} style={styles.subCategoryView} onPress={()=>this.showSelectedItem(item.title)}>
                  <Text style={styles.subCategoryText}> {item.title} </Text>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#ccc' }} />
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    iconStyle: {
      width: 30,
      height: 30,
    },
    categoryView: {
      marginVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    categoryText: {
      textAlign: 'left',
      color: '#000',
      fontSize: 21,
      padding: 10
    },
    subCategoryView: {
      backgroundColor: '#fff'
    },
    subCategoryText: {
      textAlign: 'left',
      color: '#000',
      fontSize: 18,
      padding: 7
    },
   
  });