import { Button } from "@chakra-ui/react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Modelo } from "../components/pdfview/Modelo";
import { ModeloPDF } from "../components/pdfview/ModeloPdf";

export default function PagePdf() {
  const [pronn, setPronn] = useState(null);
  useEffect(() => {
    async function cargaAllGruposPronos() {
      let { data: allpronos_grupos, error } = await supabaseClient
        .from("allpronos_grupos")
        .select("*");
      setPronn(allpronos_grupos);
    }

    cargaAllGruposPronos();
  }, []);

  return (
    <>
      <h1>Esto crea el Pe de efe</h1>
      <Modelo />
      {pronn ? (
        <PDFDownloadLink
          document={<ModeloPDF dattos={pronn} />}
          fileName="morla.pdf"
        >
          <Button> Descargámerickol </Button>
        </PDFDownloadLink>
      ) : (
        "null"
      )}
      {/* <PDFViewer style={{ width: "80%", height: "80vh" }}>
        <ModeloPDF />
      </PDFViewer> */}
    </>
  );
}
