import React, { useState, useEffect } from "react";
import api from './services/api'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [list , setList] = useState([])

  useEffect(()=> {
    api.get('repositories').then(response=>
      setList(response.data) )
  },[])



  async function handleLikeRepository(id) {


        //aqui retorna o array do cara que aumentei like
          const {data} = await api.post(`/repositories/${id}/like`)

        //aqui eu acho o indicíe no meu estado do cara que alterei o like
         const listIndex = list.findIndex(a=>a.id === id)
        //aqui eu removo no meu estado o array velho , botando o novo na mesma posição
         list.splice(listIndex, 1 , data)
        //aqui eu substituo o array novo para o meu estado
         setList([...list])


          
         
            
   
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
          <FlatList 
          data={list}
          style={styles.repositoryContainer}
          keyExtractor={list=>list.id}
          renderItem={({item:list})=>( <>

            <Text style={styles.repository} >{list.title}  </Text>
            <View style={styles.techsContainer}>

            {list.techs.map(a=> <Text style={styles.tech}>{a} </Text>)}

            </View>


            <View style={styles.likesContainer}>

                 <Text style={styles.likeText}
                       testID={`repository-likes-${list.id}`}>
                   {list.likes} curtidas
                 </Text>
           </View>

          
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(list.id)}
              testID={`like-button-${list.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
                </>
              )}
              >
          </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
