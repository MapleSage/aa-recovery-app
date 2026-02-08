// Big Book Chapter Data
export interface BigBookChapter {
    id: string;
    number?: number;
    title: string;
    content: string;
    page?: number;
}

export const bigBookChapters: BigBookChapter[] = [
    {
        id: 'foreword',
        title: "Foreword to First Edition",
        content: `This is the Foreword to the First Edition of the book "Alcoholics Anonymous." We, of Alcoholics Anonymous, are more than one hundred men and women who have recovered from a seemingly hopeless state of mind and body. To show other alcoholics precisely how we have recovered is the main purpose of this book.`,
        page: 13
    },
    {
        id: 'doctors-opinion',
        title: "The Doctor's Opinion",
        content: `We of Alcoholics Anonymous believe that the reader will be interested in the medical estimate of the plan of recovery described in this book. Convincing testimony must surely come from medical men who have had experience with the sufferings of our members and have witnessed our return to health.`,
        page: 23
    },
    {
        id: 'chapter-1',
        number: 1,
        title: "Bill's Story",
        content: `War fever ran high in the New England town to which we new, young officers from Plattsburg were assigned, and we were flattered when the first citizens took us to their homes, making us feel heroic. Here was love, applause, war; moments sublime with intervals hilarious. I was part of life at last, and in the midst of the excitement I discovered liquor. I forgot the strong warnings and the prejudices of my people concerning drink.`,
        page: 1
    },
    {
        id: 'chapter-2',
        number: 2,
        title: "There Is A Solution",
        content: `We, of Alcoholics Anonymous, know thousands of men and women who were once just as hopeless as Bill. Nearly all have recovered. They have solved the drink problem.

We are average Americans. All sections of this country and many of its occupations are represented, as well as many political, economic, social, and religious backgrounds. We are people who normally would not mix. But there exists among us a fellowship, a friendliness, and an understanding which is indescribably wonderful.`,
        page: 17
    },
    {
        id: 'chapter-3',
        number: 3,
        title: "More About Alcoholism",
        content: `Most of us have been unwilling to admit we were real alcoholics. No person likes to think he is bodily and mentally different from his fellows. Therefore, it is not surprising that our drinking careers have been characterized by countless vain attempts to prove we could drink like other people. The idea that somehow, someday he will control and enjoy his drinking is the great obsession of every abnormal drinker.`,
        page: 30
    },
    {
        id: 'chapter-4',
        number: 4,
        title: "We Agnostics",
        content: `In the preceding chapters you have learned something of alcoholism. We hope we have made clear the distinction between the alcoholic and the non-alcoholic. If, when you honestly want to, you find you cannot quit entirely, or if when drinking, you have little control over the amount you take, you are probably alcoholic.`,
        page: 44
    },
    {
        id: 'chapter-5',
        number: 5,
        title: "How It Works",
        content: `Rarely have we seen a person fail who has thoroughly followed our path. Those who do not recover are people who cannot or will not completely give themselves to this simple program, usually men and women who are constitutionally incapable of being honest with themselves.

**The Twelve Steps**:

1. We admitted we were powerless over alcohol—that our lives had become unmanageable.
2. Came to believe that a Power greater than ourselves could restore us to sanity.
3. Made a decision to turn our will and our lives over to the care of God as we understood Him.
4. Made a searching and fearless moral inventory of ourselves.
5. Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.
6. Were entirely ready to have God remove all these defects of character.
7. Humbly asked Him to remove our shortcomings.
8. Made a list of all persons we had harmed, and became willing to make amends to them all.
9. Made direct amends to such people wherever possible, except when to do so would injure them or others.
10. Continued to take personal inventory and when we were wrong promptly admitted it.
11. Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.
12. Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs.`,
        page: 58
    },
    {
        id: 'chapter-6',
        number: 6,
        title: "Into Action",
        content: `Having made our personal inventory, what shall we do about it? We have been trying to get a new attitude, a new relationship with our Creator, and to discover the obstacles in our path. We have admitted certain defects; we have ascertained in a rough way what the trouble is; we have put our finger on the weak items in our personal inventory.`,
        page: 72
    },
    {
        id: 'chapter-7',
        number: 7,
        title: "Working With Others",
        content: `Practical experience shows that nothing will so much insure immunity from drinking as intensive work with other alcoholics. It works when other activities fail. This is our twelfth suggestion: Carry this message to other alcoholics! You can help when no one else can. You can secure their confidence when others fail.`,
        page: 89
    },
    {
        id: 'chapter-8',
        number: 8,
        title: "To Wives",
        content: `With few exceptions, our book thus far has spoken of men. But what we have said applies quite as much to women. Our activities in behalf of women who drink are on the increase. There is every evidence that women regain their health as readily as men if they try our suggestions.`,
        page: 104
    },
    {
        id: 'chapter-9',
        number: 9,
        title: "The Family Afterward",
        content: `Our women folk have suggested certain attitudes a wife may take with the husband who is recovering. Perhaps they created the impression that he is to be wrapped in cotton wool and placed on a pedestal. Successful readjustment means the opposite. All members of the family should meet upon the common ground of tolerance, understanding and love.`,
        page: 122
    },
    {
        id: 'chapter-10',
        number: 10,
        title: "To Employers",
        content: `Among many employers nowadays, we think of one member who has spent much of his life in the world of big business. He has hired and fired hundreds of men. He knows the alcoholic as the employer sees him. His present views ought to prove useful to business men everywhere.`,
        page: 136
    },
    {
        id: 'chapter-11',
        number: 11,
        title: "A Vision For You",
        content: `For most normal folks, drinking means conviviality, companionship and colorful imagination. It means release from care, boredom and worry. It is joyous intimacy with friends and a feeling that life is good. But not so with us in those last days of heavy drinking. The old pleasures were gone. They were but memories.`,
        page: 151
    }
];

export function getChapterById(id: string): BigBookChapter | undefined {
    return bigBookChapters.find(chapter => chapter.id === id);
}

export function getAllChapters(): BigBookChapter[] {
    return bigBookChapters;
}
