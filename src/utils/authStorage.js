import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accesstoken = await AsyncStorage.getItem(`${this.namespace}:accesstoken`);

    return accesstoken ? JSON.parse(accesstoken) : undefined;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:accesstoken`, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accesstoken`);
  }
}

export default AuthStorage;
