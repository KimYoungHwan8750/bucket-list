import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

export default function ListItem({ item, onRemove, onToggleComplete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItemName, setUpdatedItemName] = useState(item.name);

  const StyledTouchableOpacity = styled.TouchableOpacity`
    background-color:#81BEF7;
    padding:5px;
    border-radius:10px;
    width:70px;
    align-items:center;  
    margin-left:5px;
  `;
  
  const StyledText = styled.Text`
    color:black;
    font-weight:700`;

  return (
      <View style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-between',
          backgroundColor:'rgba(0,0,0,0.1)',
          borderRadius:10,
          padding:15,
          marginTop:5,
          marginBottom:5 }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            {!isEditing &&
            <CheckBox
              onClick={() => onToggleComplete(item.id)}
              isChecked={item.isComplete}
            />}
            {!isEditing ? 
                <Text style={{ textDecorationLine:item.isComplete?'line-through':'none','color':'' }}>{item.name}</Text> :
                <TextInput value={updatedItemName}
                 onChangeText={(text) => setUpdatedItemName(text)
                }
                    onSubmitEditing={() => {
                    onUpdate(item.id, updatedItemName);
                    setIsEditing(false);
                  }}
                 />
            }
        </View>

        {!isEditing && !item.isComplete &&
            <StyledTouchableOpacity
            style={{
                marginLeft:'auto',
                alignSelf:'right'
            }}
            onPress={() => setIsEditing(true)}>
              <StyledText>수정</StyledText>
            </StyledTouchableOpacity>
        }

        {!isEditing &&
            <StyledTouchableOpacity 
            style={{
                backgroundColor:'#FA5858'
            }}
            onPress={() => {
                Alert.alert(
                  "알림",
                  "삭제하시겠습니까?",
                  [
                    {text: '아니오', onPress: () => console.log('입력 취소'), style: 'cancel'},
                    {text: '예', onPress: () => onRemove(item.id)},
                  ],
                  { cancelable: false }
                );
            }}>
                <StyledText>삭제</StyledText>
            </StyledTouchableOpacity>

         }
         
     </View>
   );
};
