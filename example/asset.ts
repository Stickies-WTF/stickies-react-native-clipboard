import * as FileSystem from "expo-file-system";
import * as StickiesClipboard from "stickies-clipboard";

export interface Asset {
  id: string;
  url: string;
  /**
   * The file extension to save this file as, set as null if you are sure saving and accessing it
   * without an extension is fine in react native. GIF's can not be null. They will not render
   * correctly or be copied / shared correctly
   */
  extension: string | null;
}

// Do these as part of the offline work
// TODO: Don't do these async tasks if they're already running. Just return the same promise
// TODO: Limit number of images we save at a time
// TODO: Clear out images we don't have anymore? probably done somewhere else
// TODO: Retry if failed? Just on mount? Way of calling again somehow?

const assetDir = `${FileSystem.cacheDirectory ?? ""}assets/`;

/**
 * Where possible we want to use the actual file extension, this really helps with some issues like
 * GIFs. Some file formats are fine without such as static images. But definitely best to include
 * anyways
 */
export const assetFileUri = (id: string, fileExtension: string | null) => {
  const fileName = `${id}${fileExtension ? `.${fileExtension}` : ""}`;

  return `${assetDir}${fileName}`;
};

// Checks if gif directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(assetDir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(assetDir, { intermediates: true });
  }
}

// Returns URI to our local gif file
// If our gif doesn't exist locally, it downloads it
export async function getAssetUri({
  id,
  url,
  extension,
}: Asset): Promise<string> {
  await ensureDirExists();

  const fileUri = assetFileUri(id, extension);

  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    await FileSystem.downloadAsync(url, fileUri);
  }

  return fileUri;
}

export async function saveAsset(asset: Asset): Promise<void> {
  await getAssetUri(asset);
}

// Deletes whole gif directory with all its content
export async function deleteAllAssets() {
  await ensureDirExists();
  await FileSystem.deleteAsync(assetDir);
}

export async function getAssetBase64(asset: Asset): Promise<string> {
  const uri = await getAssetUri(asset);

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  return base64;
}

// TODO: This doesn't work fully, do we need to resort to a native module?
export async function copyAssetToClipboard(asset: Asset): Promise<void> {
  const uri = await getAssetUri(asset);

  console.log("uri", uri);

  await StickiesClipboard.setValueAsync(uri);
}
