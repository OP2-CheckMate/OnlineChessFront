import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './GameOverModal';

interface PromoModalProps {
  isVisible: boolean;
  onClose: (value: string) => void;
}

const PromotionModalComponent: React.FC<PromoModalProps> = ({ isVisible, onClose }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueSelected = (value: string) => {
    setSelectedValue(value);
    onClose(value)
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{
        flex: 1,
        marginTop: '35%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 60,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        elevation: 5,
        width: '75%',
        maxHeight: '40%',
        
      }}>

        <View style={{ flex: 1, flexDirection: 'row', height: 150}}>
            <TouchableOpacity onPress={() => handleValueSelected('q')} style={{ width: 100, maxHeight: 100 }}  >
                <Image source={require('../assets/pieces/wq.png')} style={{ width: 80, height: 80 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleValueSelected('n')} style={{ width: 100, maxHeight: 100 }}  >
                <Image source={require('../assets/pieces/wn.png')} style={{ width: 80, height: 80 }} />
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', height: 150}}>
            <TouchableOpacity onPress={() => handleValueSelected('r')} style={{ width: 100, maxHeight: 100, }} >
                <Image source={require('../assets/pieces/wr.png')} style={{ width: 80, height: 80 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleValueSelected('b')} style={{ width: 100, maxHeight: 100 }} >
                <Image source={require('../assets/pieces/wb.png')} style={{ width: 80, height: 80 }} />
            </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
};

export default PromotionModalComponent;