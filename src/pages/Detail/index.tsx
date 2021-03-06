import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

import { getPoint, Item, Point } from '../../services/api';

import styles from './styles';

interface Params {
  point_id: number;
};

interface Data {
  point: Point,
  items: Item[],
};

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);
  const { goBack, navigate } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    getPoint(routeParams.point_id).then((response) => { setData(response.data) });
  }, []);

  const handleGoBack = () => {
    goBack();
  };

  const handleComposerMail = () => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  };

  const handleWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta de resíduos`);
  };

  if (!data.point) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.state}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposerMail}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;