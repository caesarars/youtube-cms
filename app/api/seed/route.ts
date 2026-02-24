import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Short from '@/lib/models/Short';

const SAMPLE_DATA = [
  {
    title: 'What Ancient Egyptians ACTUALLY Ate for Breakfast',
    civilization: 'Egypt',
    status: 'Script Ready',
    scheduledDate: '2025-03-01',
    script: "Forget what you've seen in movies. Ancient Egyptians in 1300 BC started their day with something surprisingly simple. Bread — but not just any bread. It was thick, gritty, and often contained sand from the grinding stones, slowly wearing down their teeth over a lifetime. They paired it with beer — yes, beer for breakfast — but it was thick, low-alcohol, almost like liquid bread. Rich merchants added onions, garlic, and dried fish on the side. And honey? That was luxury, reserved for the wealthy. The same civilization that built the pyramids, fueled by bread and beer every single morning.",
    imagePrompts: "Scene 1 - Hook visual: Ancient Egyptian baker pulling bread from clay oven, 1300 BC, warm fire glow, cinematic close-up, photorealistic, ultra detailed, 8k, no modern elements\n\nScene 2 - Beer brewing: Ancient Egyptian workers brewing beer in large clay pots, Nile riverside, golden hour, cinematic wide shot, photorealistic, historically accurate, 8k\n\nScene 3 - Breakfast scene: Ancient Egyptian merchant eating morning meal, bread onions dried fish on wooden table, oil lamp lighting, mud brick interior, cinematic close-up, photorealistic\n\nScene 4 - Closing: Giza pyramids at sunrise, workers walking toward them, dramatic god rays, cinematic composition, photorealistic, 8k, historically accurate, 1300 BC",
  },
  {
    title: "A Roman Soldier's Daily Routine Was Brutal",
    civilization: 'Rome',
    status: 'Visual Ready',
    scheduledDate: '2025-03-08',
    script: "5 AM. No alarm needed. A Roman soldier's day began before sunrise, every single day, no exceptions. First — a 20-mile march in full armor, carrying 40 kilograms of equipment. Then training. Sword drills, shield formations, trench digging. All before lunch. Their meal? Mostly wheat porridge, hard biscuits, and cheap wine mixed with water. No days off. No weekends. Roman soldiers trained 365 days a year because their commanders believed an idle soldier was a dangerous soldier. The empire that conquered the known world was built on this brutal, unforgiving daily grind.",
    imagePrompts: "Scene 1 - Hook: Roman soldiers marching at dawn, full armor and equipment, dusty road, dramatic sunrise, cinematic wide shot, photorealistic, historically accurate, 8k\n\nScene 2 - Training: Roman soldiers sword training in military camp, wooden practice dummies, dust and sweat, cinematic action shot, photorealistic, ultra detailed\n\nScene 3 - Meal: Roman soldiers eating simple meal around campfire, wheat porridge wooden bowls, military camp background, warm fire glow, photorealistic, historically accurate\n\nScene 4 - Closing: Roman legion marching toward conquered city at sunset, epic cinematic composition, dramatic lighting, photorealistic, 8k, no modern elements",
  },
  {
    title: 'How Babylonians Told Time Without Clocks',
    civilization: 'Mesopotamia',
    status: 'Idea',
    scheduledDate: '2025-03-15',
    script: '',
    imagePrompts: '',
  },
  {
    title: 'The Real Smell of Ancient Rome',
    civilization: 'Rome',
    status: 'Idea',
    scheduledDate: '2025-03-22',
    script: '',
    imagePrompts: '',
  },
  {
    title: 'Why Persian Kings Bathed in Gold',
    civilization: 'Persia',
    status: 'Script Ready',
    scheduledDate: '2025-03-29',
    script: "The Persian King Darius I didn't just rule the largest empire in the ancient world — he lived like a god on earth. His daily bath wasn't in water alone. Servants mixed his bathwater with saffron, rose petals, and gold dust — believing it would transfer the power and permanence of gold into his skin. He ate meals served on solid gold plates, with over 15,000 people fed daily from his royal kitchen. His robe alone was worth more than most cities. But here's what's fascinating — Darius also built the world's first postal system, paved roads across 2,500 miles, and granted religious freedom to all conquered peoples. The most extravagant king in history was also one of its most progressive rulers.",
    imagePrompts: '',
  },
];

export async function POST() {
  try {
    await connectDB();
    const count = await Short.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Database already has data', count });
    }
    const shorts = await Short.insertMany(SAMPLE_DATA);
    return NextResponse.json({ message: 'Sample data seeded', count: shorts.length });
  } catch (error) {
    console.error('Failed to seed data:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
