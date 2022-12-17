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
      let { data: allpronos_cuartos, error } = await supabaseClient
        .from("allpronos_finales")
        .select("*");
      setPronn(allpronos_cuartos);
    }

    cargaAllGruposPronos();
  }, []);

  const fecha = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  };

  return (
    <>
      <h1>Esto crea el Pe de efe</h1>
      <Modelo />
      {pronn ? (
        <PDFDownloadLink
          document={<ModeloPDF dattos={pronn} />}
          fileName="pollaoctavos.pdf"
        >
          <Button> Descargar </Button>
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

/* 
Es cargar los 6960datos y generar celda a celda el PDF. Lo hace 
*/
