import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";
import { createNoSubstitutionTemplateLiteral } from "typescript";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleSignEmail() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso!"))
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Email já cadastrado.");
        }
      });
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code);
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          Alert.alert("Usuário não encontrado. (e-mail ou senha incorreto)");
        }
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={handleSignEmail} />
      </Account>
    </Container>
  );
}
