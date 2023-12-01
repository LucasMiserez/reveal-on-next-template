"use client"; // required for swr

import useSWR from "swr";
import parse, { Element } from "html-react-parser";
import Name from "@/slides/Name";
import Slide1 from "@/slides/Slide1";
import VericalSlide1 from "@/slides/VericalSlide1";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

const options = {
  replace: (domNode: any) => {
    if (domNode instanceof Element && domNode.attribs) {
      switch (domNode.tagName) {
        case "slide1":
          return <Slide1 />;
        case "name":
          return <Name></Name>;
        case "vertical1":
          return <VericalSlide1></VericalSlide1>;
      }
    }
  },
};

export default function PresentationContent({
  src,
  onLoaded,
}: {
  src: string;
  onLoaded: () => any;
}) {
  const { data, error, isLoading } = useSWR(src, fetcher, {
    onSuccess: () => onLoaded(),
  });

  if (isLoading)
    return (
      <div className="slides">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="slides">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );

  return <div className="slides">{data && parse(data, options)}</div>;
}
