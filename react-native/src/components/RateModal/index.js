import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Stars from "react-native-stars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RateModal = (props) => {
  const { isVisibleModal, position, setIsVisibleModal, coffeeRate, setCoffeeRate, setRate } = props;

  return (
    <Modal isVisible={isVisibleModal}>
      <View style={styles.modalContent(position)}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisibleModal(false)}>
          <FontAwesome name={"times-circle"} color={"#000"} size={30} />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.modal_title}>Kahveyi nasıl buldunuz ?</Text>
          <View style={styles.rate_area}>
            <Stars
              default={coffeeRate}
              count={5}
              starSize={50}
              update={(val) => setCoffeeRate(val)}
              fullStar={<MaterialCommunityIcons name={"star"} size={30} color={"#f26347"} />}
              emptyStar={<MaterialCommunityIcons name={"star-outline"} size={30} color={"#000"} />}
            />
          </View>
        </View>

        <View style={styles.buttons_area}>
          <TouchableOpacity onPress={() => setCoffeeRate(0)} style={styles.reset_button}>
            <Text style={styles.reset_button_text}>Sıfırla</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={setRate} style={styles.vote_button}>
            <Text style={styles.vote_button_text}>Oy Ver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RateModal;
