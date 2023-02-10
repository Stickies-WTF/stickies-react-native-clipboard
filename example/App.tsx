import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { copyAssetToClipboard } from "./asset";

import * as StickiesClipboard from "stickies-clipboard";

export default function App() {
  React.useEffect(() => {
    StickiesClipboard.addChangeListener((message) => {
      console.log("message from native", message.value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          copyAssetToClipboard({
            id: "123",
            extension: "gif",
            // url: "https://media0.giphy.com/media/F0JpfVt9bQGHV5XDaJ/giphy.gif?cid=790b7611c5fe2457326bd9b353e4d79b814fa50fd94bf2c1&rid=giphy.gif&ct=g",
            url: "https://stickies-cms-b354-staging.fly.dev/api/render/sticker.gif?stickerId=clcqv2fsi009te9fmr7xpfwbc&characterId=cl95n3m9p00w8e4fc0fm0gb9l&tokenId=7518",
          })
            .then(() => {
              console.log("Copied to clipboard");
            })
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
        }}
        title={StickiesClipboard.hello()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
