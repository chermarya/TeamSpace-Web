const data = {
    username: "login",
    tasks: 2056,
    friends: 25,
    doneProjects: 12,
    activeProjects: [
      { name: "TeamSpace", members: 12, join_at: "12 July 2024, 15:30", progress: 100, deadline: "12 September 2024" },
      { name: "TeamSpace", members: 12,join_at: "12 July 2024, 15:30", progress: 25, deadline: "12 September 2024" },
      { name: "TeamSpace", members: 12, join_at: "12 July 2024, 15:30", progress: 75, deadline: "12 September 2024" },
    ],
    colleagues: [
      { name: "Tony", project: "TeamSpace" },
      { name: "Kirill", project: "TeamSpace" },
      { name: "Momo", project: "TeamSpace" },
    ],
    requests: [
      { name: "TeamSpace",  status: "awaiting" },
      { name: "TeamSpace",  status: "declined" },
      { name: "TeamSpace", status: "accepted" },
    ],
    recentTasks: [
      { title: "Pre-loader and white space UI design", status: "Completed" },
      { title: "Pre-loader and white space UI design", status: "50%" },
    ],UserInfo: [
      { email: "email@gmail.com", phone: "+380111111111", status: "php-programmer" },
      { tasks_completed: "150", tasks_left: "30" },
    ],
    job: [
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
        { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
    ]  ,
    jobs: [
      { title: "Senior PHP Developer", category: "Php", company: "Google", location: "New York" },
      { title: "UI Designer", category: "Ui", company: "Microsoft", location: "Seattle" },
      { title: "C# Developer", category: "C#", company: "Amazon", location: "Austin" },
      { title: "Frontend Developer", category: "html/css", company: "Facebook", location: "San Francisco" },
      { title: "Project Manager", category: "Manager", company: "Apple", location: "Remote" },
    ]
  
  };
  const blogData = [
    {
      image: "image.png",
      title: "Opening Day Of Boating Season, Seattle WA",
      description: "Of course the Puget Sound is very watery...",
      author: "James",
      date: "August 18, 2022",
      avatar: "img_avatar_12.png",
    },
    {
      image: "image2.png",
      title: "How To Choose The Right Laptop For Programming",
      description: "Choosing the right laptop for programming can be a tough process...",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image3.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image4.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image2.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image3.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image4.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    },
    {
      image: "image.png",
      title: "How we built the first real self-driving car",
      description: "Electric self-driving cars will save millions of lives and significantly accelerate the world’s transition to sustainable energy, but only when",
      author: "Louis Hoebregts",
      date: "July 25, 2022",
      avatar: "img_avatar_01.png",
    }
  ];
  
  module.exports = { data, blogData };
  