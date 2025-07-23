type ChapterItem = {
  id: number;
  name: string;
  isPublished: boolean;
  free: boolean;
};


 const Items: ChapterItem[] = [
  {
    id: 1,
    name: "Intro",
    isPublished: false,
    free: false
  },
  {
    id: 2,
    name: "ChapterOne",
    isPublished: true,
    free: true
  },
  {
    id: 3,
    name: "ChapterTwo",
    isPublished: false,
    free: false
  },
  {
    id: 4,
    name: "Outro",
    isPublished: true,
    free: true
  },
];

export default Items