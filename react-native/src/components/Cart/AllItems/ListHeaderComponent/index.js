import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../../../NavigationService";
import AntDesign from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const ListHeaderComponent = (props) => {
  const {
    cart,
    setComeToYou,
    setOrderNote,
    setIsModalVisible,
    comeToYou,
    address,
    isModalVisible,
    position,
    orderNote,
  } = props;

  return (
    (cart?.length > 0) &&
    <View style={styles.container}>
      <View style={styles.switch_area}>
        <TouchableOpacity onPress={() => setComeToYou(true)} style={styles.left_switch(comeToYou)}>
          <Text style={styles.left_switch_text(comeToYou)}>Sana Gelsin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setComeToYou(false);
          setOrderNote("");
        }} style={styles.right_switch(comeToYou)}>
          <Text style={styles.right_switch_text(comeToYou)}>Gel Al</Text>
        </TouchableOpacity>
      </View>

      {comeToYou && (
        <View style={styles.come_to_you_area}>
          <Text style={styles.address_title}>Adres: {address.add_title}</Text>
          <Text style={styles.address_desc}>{address.add_desc}</Text>
          <View style={styles.come_to_you_buttons_area}>
            <TouchableOpacity onPress={() => NavigationService.navigate("AddressList")} style={styles.change_address_button}>
              <AntDesign name={"edit"} color={"#000"} size={20} />
              <Text style={styles.change_address_button_text}>Adres Değiştir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setIsModalVisible(true);
            }} style={styles.order_note_button}>
              <AntDesign name={"pluscircleo"} color={"#000"} size={20} />
              <Text style={styles.order_note_button_text}>Not Ekle</Text>
            </TouchableOpacity>
          </View>

          <Modal isVisible={isModalVisible}>
            <View style={styles.modal_container(position)}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modal_close_button}>
                <FontAwesome name={"times-circle"} color={"#000"} size={30} />
              </TouchableOpacity>
              <View style={styles.note_area}>
                <Text style={styles.note_area_title}>Sipariş
                  Notunuz</Text>
                <View style={styles.note_input_area}>
                  <TextInput value={orderNote} onChangeText={(e) => setOrderNote(e)} multiline
                             style={styles.note_input}
                             placeholder={"Sipariş Notunuzu Giriniz (varsa)"} placeholderTextColor={"#000"} />
                </View>
              </View>

              <View style={styles.modal_bottom_buttons_area}>
                <TouchableOpacity onPress={() => setOrderNote("")} style={styles.reset_button}>
                  <Text style={styles.reset_button_text}>Sıfırla</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.save_button}>
                  <Text style={styles.save_button_text}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default ListHeaderComponent;
