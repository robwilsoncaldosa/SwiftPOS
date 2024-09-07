"use client";
import dynamic from "next/dynamic";
import { useHandleLibrary,WelcomeScreen } from "@excalidraw/excalidraw";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false, 
    },
)

import { ExcalidrawImperativeAPI, } from "@excalidraw/excalidraw/types/types";
import { ChevronLeftCircle, Printer } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";

const ExcalidrawWrapper: React.FC = () => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  useHandleLibrary({ excalidrawAPI });
  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }
    const fetchdata = async () => {
      const res = await fetch("/SWIFT-TEMPLATE.excalidrawlib");
      const library = await res.json();
      excalidrawAPI?.updateLibrary(library);
      //   excalidrawAPI?.updateScene({elements: convertToExcalidrawElements(library.libraryItems[0].elements)});
    }; 

    fetchdata();
  }, [excalidrawAPI]);

  const renderTopRightUI = () => {
    return (
        <>
      <Button size={"sm"}
    //   className="bg-[#ececf4] dark:bg-[#232329] dark:text-[#E3E3E8] text-[#1b1b1f] text-[12px] hover:bg-[#f1f0ff] "
        className="bg-[#ececf4]   text-[#1b1b1f] text-[12px] hover:bg-[#f1f0ff] "
        asChild>
        <Link href={'/dashboard'} className="!no-underline !text-[#1b1b1f] "   > 
        <ChevronLeftCircle className="h-4 w-4 mr-2" />
        Go Back</Link></Button>  
      <Button
        size={"sm"}
        className="bg-[#ececf4]   text-[#1b1b1f] text-[12px] hover:bg-[#f1f0ff] "
        onClick={() => {
            window.print();
        }}
        >
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
      
          </>
    );
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={renderTopRightUI}
      >
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Heading>
                <h1 >📝 Guides </h1>
                <br/ >
                <br/ >
              <ol>
                <li className="flex justify-start m-1">
                  Step 1:  &nbsp;📚 Click the <strong>&nbsp; Library &nbsp;</strong> to insert a
                  template and input the required data.
                </li>
                <br/ >

                <li className="flex justify-start m-1">
                  Step 2: 🖼️ Click the <strong>&nbsp; Image &nbsp;</strong> from the toolbar
                  above to insert an image.
                </li>
                <br/ >

                <li className="flex justify-start m-1">
                  Step 3: 📋 Use <strong>&nbsp; CTRL + D &nbsp;</strong> to duplicate both the
                  image and template.

                </li>
                <br/ >

                <li className="flex justify-start m-1">
                  Step 4: 🖨️ Click <strong>&nbsp; Print &nbsp;</strong> to finalize your
                  document.
                </li>
              </ol>

            </WelcomeScreen.Center.Heading>
          </WelcomeScreen.Center>
          <WelcomeScreen.Hints.ToolbarHint></WelcomeScreen.Hints.ToolbarHint>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};
export default ExcalidrawWrapper;
