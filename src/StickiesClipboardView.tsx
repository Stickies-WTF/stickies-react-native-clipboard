import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { StickiesClipboardViewProps } from './StickiesClipboard.types';

const NativeView: React.ComponentType<StickiesClipboardViewProps> =
  requireNativeViewManager('StickiesClipboard');

export default function StickiesClipboardView(props: StickiesClipboardViewProps) {
  return <NativeView {...props} />;
}
