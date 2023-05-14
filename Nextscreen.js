import React from 'react';
import { View } from 'react-native';

function NextScreen() {
  return (
    <View style={container}>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'yellow',
        borderTopWidth: 35,
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
});

export default NextScreen;
