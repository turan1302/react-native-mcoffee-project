import React from 'react'
import { Text, View } from "react-native";
import { Collapse, CollapseBody, CollapseHeader } from "accordion-collapse-react-native";
import styles from "./styles";

const ListItem = (props) => {
  const {item} = props;

  return (
    <View style={styles.container}>
      <Collapse>
        <CollapseHeader>
          <View>
            <Text style={styles.sss_title}>{item.sss_title}</Text>
          </View>
        </CollapseHeader>
        <CollapseBody style={styles.description_area}>
          <Text style={styles.description_text}>{item.sss_desc}</Text>
        </CollapseBody>
      </Collapse>
    </View>
  )
}

export default ListItem
