import { Text, View, StyleSheet, Dimensions } from "react-native";

const WHITE = "rgb(176, 157, 144)";
const BLACK = "rgb(74, 67, 62)";

interface RowProps {
  row: number;
}
interface SquareProps extends RowProps {
  col: number;
}

const Row = ({ row }: RowProps) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {
        new Array(8).fill(0).map((_, col) => (
          <Square row={row} col={col} key={col} />
        ))
      }
    </View>
  )
}

const Square = ({ row, col }: SquareProps) => {
  const offset = row % 2 === 0 ? 1 : 0;
  const backgroundColor = (col + offset) % 2 === 0 ? BLACK : WHITE;
  const color = (col + offset) % 2 === 0 ? WHITE : BLACK;

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor, padding: 5 }}>
      <Text style={{ color: color, opacity: col === 0 ? 1 : 0 }}>
        {8 - row}
      </Text>
      <Text style={{ color: color, opacity: row === 7 ? 1 : 0, alignSelf: 'flex-end' }}>
        {String.fromCharCode("a".charCodeAt(0) + col)}
      </Text>
    </View>
  )
}

export default function Board() {
  return (
    <View style={styles.container}>
      {
        new Array(8).fill(0).map((_, row) => (
          <Row row={row} key={row} />
        ))
      }
    </View>
  )
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});