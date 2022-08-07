export interface DialogOptions {
  visible: boolean;
  title: string;
  onOkPress?: () => void;
  onCancelPress?: () => void;
}
