export interface NavigationButton {
  text: string;
  handlePress: () => void;
  characterButton?: boolean;
  characterIndex?: number;
  index: number;
}
export interface CharacterButton {
  text: string;
  handlePress: (index?: number) => void;
  characterButton: boolean;
  index: number;
  characterIndex: number;
}

export interface NavigationButtonStore {
  text: string;
  handlePress: () => void;
}
export interface CharacterRow {
  name: string;
  height: string;
}
