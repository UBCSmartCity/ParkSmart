import { Link } from "expo-router";
import {
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

//new installation
import { Avatar, Text, Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Avatar.Image
            source={{
              uri: "https://civil.ubc.ca/files/2021/08/Smart-City-Logo.png",
            }}
            size={72}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 3,
                },
              ]}
            >
              SmartCity
            </Title>
            <Caption style={styles.caption}>@UBCSmartCity</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="location-pin" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 18 }}>
            Vancouver, BC
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 18 }}>+1</Text>
        </View>

        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 18 }}>
            email@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <Link href="/editprofile" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.commandButton}>
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/favorites" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="favorite-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Favorites</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/mycar" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="directions-car" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>My Cars</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/payment" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="payment" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/language" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="language" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Language</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/support" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="support" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/settings" asChild>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Icon name="settings" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default profile;

// Styles used in page
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 15,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 15,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 26,
  },
  commandButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
});
