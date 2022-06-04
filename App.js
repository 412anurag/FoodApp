import React, { Component } from 'react';
import axios from 'axios';
import { Alert, LayoutAnimation, StyleSheet, View, Text,TextInput, ScrollView, UIManager, TouchableOpacity, Platform,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpandableListView from './Components/ExpandableList';


export default class App extends Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }


    this.state = { itemsList:[],foodList: [],search:'',modalVisible:false,loading:true }
  }

  componentDidMount(){
    axios
      .get(
        "https://api.jsonbin.io/b/60e7f4ebf72d2b70bbac2970"
      )
      .then((res) => {
        this.setState({itemsList:res.data.data.map(n=>({...n,expanded:false})),loading:false,
        foodList:res.data.data.map(n=>({...n,expanded:false})),loading:false})
      })
      .catch((error) => console.log(error));
  }

  handleSearch = (text) => {
    let filteredList=this.state.itemsList.map((item) =>
    ({...item,
      data:item.data.filter(n=>n.title.toLowerCase().includes(text.toLowerCase().trim()))
    })
    );
    this.setState({search:text,foodList:filteredList});
  };

  
  updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.foodList];
    array[index]['expanded'] = !array[index]['expanded'];
    this.setState(() => {
      return {
        foodList: array
      }
    });
  }

  render() {
    
    if(this.state.loading)
    return(
      <View style={[styles.container,{alignItems:'center'}]}>
        <Text>Loading Data</Text>
      </View>
    )
    return (
      <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        Alert.alert("Approved Food List has been closed.");
        this.setState({modalVisible:false});
      }}
        >
      <View style={styles.container}>
        <View style={{paddingHorizontal:10,paddingVertical:10}}>
        <TouchableOpacity onPress={() => this.setState({modalVisible:false})}>
                <Text style={{fontSize:20}}>X</Text>
              </TouchableOpacity>
        <Text style={{fontSize:30,color:'#000'}}>Approved Food List</Text>
        </View>
        <View style={styles.searchView}>
        <Icon name="search" size={20} color="#ddd" />
        <TextInput
        onChangeText={text =>this.handleSearch(text)}
        placeholder='search your item here'
        value={this.state.search}
      />
      </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          {
            this.state.foodList && this.state.foodList.map((item, key) =>
              (
                <ExpandableListView key={item.title} onClickFunction={()=>this.updateLayout(key)} item={item} />
              ))
          }
        </ScrollView>
      </View>
      </Modal>
      <TouchableOpacity onPress={() => this.setState({modalVisible:true})}
      style={{justifyContent:'center',alignItems:'center',
      paddingHorizontal: 5,paddingVertical: 5,
      marginHorizontal: 30,marginVertical: 30,
      borderRadius:20,backgroundColor:'#1b1'}}>
      <Text style={{fontSize:20}}>Approved Food List</Text>
      </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#dcdcdc',
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  categoryText: {
    textAlign: 'left',
    color: '#000',
    fontSize: 21,
    padding: 10
  },
  searchView:{
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  categoryView: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  subCategoryText: {
    textAlign: 'left',
    color: '#000',
    fontSize: 18,
    padding: 7
  },
  subCategoryView: {
    backgroundColor: '#fff'
  },
  Btn: {
    padding: 10,
    backgroundColor: '#FF6F00'
  }
});