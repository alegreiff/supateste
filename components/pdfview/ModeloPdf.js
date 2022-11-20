import { Box } from "@chakra-ui/react";
import React from "react";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
export const ModeloPDF = ({ dattos }) => {
  console.log({ dattos });
  if (dattos) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>fecha</Text>

            <Table data={dattos}>
              <TableHeader>
                <TableCell>Pollero</TableCell>
                <TableCell>#P</TableCell>
                <TableCell>LOC</TableCell>
                <TableCell>GL</TableCell>
                <TableCell>GV</TableCell>
                <TableCell>VIS</TableCell>
                <TableCell>COM</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell getContent={(r) => r.alias} />
                <DataTableCell getContent={(r) => r.p} />
                <DataTableCell getContent={(r) => r.loc} />
                <DataTableCell getContent={(r) => r.gl} />
                <DataTableCell getContent={(r) => r.gv} />
                <DataTableCell getContent={(r) => r.vis} />
                <DataTableCell getContent={(r) => r.com} />
              </TableBody>
            </Table>
          </View>
          {/* <View style={styles.section}>
          <Text>Section #2</Text>
        </View> */}
        </Page>
      </Document>
    );
  } else {
    return (
      <Document>
        <Page size="A4">
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
        </Page>
      </Document>
    );
  }
};
