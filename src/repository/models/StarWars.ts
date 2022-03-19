export interface NavigationButton {
  text: string;
  handlePress: () => void;
  index: number;
}
export interface CharacterRow {
  item: {
    name: string;
    height: string;
  };
  index: number;
}
