// AA Prayers Data
export interface Prayer {
    id: string;
    title: string;
    content: string;
    attribution?: string;
}

export const prayers: Prayer[] = [
    {
        id: 'serenity',
        title: "Serenity Prayer",
        content: `God grant me the serenity to accept the things I cannot change,
Courage to change the things I can,
And wisdom to know the difference.`,
        attribution: "Reinhold Niebuhr"
    },
    {
        id: 'third-step',
        title: "Third Step Prayer",
        content: `God, I offer myself to Thee (to build with me and to do with me as Thou wilt).
Relieve me of the bondage of self, that I may better do Thy will.
Take away my difficulties, that victory over them may bear witness to those I would help of Thy Power, Thy Love, and Thy Way of life.
May I do Thy will always.`,
        attribution: "Alcoholics Anonymous, p. 63"
    },
    {
        id: 'seventh-step',
        title: "Seventh Step Prayer",
        content: `My Creator, I am now willing that You should have all of me, good and bad.
I pray that You now remove from me every single defect of character which stands in the way of my usefulness to You and my fellows.
Grant me strength, as I go out from here, to do Your bidding. Amen.`,
        attribution: "Alcoholics Anonymous, p. 76"
    },
    {
        id: 'st-francis',
        title: "St. Francis Prayer",
        content: `Lord, make me a channel of thy peace — that where there is hatred, I may bring love — that where there is wrong, I may bring the spirit of forgiveness — that where there is discord, I may bring harmony — that where there is error, I may bring truth — that where there is doubt, I may bring faith — that where there is despair, I may bring hope — that where there are shadows, I may bring light — that where there is sadness, I may bring joy.
Lord, grant that I may seek rather to comfort than to be comforted — to understand, than to be understood — to love, than to be loved.
For it is by self-forgetting that one finds. It is by forgiving that one is forgiven. It is by dying that one awakens to Eternal Life. Amen.`,
        attribution: "St. Francis of Assisi"
    },
    {
        id: 'resentment',
        title: "Resentment Prayer",
        content: `If you have a resentment you want to be free of, if you will pray for the person or the thing that you resent, you will be free. If you will ask in prayer for everything you want for yourself to be given to them, you will be free. Ask for their health, their prosperity, their happiness, and you will be free. Even when you don't really want it for them, and your prayers are only words and you don't mean it, go ahead and do it anyway. Do it every day for two weeks and indeed you will find you have come to mean it and to want it for them, and you will realize that where you used to feel bitterness and resentment and hatred, you now feel compassionate understanding and love.`,
        attribution: "Freedom from Bondage"
    }
];

export function getAllPrayers(): Prayer[] {
    return prayers;
}
