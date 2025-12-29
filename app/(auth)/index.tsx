import { Button } from "@/components/nativewindui/Button";
import { Text } from "@/components/nativewindui/Text";
import { Link } from "expo-router";
import {
  Modal,
  View,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as WebBrowser from "expo-web-browser";
import { signInWithGoogle } from "@/lib/google-auth";
import { Form, FormItem, FormSection } from "@/components/nativewindui/Form";
import { TextField } from "@/components/nativewindui/TextField";

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const [visible, setVisible] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  // Register states
  const [name, setName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");

  const { login, register, googleLogin } = useAuth();

  const handleAppleLogin = () => {
    // TODO
  };

  const onGoogleButtonPress = async () => {
    try {
      const userInfo = await signInWithGoogle();
      const idToken = userInfo.data?.idToken;
      if (idToken) {
        await handleGoogleLogin(idToken);
      } else {
        Alert.alert("Erro", "Não foi possível obter o Token do Google.");
      }
    } catch (error: any) {
      if (error.code !== "SIGN_IN_CANCELLED") {
        Alert.alert("Erro Google", "Falha na conexão com o Google.");
      }
    }
  };

  const handleGoogleLogin = async (token: string | undefined) => {
    if (!token) return;
    setIsAuth(true);
    try {
      await googleLogin(token);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao autenticar no Firebase com o Google.")
    } finally {
      setIsAuth(false);
    }
  };

  const performLogin = async () => {
    try {
      await login(email, pass);
    } catch (error) {
      Alert.alert("Erro", "Email ou senha incorretos");
      console.error(error);
    }
  };

  const performRegister = async () => {
    if (regPass !== regConfirmPass) {
      Alert.alert("Erro", "As senhas não conferem");
      return;
    }
    await register(email, regPass, name);
    Alert.alert("Sucesso", "Cadastro realizado com sucesso! (Simulado)");
    setShowRegisterModal(false);
  };

  const handleEmailLogin = () => {
    setVisible(false);
    setShowEmailModal(true);
  };

  const handleRegister = () => {
    setVisible(false);
    setShowRegisterModal(true);
  };

  return (
    <View className="p-safe flex-1 bg-background">
      <View className="mx-auto max-w-sm flex-1 justify-between p-2">
        <View className="pt-64">
          <Text variant={"largeTitle"} className="font-bold">
            Bem-vindo ao
          </Text>
          <Text variant={"largeTitle"} className="font-bold text-primary">
            Nerdz
          </Text>
        </View>
        <View className="gap-4">
          <Button size={"lg"} onPress={() => setVisible(true)}>
            <Text>Estou preparado</Text>
          </Button>
          <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => setVisible(false)}
          >
            <Pressable
              className="top-0 h-4/6 flex-1"
              onPress={() => setVisible(false)}
            ></Pressable>
            <View className="absolute bottom-0 h-2/6 w-full gap-4 rounded-t-2xl bg-card p-6">
              <Text variant={"title1"}>Continue com...</Text>
              <Button disabled variant="secondary" onPress={handleAppleLogin}>
                <Text>Apple</Text>
              </Button>
              <Button variant="secondary" onPress={onGoogleButtonPress}>
                <Text>Google</Text>
              </Button>
              <Button variant="secondary" onPress={handleEmailLogin}>
                <Text>Email</Text>
              </Button>
              <Button variant="plain" onPress={handleRegister}>
                <Text className="text-primary">Criar conta</Text>
              </Button>
            </View>
          </Modal>

          {/* Login Modal */}
          <Modal
            visible={showEmailModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowEmailModal(false)}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <Pressable
                className="flex-1"
                onPress={() => setShowEmailModal(false)}
              ></Pressable>
              <View className="bg-background w-full rounded-t-2xl p-6 gap-4 border-t border-border pb-10">
                <Text variant={"title1"}>Entrar com Email</Text>
                
                <Form>
                  <FormSection>
                    <FormItem>
                      <TextField
                        label="Email"
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </FormItem>
                    <FormItem>
                      <TextField
                        label="Senha"
                        placeholder="********"
                        value={pass}
                        onChangeText={setPass}
                        secureTextEntry
                      />
                    </FormItem>
                  </FormSection>
                </Form>

                <Button size="lg" onPress={performLogin}>
                  <Text>Entrar</Text>
                </Button>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          {/* Register Modal */}
          <Modal
            visible={showRegisterModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowRegisterModal(false)}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <Pressable
                className="flex-1"
                onPress={() => setShowRegisterModal(false)}
              ></Pressable>
              <View className="bg-background w-full h-3/4 rounded-t-2xl p-6 gap-4 border-t border-border">
                <View className="flex-row justify-between items-center mb-2">
                  <Text variant={"title1"}>Criar conta</Text>
                  <Button
                    variant="plain"
                    size="sm"
                    onPress={() => setShowRegisterModal(false)}
                  >
                    <Text className="text-primary">Cancelar</Text>
                  </Button>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                  <Form>
                    <FormSection>
                      <FormItem>
                        <TextField
                          label="Nome"
                          placeholder="Seu nome"
                          value={name}
                          onChangeText={setName}
                        />
                      </FormItem>
                      <FormItem>
                        <TextField
                          label="Email"
                          placeholder="seu@email.com"
                          value={email}
                          onChangeText={setEmail}
                          autoCapitalize="none"
                          keyboardType="email-address"
                        />
                      </FormItem>
                    </FormSection>

                    <FormSection>
                      <FormItem>
                        <TextField
                          label="Senha"
                          placeholder="Mínimo 8 caracteres"
                          value={regPass}
                          onChangeText={setRegPass}
                          secureTextEntry
                        />
                      </FormItem>
                      <FormItem>
                        <TextField
                          label="Confirmar"
                          placeholder="Repita a senha"
                          value={regConfirmPass}
                          onChangeText={setRegConfirmPass}
                          secureTextEntry
                        />
                      </FormItem>
                    </FormSection>

                    <View className="mt-4">
                      <Button size="lg" onPress={performRegister}>
                        <Text>Cadastrar</Text>
                      </Button>
                    </View>
                  </Form>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          <View className="flex-row items-center ">
            <Text variant={"caption2"} className="text-center">
              Ao continuar você concorda com os{" "}
              <Link href={"../"}>
                <Text variant={"caption2"} className="text-primary">
                  Termos de Serviço{" "}
                </Text>
              </Link>
              e com a{" "}
              <Link href={"../"}>
                <Text variant={"caption2"} className="text-primary">
                  Política de Privacidade
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
