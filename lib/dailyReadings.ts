// Daily Reading Data
export interface DailyReading {
    month: number;
    day: number;
    title: string;
    thought: string;
    reflection: string;
    prayer?: string;
}

// Sample daily readings (you would have 365 entries in production)
export const dailyReadings: DailyReading[] = [
    {
        month: 1,
        day: 1,
        title: "A New Beginning",
        thought: "And acceptance is the answer to all my problems today.",
        reflection: `When I am disturbed, it is because I find some person, place, thing or situation — some fact of my life — unacceptable to me, and I can find no serenity until I accept that person, place, thing, or situation as being exactly the way it is supposed to be at this moment.

Nothing, absolutely nothing happens in God's world by mistake. Until I could accept my alcoholism, I could not stay sober; unless I accept life completely on life's terms, I cannot be happy. I need to concentrate not so much on what needs to be changed in the world as on what needs to be changed in me and in my attitudes.`,
        prayer: "For today, help me remember that acceptance is the foundation of my serenity."
    },
    {
        month: 1,
        day: 2,
        title: "Unity",
        thought: "Our common welfare should come first; personal recovery depends upon A.A. unity.",
        reflection: `The unity of Alcoholics Anonymous is the most cherished quality our Society has. Our lives, the lives of all to come, depend squarely upon it. We stay whole, or A.A. dies.

Without unity, the heart of A.A. would cease to beat; our world arteries would no longer carry the life-giving grace of God; His gift to us would be spent aimlessly.`,
        prayer: "Today, I will work to maintain unity in my recovery and with my fellows."
    },
    {
        month: 1,
        day: 3,
        title: "Gratitude",
        thought: "My gratitude speaks when I care and when I share with others the A.A. way of life.",
        reflection: `Walk cheerfully over the world, answering that of God in everyone. Our book of Alcoholics Anonymous tells us that we are to practice these principles in all our affairs.

It is when I practice gratitude, not just at meetings but in all my affairs, that I keep what I have been given. As I go through my day, I can share my gratitude with others through my actions, my words, and my presence.`,
        prayer: "Let me show my gratitude through action today."
    }
];

export function getReadingForDate(month: number, day: number): DailyReading | undefined {
    return dailyReadings.find(r => r.month === month && r.day === day);
}

export function getTodaysReading(): DailyReading {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return getReadingForDate(month, day) || dailyReadings[0];
}
