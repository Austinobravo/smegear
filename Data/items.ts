type ChapterItem = {
  id: number;
  name: string;
  isPublished: boolean;
  free: boolean;
  price?: number; 
};


 const Items: ChapterItem[] = [
  {
    id: 1,
    name: "Intro",
    isPublished: false,
    free: false,
    price:20000
  },
  {
    id: 2,
    name: "ChapterOne",
    isPublished: true,
    free: true,
     price:35000
  },
  {
    id: 3,
    name: "ChapterTwo",
    isPublished: false,
    free: false,
     price:50000
  },
  {
    id: 4,
    name: "Outro",
    isPublished: true,
    free: true,
      price:15000
  },
];

export default Items