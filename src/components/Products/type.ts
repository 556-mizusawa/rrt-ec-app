export type imageAreaProps = {
  images: [];
  setImages: (value: any) => void;
};

export type imagesProps = {
  delete: (id: string) => Promise<string>;
  id: string;
  path: string;
  key: string;
};
