// lib/blogData.ts

export interface Post {
  id: number;
  title: string;
  category: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  content: string; // Full content for the detail page
}

export const blogData: Post[] = [
  {
    id: 1,
    title: 'The Ultimate Guide to Choosing the Right Brake Pads',
    category: 'Maintenance',
    image: '/images/home/news1.jpg',
    author: 'John Doe',
    date: 'August 25, 2024',
    excerpt: 'Learn the differences between ceramic, semi-metallic, and organic brake pads to make an informed decision for your vehicle.',
    content: `
      Choosing the right brake pads is crucial for your vehicle's safety and performance. This guide will walk you through the different types available on the market.
      <br/><br/>
      <h3 class="text-xl font-bold mb-2">Ceramic Brake Pads</h3>
      Ceramic pads are known for being quiet, producing less dust, and offering a consistent performance over a wide range of temperatures. They are an excellent choice for most daily drivers.
      <br/><br/>
      <h3 class="text-xl font-bold mb-2">Semi-Metallic Brake Pads</h3>
      These pads offer excellent heat transfer and are more durable than ceramic pads, making them ideal for performance driving and heavy-duty vehicles. However, they can be noisier and produce more dust.
    `
  },
  {
    id: 2,
    title: '5 Easy Ways to Boost Your Car\'s Engine Performance',
    category: 'Performance',
    image: '/images/home/news2.jpg',
    author: 'Jane Smith',
    date: 'August 22, 2024',
    excerpt: 'Unlock your car\'s true potential with these simple and effective performance-enhancing modifications and maintenance tips.',
    content: `
      Boosting your car's performance doesn't always require a complete engine overhaul. Here are five simple ways to get more power.
      <br/><br/>
      <strong>1. Cold Air Intake:</strong> Allows your engine to breathe cooler, denser air, which can increase horsepower.
      <br/>
      <strong>2. High-Flow Exhaust:</strong> Reduces backpressure, allowing exhaust gases to exit more freely.
    `
  },
  {
    id: 3,
    title: 'Aesthetics & Performance: Selecting the Perfect Wheels',
    category: 'Exterior',
    image: '/images/home/news3.jpg',
    author: 'Admin',
    date: 'August 20, 2024',
    excerpt: 'Wheels can dramatically change your car\'s look and handling. Here\'s what you need to know about size, material, and offset.',
    content: `Wheels are one of the most impactful upgrades for any car. They affect both aesthetics and performance. This guide covers the essentials of wheel selection.`
  },
  {
    id: 4,
    title: 'Lighting the Way: Headlight Upgrades for Better Safety',
    category: 'Lighting',
    image: '/images/home/news1.jpg',
    author: 'Alex Johnson',
    date: 'August 18, 2024',
    excerpt: 'From Halogen to LED to HID, upgrading your headlights can significantly improve nighttime visibility and safety.',
    content: `Proper lighting is a key safety feature. We compare Halogen, LED, and HID headlights to help you choose the best upgrade for your vehicle.`
  }
];