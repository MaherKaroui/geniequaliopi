declare module "@turbodocx/html-to-docx" {
  interface DocumentOptions {
    table?: { row?: { cantSplit?: boolean } };
    footer?: boolean;
    pageNumber?: boolean;
    font?: string;
    fontSize?: number;
    margins?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    [key: string]: any;
  }

  export default function HTMLtoDOCX(
    htmlString: string,
    headerHTMLString?: string | null,
    documentOptions?: DocumentOptions,
    footerHTMLString?: string | null
  ): Promise<Blob | ArrayBuffer>;
}
