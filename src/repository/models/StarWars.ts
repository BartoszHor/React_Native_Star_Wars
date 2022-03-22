export interface NavigationButton {
  text: string;
  handlePress: () => void;
  characterButton?: boolean;
  characterIndex?: number;
  characterInFavorites?: boolean;
  disabled?: boolean;
  infoLoaded?: boolean;
  index: number;
}
export interface CharacterButton {
  text: string;
  handlePress: (index?: number) => void;
  characterButton: boolean;
  index: number;
  characterIndex: number;
  characterInFavorites: boolean;
  infoLoaded?: boolean;
  disabled?: boolean;
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
}

export interface HandleErrorProps {
  error: any;
  showAlert?: boolean;
  title?: string;
  buttons?: Array<IAlertButton>;
}
