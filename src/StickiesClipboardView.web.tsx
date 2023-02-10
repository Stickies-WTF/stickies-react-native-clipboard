import * as React from 'react';

import { StickiesClipboardViewProps } from './StickiesClipboard.types';

export default function StickiesClipboardView(props: StickiesClipboardViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
