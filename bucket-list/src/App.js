import React, { useState } from 'react';
import { ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from './ListItem';

const StyledView= styled.View`
  flex: 1;
  background-color: white;
`;

const Container= styled.View`
  flex: 1;
  margin-top:20px;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 32px;
  color: black;
  padding-top:15px;
  align-self:center;
`;

const InputContainer = styled.View`
  flex-direction: row;
   border-bottom-width: 1px;
   background-color:'rgba(0,0,0,0.05)',

`;

const Line = styled.View`
background-color:'rgba(0,0,0,0.15)';
padding-bottom:15px;

`;
const StyledTouchableOpacity = styled.TouchableOpacity`
background-color:rgba(0,0,0,0.1);
margin:3px;
padding:5px;
border-radius:10px;
width:70px;
align-items:center;  
justify-content:center;
`;

const StyledText = styled.Text`
margin-top:auto;
margin-bottom:auto;
font-weight:700`;

const TextInput = styled.TextInput`
  flex: 1;
  color:black;
`;


const DeleteTouchableOpacity = styled.TouchableOpacity`
height:50px;

align-items:center;
background-color:grey`;

export default function App() {
  
  async function removeCompletedItems() {
    const uncompletedItems = items.filter((item) => !item.isComplete);
    setItems(uncompletedItems);
    await AsyncStorage.setItem('items', JSON.stringify(uncompletedItems));
}
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');


    async function loadItems() {
        const savedItemsString = await AsyncStorage.getItem('items');
        if (savedItemsString) {
            setItems(JSON.parse(savedItemsString));
        }
    }

    async function addItem() {
        const newId =
            items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

        const newItem = { id: newId, name: newItemName };

        setItems([...items, newItem]);
        await AsyncStorage.setItem('items', JSON.stringify([...items, newItem]));

        setNewItemName('');
    }

   async function removeItem(id) {
       const newItemsList = items.filter((item) => item.id !== id);
       setItems(newItemsList);
       await AsyncStorage.setItem('items', JSON.stringify(newItemsList));
   }

   async function toggleComplete(id) {
       let tempArray= [...items];
       let index=tempArray.findIndex(item=>item.id===id)
       tempArray[index].isComplete=!tempArray[index].isComplete
      setItems(tempArray);
      await AsyncStorage.setItem('items', JSON.stringify(tempArray));
   }

   async function updateItem(id,newName){
     let tempArray= [...items];
     let index=tempArray.findIndex(item=>item.id===id)
     tempArray[index].name=newName
     setNewItem(tempArray);
     await AsyncStorage.setItem('newItem',JSON.stringify(tempArray));
   }

   return (
     <StyledView style={{ flex: 1,paddingTop:20, }}>
         <Container>
             <Line><Title>Bucket List</Title></Line>
             <InputContainer>
                 <TextInput 
                 style={{
                  padding:10,
                  paddingLeft:20               
                }}
                onSubmitEditing={addItem}
                 value={newItemName}
                  onChangeText={setNewItemName} />
                 <StyledTouchableOpacity
                  onPress={addItem} >
                  <StyledText>추가</StyledText>
                 </StyledTouchableOpacity>
             </InputContainer>
             <ScrollView>
             {items.slice().reverse().map((item) => (
    <ListItem key={item.id} item={item} onRemove={removeItem} onToggleComplete={toggleComplete} onUpdate={updateItem}/>
  ))}
             </ScrollView>
             <DeleteTouchableOpacity
             onPress={removeCompletedItems}>
              <StyledText
              style={{
                fontSize:20
              }}>완료 항목 삭제</StyledText>
             </DeleteTouchableOpacity>
         </Container>
     </StyledView>
   );
}
