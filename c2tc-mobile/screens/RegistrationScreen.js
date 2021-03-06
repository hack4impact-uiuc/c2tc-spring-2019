import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { AsyncStorage } from "react-native";
import API from "../components/API";

export default class Registration extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    pswd: "",
    repswd: "",
    username: "",
    errors: []
  };

  handleRegistration = async () => {
    let errors = this.validate();
    if (errors.length === 0) {
      const response = await API.registerNewUser(
        this.state.email,
        this.state.pswd,
        this.state.username
      );
      if (!response.success) {
        errors = [response.message];
        this.setState({ errors });
      } else {
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.result.token)
        );
        await AsyncStorage.setItem("token", response.result.token);
        this.setState({ successfulSubmit: true });
        this.props.navigation.navigate("Verify");
      }
    } else {
      this.setState({ errors });
    }
  };

  validate() {
    let errors = [];

    if (this.state.email.length === 0) {
      errors.push("Email cannot be empty");
    }

    if (this.state.pswd.length === 0) {
      errors.push("Password cannot be empty");
    }

    if (this.state.repswd.length === 0) {
      errors.push("Re-enter password cannot be empty");
    }

    if (this.state.pswd !== this.state.repswd) {
      errors.push("Passwords do not match!");
    }

    let emailParts = this.state.email.split("@");
    if (emailParts.length != 2) {
      errors.push("Invalid amount of @'s");
    } else {
      if (emailParts[1] != "illinois.edu") {
        errors.push("Have to have an illinois email to register with the app!");
      } else {
        this.state.username = emailParts[0];
      }
    }

    return errors;
  }

  render() {
    const { errors } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NonRegistered")}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />{" "}
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"always"}
          removeClippedSubviews={false}
        >
          <Text style={styles.full_header}>Create Account</Text>
          <View style={styles.errors}>
            {errors.map(error => (
              <Text key={error}>Error: {error}</Text>
            ))}
          </View>
          <Text style={styles.header}>Email</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Email"
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Text style={styles.header}>Password</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.pswd}
            onChangeText={pswd => this.setState({ pswd })}
          />
          <Text style={styles.header}>Re-enter Password</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            secureTextEntry={true}
            label="Re-Password"
            placeholder="Re-Password"
            value={this.state.repswd}
            onChangeText={repswd => this.setState({ repswd })}
          />
          <TouchableOpacity
            style={styles.login_btn}
            onPress={this.handleRegistration}
          >
            <Text style={styles.button_text}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15,
    marginBottom: 10
  },
  backButton: {
    paddingLeft: 20,
    marginRight: Dimensions.get("window").width - 220
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  arrow: {
    paddingTop: 15
  },
  wrapper: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "white"
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    marginTop: 0
  },
  inputBodyContainerStyle: {
    paddingBottom: 100,
    marginHorizontal: 20,
    marginTop: 0
  },
  full_header: {
    fontWeight: "500",
    fontSize: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  header: {
    fontWeight: "500",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  button_text: {
    color: "white",
    fontSize: 19,
    fontWeight: "600"
  },
  login_btn: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    paddingVertical: 17,
    marginTop: 30,
    marginLeft: 20
  }
});
