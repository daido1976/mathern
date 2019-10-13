import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";

export const SelectPickerListItem = ({
  title,
  itemList,
  currentValue,
  userId
}) => {
  const propsItems = itemList;
  const items = [{ label: "選択しない", value: "未選択" }].concat(propsItems);
  const initialIndex = () => {
    // FIXME: 文字列一致はやばい気がする
    if (currentValue === "No Select") {
      return 0;
    }

    return items.findIndex(i => i.value === currentValue);
  };

  const [showPicker, setShowPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[initialIndex()]);

  const togglePicker = () => {
    if (showPicker) {
      Keyboard.dismiss();
    }

    setShowPicker(!showPicker);
  };

  const renderPickerItems = () => {
    return items.map((item, index) => {
      return (
        <Picker.Item
          label={item.label}
          value={item.value}
          key={index}
          color={item.color}
        />
      );
    });
  };

  const onValueChange = (_value, index) => {
    setSelectedItem(items[index]);
  };

  const renderInputAccessoryView = () => {
    return (
      <View
        style={[defaultStyles.modalViewMiddle]}
        testID="input_accessory_view"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            saveValue();
            togglePicker();
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
          testID="done_button"
        >
          <View testID="needed_for_touchable">
            <Text style={[defaultStyles.done]}>完了</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  // TODO: EditProfileScreen にリフトアップして saveName などとマージする
  const saveValue = async () => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          [title.value]: selectedItem.value
        })
        .catch(error => alert(error.message));
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
    <View style={[defaultStyles.viewContainer]}>
      <ListItem
        title={title.label}
        rightTitle={selectedItem.label}
        onPress={togglePicker}
        bottomDivider
        chevron
      ></ListItem>
      <Modal
        testID="ios_modal"
        visible={showPicker}
        transparent
        animationType={"slide"}
        supportedOrientations={["portrait", "landscape"]}
      >
        <TouchableOpacity
          style={[defaultStyles.modalViewTop]}
          testID="ios_modal_top"
          onPress={togglePicker}
        />
        {renderInputAccessoryView()}
        <View style={[defaultStyles.modalViewBottom, { height: 215 }]}>
          <Picker
            testID="ios_picker"
            onValueChange={onValueChange}
            selectedValue={selectedItem.value}
          >
            {renderPickerItems()}
          </Picker>
        </View>
      </Modal>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  viewContainer: {
    alignSelf: "stretch"
  },
  modalViewTop: {
    flex: 1
  },
  modalViewMiddle: {
    height: 44,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#EFF1F2",
    borderTopWidth: 0.5,
    borderTopColor: "#919498",
    zIndex: 2
  },
  done: {
    color: "#007AFE",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 1,
    paddingRight: 2
  },
  modalViewBottom: {
    justifyContent: "center",
    backgroundColor: "#D0D4DB"
  }
});
