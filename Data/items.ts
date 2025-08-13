const Items = [
  {
    Title: "Comprehensive Guide to NAFDAC and SON Registration in Nigeria",
    id: "1e087f46-321b-4fee-a2ed-6afb7da2f624",
    OverView:
      "This course provides a comprehensive overview of the registration processes with NAFDAC and SON in Nigeria, including requirements, procedures, and best practices.",
    Modules: [
      {
        id: 1,
        ModuleTitle: "Introduction to NAFDAC and SON",
        name: "Module 1",

        lessons: [
          { id: "1.1", title: "Lesson 1.1: What is NAFDAC?" },
          { id: "1.2", title: "Lesson 1.2: What is SON?" },
        ],
      },
      {
        id: 2,
        ModuleTitle: "NAFDAC Product Registration Process",
        name: "Module 2",

        lessons: [
          {
            id: "1.1",
            title: "Lesson 2.1: Overview of NAFDAC Registration Process",
          },
          {
            id: "1.2",
            title: "Lesson 2.2: Requirements for NAFDAC Registration",
          },
        ],
      },
    ],
    isPublished: true,
    free: false,
    price: 45500,
  },
  {
    Title: "Comprehensive Guide to Exploration and Mining Licenses in Nigeria",
    id: "1e087f46-321b-4fee-a2ed-6afb7da2f624",
    OverView:
      "This course is designed for business consultants, entrepreneurs, and professionals interested in the mining sector of Nigeria. It provides an in-depth understanding of the Exploration License and the Mining License, two critical permits required for exploration and mining operations in Nigeria.",
    Modules: [
      {
        id: 1,
        ModuleTitle: "Introduction to Nigeria’s Mining Industry",
        name: "Module 1",

        lessons: [
          {
            id: "1.1",
            title: "Lesson 1.1: Overview of Nigeria’s Mining Industry",
          },
        ],
      },
      {
        id: 2,
        ModuleTitle: "Exploration License in Nigeria",
        name: "Module 2",

        lessons: [
          { id: "2.1", title: "Lesson 2.1: What is an Exploration License?" },
          {
            id: "2.2",
            title: "Lesson 2.2: How to Obtain an Exploration License",
          },
          { id: "2.3", title: "Lesson 2.3: Duration and Renewals" },
        ],
      },
    ],
    isPublished: false,
    free: false,
    price: 20000,
  },
];

export default Items;
