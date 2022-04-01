import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { data } from "./mocks/data";

const App = () => {
  const [altura, setAltura] = useState();
  const [largura, setLargura] = useState();
  const [fck, setFck] = useState();
  const [mk, setMk] = useState();

  const round = (value, precision) => {
    var rounded = Math.pow(10, precision || 0);
    return Math.round(value * rounded) / rounded;
  };

  const calculo = () => {
    const Msd = mk * 1.4;
    const d = altura * 100 - 3 - 0.5 - 1 / 2;
    const fcd = fck / 10 / 1.4;
    const Kmd = Msd / (largura * 100 * d ** 2 * fcd);
    const Kx1 = 1 - (2 * Kmd) / 0.85;
    const Kx = (1 - Kx1 ** (1 / 2)) / 0.8;
    const Kz = 1 - 0.5 * 0.8 * Kx;
    const As = (Msd / (Kz * d * 4348)) * 100;
    Alert.alert(
      "A área do aço correspondente a essa viga é: ",
      `${round(As, 2)} cm²`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.View}>
        <Text>Insira a altura da viga (h): {data[0]} </Text>
        <TextInput
          onChangeText={setAltura}
          style={styles.input}
          placeholder="Insira a altura em metros (m)..."
        />
      </View>
      <View style={styles.View}>
        <Text>Insira a largura da viga (bw):</Text>
        <TextInput
          onChangeText={setLargura}
          style={styles.input}
          placeholder="Insira a largura em metros (m)..."
        />
      </View>
      <View style={styles.View}>
        <Text>Insira a resistência característica do concreto (fck):</Text>
        <TextInput
          onChangeText={setFck}
          style={styles.input}
          placeholder="Insira o Fck em MPa..."
        />
      </View>
      <View style={styles.View}>
        <Text>Insira o momento máximo da flexão (Mk):</Text>
        <TextInput
          onChangeText={setMk}
          style={styles.input}
          placeholder="Insira o Mk em kN/cm..."
        />
      </View>
      <TouchableOpacity style={styles.btnCalcular} onPress={() => calculo()}>
        <Text style={styles.text}>Clique aqui para calcular a viga!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  View: {
    paddingBottom: 10,
  },
  btnCalcular: {
    backgroundColor: "black",
    width: "80%",
    height: 40,
    borderRadius: 10,
    paddingTop: 5,
  },
});

export default App;
