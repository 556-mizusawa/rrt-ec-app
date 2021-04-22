export type imagesProps = {
  delete: (id: string) => Promise<string>;
  id: string;
  path: string;
  key: string;
};
