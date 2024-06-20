import ImageViewer from '@/components/imageViewer';
import { theme } from '@/constants/theme';
import ImageService from '@/util/imageService';
import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, TextInput, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GenerateImage() {
  const [ prompt, setPrompt] = useState("");
  const [ image, setImage ] = useState("");
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
      <Text style={styles.title}>Transform Your Text into Images With <Text style={styles.titleHighlight}>PixelGenie</Text></Text>
      <View style={{ marginVertical: 10 }}>
        <TextInput
            style={styles.textInput}
            placeholder="Enter prompt..."
            multiline
            numberOfLines={2}
            value={prompt}
            onChangeText={setPrompt}
            placeholderTextColor={theme.colors.gray}
        />
        <Pressable style={styles.generateButton} onPress={() => handleImageGenerate()}>
           <Text style={styles.buttonText}>Generate Image</Text>
        </Pressable>
        <View style={{ marginTop: 20 }}>
          { 
            image && <ImageViewer imageUrl={image} imageHeight={'400'} imageWidth={'400'} />
          }
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
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: theme.colors.white,
    marginBottom: 20,
  },
  titleHighlight:{
    color: theme.colors.pink,
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
    alignSelf: "center"
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "bold"
  }
});
