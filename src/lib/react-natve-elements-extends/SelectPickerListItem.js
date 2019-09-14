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

export const SelectPickerListItem = (
  placeholder = "未選択",
  value = "hoge"
) => {
  const getSelectedItem = ({ items, value }) => {
    let idx = items.findIndex(item => {
      return item.value === value;
    });
    if (idx === -1) {
      idx = 0;
    }
    return {
      selectedItem: items[idx] || {},
      idx
    };
  };

  const propsItems = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" }
  ];

  const items = [{ label: "選択しない", value: placeholder }].concat(
    propsItems
  );

  const [showPicker, setShowPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    getSelectedItem({
      items,
      value
    })
  );

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

  const onValueChange = (value, index) => {
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
            togglePicker(true);
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

  return (
    <View style={[defaultStyles.viewContainer]}>
      <ListItem
        title={"title"}
        rightTitle={selectedItem.label || "未選択"}
        onPress={() => {
          togglePicker(true);
        }}
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
          onPress={() => {
            togglePicker(true);
          }}
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
