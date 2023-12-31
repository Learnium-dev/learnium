import { useRef, useState } from "react";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const PopupMenu = ({ options }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const menuRef = useRef(null);

  const closeMenu = () => menuRef.current.close();

  return (
    <Menu ref={menuRef}>
      <MenuTrigger>
        <Feather name="more-vertical" size={24} color="black" />
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        <Pressable onPress={closeMenu} style={optionsStyles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        {options.map((option) => (
          <MenuOption
            key={option.text}
            onSelect={option.onSelect}
            disabled={option.disabled}
            text={option.text}
            customStyles={optionsStyles}

            // onSelect={() => setSelectedOption(option.text)}
            //customStyles={{
            //   ...optionsStyles,
            //   optionText: {
            //     color: selectedOption === option.text ? "#7000FF" : "black",
            //   },
            // }}
          />
        ))}
      </MenuOptions>
    </Menu>
  );
};

const optionsStyles = {
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    height: 25, 
    width: 25,
    // backgroundColor: 'red',
    zIndex: 1,
  },
  optionsContainer: {
    width: '100%',
    padding: 5,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  optionsWrapper: {
  },
  optionWrapper: {
    margin: 5,
  },
  optionTouchable: {

  },
  optionText: {
    color: 'black',
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
  },
};

export default PopupMenu;
