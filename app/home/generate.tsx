import ImageViewer from '@/components/imageViewer';
import { theme } from '@/constants/theme';
import ImageService from '@/util/imageService';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, TextInput, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GenerateImage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 30;

  const handleImageGenerate = async () => {
    const imageResponse = await ImageService(prompt);
    console.log("imageResponse", imageResponse)
    setImage(imageResponse);
  }

  return (
    <View style={[styles.container, { marginTop }]}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.background}
        barStyle={"light-content"}
      />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme.colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>GenerateImage</Text>
        <View></View>
      </View>
      <Text style={styles.title}>Transform Your Text into Images With <Text style={styles.titleHighlight}>PixelGenie</Text></Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter prompt..."
          multiline
          numberOfLines={2}
          value={prompt}
          onChangeText={setPrompt}
          placeholderTextColor={theme.colors.gray}
        />
        <Pressable style={styles.generateButton} onPress={handleImageGenerate}>
          <Text style={styles.buttonText}>Generate Image</Text>
        </Pressable>
        <View style={styles.imageContainer}>
          {image && <ImageViewer imageUrl={image} imageHeight={'400'} imageWidth={'400'} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingTop: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  headerTitle: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: 18,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: theme.colors.white,
    marginBottom: 20,
  },
  titleHighlight: {
    color: theme.colors.pink,
  },
  inputContainer: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: theme.colors.white,
    fontSize: 18,
    borderRadius: 30,
  },
  generateButton: {
    backgroundColor: theme.colors.pink,
    padding: 20,
    marginVertical: 20,
    borderRadius: 20,
    width: "40%",
    alignSelf: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    marginTop: 20,
  },
});