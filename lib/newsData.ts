export interface Car {
  id: number;
  brand: string;
  model: string;
}

export interface Part {
  id: number;
  name: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
  carId: number;
  partId: number;
  content: string;
}

export const carsData: Car[] = [
  { id: 1, brand: 'BMW', model: '3 Series' },
  { id: 2, brand: 'BMW', model: 'X5' },
  { id: 3, brand: 'Mercedes-Benz', model: 'C-Class' },
  { id: 4, brand: 'Mercedes-Benz', model: 'GLE' },
  { id: 5, brand: 'Audi', model: 'A4' },
  { id: 6, brand: 'Audi', model: 'Q7' },
  { id: 7, brand: 'Ford', model: 'Mustang' },
  { id: 8, brand: 'Ford', model: 'F-150' },
  { id: 9, brand: 'Toyota', model: 'Camry' },
  { id: 10, brand: 'Toyota', model: 'RAV4' },
];

export const partsData: Part[] = [
  { id: 1, name: 'Brake Kits' },
  { id: 2, name: 'Suspension' },
  { id: 3, name: 'Exhaust Systems' },
  { id: 4, name: 'Headlights' },
  { id: 5, name: 'Wheels & Rims' },
  { id: 6, name: 'Air Intake' },
  { id: 7, name: 'Turbochargers' },
  { id: 8, name: 'Body Kits' },
  { id: 9, name: 'Interior Consoles' },
  { id: 10, name: 'ECU Tuning' },
];

export const newsData: NewsArticle[] = [
  { id: 1, title: 'New Performance Brake Kit for BMW 3 Series', image: '/images/home/news1.jpg', excerpt: 'Upgrade your stopping power with this new kit.', author: 'Admin', date: 'Sep 01, 2024', carId: 1, partId: 1, content: 'Detailed content about the new brake kit for the BMW 3 Series goes here.' },
  { id: 2, title: 'Lowering Springs for the Mercedes C-Class: A Review', image: '/images/home/news2.jpg', excerpt: 'Get the perfect stance with these suspension upgrades.', author: 'Admin', date: 'Sep 02, 2024', carId: 3, partId: 2, content: 'In-depth review of lowering springs for the C-Class.' },
  { id: 3, title: 'Audi A4 Gets a Roaring Titanium Exhaust System', image: '/images/home/news3.jpg', excerpt: 'Unleash the sound of your Audi with this new exhaust.', author: 'Admin', date: 'Sep 03, 2024', carId: 5, partId: 3, content: 'Everything you need to know about the new titanium exhaust for the A4.' },
  { id: 4, title: 'Upgrading the BMW X5 Headlights to Laser Tech', image: '/images/home/news1.jpg', excerpt: 'See better at night with the latest in lighting technology.', author: 'Admin', date: 'Sep 04, 2024', carId: 2, partId: 4, content: 'A guide on upgrading your X5 headlights.' },
  { id: 5, title: 'Ford Mustang: Top 5 Forged Wheels for 2024', image: '/images/home/news2.jpg', excerpt: 'Transform the look of your Mustang with these wheels.', author: 'Admin', date: 'Sep 05, 2024', carId: 7, partId: 5, content: 'A roundup of the best forged wheels for the Ford Mustang.' },
  { id: 6, title: 'Toyota Camry Cold Air Intake Installation Guide', image: '/images/home/news3.jpg', excerpt: 'Boost horsepower with this simple DIY modification.', author: 'Admin', date: 'Sep 06, 2024', carId: 9, partId: 6, content: 'Step-by-step guide to installing a cold air intake on your Camry.' },
  { id: 7, title: 'Mercedes GLE: Is an ECU Tune Worth It?', image: '/images/home/news1.jpg', excerpt: 'Exploring the pros and cons of tuning your luxury SUV.', author: 'Admin', date: 'Sep 07, 2024', carId: 4, partId: 10, content: 'A deep dive into ECU tuning for the Mercedes GLE.' },
  { id: 8, title: 'Widebody Kit for the Audi Q7 Now Available', image: '/images/home/news2.jpg', excerpt: 'Give your Q7 an aggressive new look with this body kit.', author: 'Admin', date: 'Sep 08, 2024', carId: 6, partId: 8, content: 'Details about the new widebody kit for the Audi Q7.' },
];