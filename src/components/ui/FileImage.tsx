/* eslint-disable jsx-a11y/alt-text */
import { FormData } from "@/app/HomePage";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

function FileImage({ imageUrl }: { imageUrl: string | ArrayBuffer }) {
  return (
    <Document style={{ width: "100%", height: "100%" }}>
      <Page size={"LEGAL"} wrap>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <>
              <Image
                key={index}
                //@ts-ignore
                src={imageUrl}
                style={{ height: "50%", width: "90%" }}
              />
            </>
          ))}
      </Page>
    </Document>
  );
}

export default FileImage;
