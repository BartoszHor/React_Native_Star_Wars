export interface NavigationButton {
  text: string;
  handlePress: () => void;
  characterButton?: boolean;
  characterIndex?: number;
  characterInFavorites?: boolean;
  index: number;
}
export interface CharacterButton {
  text: string;
  handlePress: (index?: number) => void;
  characterButton: boolean;
  index: number;
  characterIndex: number;
  characterInFavorites: boolean;
}

export interface NavigationButtonStore {
  text: string;
  handlePress: () => void;
}
export interface CharacterRow {
  name: string;
  height: string;
}

//Alerts
export interface IAlertButton {
  text: string;
  onPress: () => void;
  buttonType: string;
}
export interface Alert {
  title?: string;
  text?: string;
  buttons: Array<IAlertButton>;
  paddingBottom?: number;
  onCloseButtonClick?: () => void;
}

export interface HandleErrorProps {
  error: any;
  showAlert?: boolean;
  title?: string;
  buttons?: Array<IAlertButton>;
  onCloseButtonClick?: () => void;
}

export interface HandleAlertProps {
  title?: string;
  text?: string;
  buttons?: Array<IAlertButton>;
  onCloseButtonClick?: () => void;
}
