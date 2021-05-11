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

export type productsProps = {
    key: string;
    size?: string;
    id: string;
    name: string;
    price: string;
    images: {
        path: string;
    }[];
};

export type setSizeProps = {
    sizes: [] | any;
    setSizes: (value: any) => void;
};
