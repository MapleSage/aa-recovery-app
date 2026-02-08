// Step content data from screenshots
export interface StepData {
    number: number;
    title: string;
    quote: string;
    type: 'tracker' | 'working' | 'prayer' | 'entries';
    content?: string;
    closingStatement?: string;
}

export const stepsData: StepData[] = [
    {
        number: 1,
        title: "Powerlessness",
        quote: "We admitted we were powerless over alcohol - that our lives had become unmanageable.",
        type: 'tracker',
        content: `If you are reading this right now of your own will, there is a good chance that you have already taken step 1. This step is made up of two separate parts. Let's explore both in a little detail.

**We admitted we were powerless over alcohol:** This part of step 1 tells me that I was powerless over alcohol. When I came to the fellowship and started going to many meetings, I was hearing stories from people which I could identify with. I was surprised by the fact that there were other people also, who were doing or had done the same things that I was doing or had done during my drinking days. It was a big relief to know that I was not alone, that I was in the company of people who were just like me and that they were presenting me with a solution. My powerlessness over alcohol was very simple to understand when I looked back and saw that once I had picked up the first drink, I could not stop drinking. I craved for more alcohol as the physical allergy mentioned in the Doctor's Opinion had kicked in. No sooner that I had admitted powerlessness over alcohol, I was able to accept the fact that I could not drink safely thereafter, ever in my life. I became willing to be a part of the solution presented to me by AA.

**That our lives had become unmanageable:** My life was quite unmanageable as far back as I can remember. But bear in mind that we all have different paths and that your life could have been manageable up until alcoholism had kicked in. The two parts of Step 1 are connected, but are not dependent upon each other. I say this out of experience. It was well over 2 years that I had put the drink down, but my life was still unmanageable. I was never at peace, always angry and agitated and not many people liked me. It was only after I truly started working the steps with a sponsor that my life started becoming manageable, one day at a time.

This is not a working step. This is a conclusion of the mind that you draw upon when you identify with other people in the rooms. It is also said that this is the only step that can be taken 100%. In other words, all of the remaining 11 steps can only be taken to the best of your ability. You need not worry about doing them perfectly.`,
        closingStatement: "Easy does it, but do it!"
    },
    {
        number: 2,
        title: "Came To Believe",
        quote: "Came to believe that a Power greater than ourselves could restore us to sanity.",
        type: 'working',
        content: `Step 2, just like step 1 is again a non-working step. Meaning, you need not do anything to actually have taken this step. This step again is a conclusion of your own mind that you draw when you keep identifying with people at meetings.

In order to take this step, you must be convinced that you are insane. And believe me, it was very hard for me to take this step until I heard someone share in the rooms saying 'insanity is doing the same thing over and over again and expecting a different result'. Everytime I picked up that first vital drink, I was expecting that I would not get drunk. I had probably repeated that experiment a thousand times and every time I did, it was nothing but an act of insanity. I also heard someone say 'everytime I got drunk, I did not get into trouble - but everytime I got into trouble, I was drunk' and I could definitely identify with that.

There was also a time when I was in the fellowship and I had a relapse after a sobriety period of 5 weeks. That in itself was an act of insanity because I knew I was an alcoholic and I was going to the meetings of my own free will. And one day, my mind convinced me that I had cracked the problem and I stopped going to meetings until I had a severe relapse which lasted 3 weeks. I always consider myself lucky that it only lasted 3 weeks as I've seen people who have not made it back, many of them have since been put six foot under.

A close friend of mine in the fellowship always shares his experience with me where in he woke up from a coma after liver failure and still would not believe that he was an alcoholic and continued to drink after that for another year. He came to believe later in his life and is now a member of good standing in the fellowship and the society in general.

I also had problems choosing a Power greater than myself in the beginning. So I used the rooms of the fellowship as my higher power and I went to a meeting almost everyday. Afterall, when you read the big book, it tells us precisely that we choose a higher power of our own understanding. This is a spiritual program, not a religious program. Do not let any prejudice let you walk away from it. It says in the Promises

'We will suddenly realize that God is doing for us what we could not do for ourselves.'

This promise is after Step 9 and believe it or not, when I was working step 9, that is when I realized one day, that a higher power was always present in my life and it was always guiding me. We all have different experiences and perhaps you might find your Power more sooner than others, or not. This is a program of action and as long as you keep working it, the promises will come true.`,
        closingStatement: "Religion is following the messenger. Spirituality is following the message!"
    },
    {
        number: 3,
        title: "The Higher Power",
        quote: "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
        type: 'prayer',
        content: `Step 3 is a working step, it is the most important decision that you will make **today**. I use the word **today** because this is a program for 24 hours and every single day I wake up, I make this decision and I live my life as a God of my own understanding would want me to.

You need not worry about making a perfect decision. All you need is willingness and you will see that the decision comes easily. Let's briefly understand what this step means. There are two important words in this step. **'Will'** & **'Lives'**. Our will means our thinking and our life means our actions. So in effect, we need to turn over our thinking and our actions over to a higher power.

As I've mentioned before, do not worry if you haven't understood or found your higher power. I was suggested that I should pray everyday and make this decision every morning and then try to follow it to the best of my ability. I've met old timers who say they do not understand their higher power but they still pray and it has worked for them.

My personal experience was that my conscience was my higher power and when in doubt, I kept asking my conscience to do the next right thing. The answers kept coming and I kept acting on them. As a cumulative effect of all those actions, my life today has become a lot better than it was even before I had started drinking. I was well into my 20s when I had started drinking. I took this step with my sponsor. He asked me to go down on my knees and he did the same. We both said a prayer and I was then done with this step.

A simple prayer is suggested in the AA Big Book which is as follows:

God, I offer myself to Thee - To build with me and to do with me as Thou wilt.
Relieve me of the bondage of self, that I may better do Thy will.
Take away my difficulties, that victory over them may bear witness
to those I would help of Thy Power, Thy Love, and Thy Way of life.
May I do Thy will always!

Then again, this is only a suggested prayer. God listens to the language of the heart. I remember saying a simple prayer on the first day of my recovery. It went like this 'Please help me God'.`,
        closingStatement: "God helps those who help themselves."
    },
    {
        number: 4,
        title: "Moral Inventory",
        quote: "Made a searching and fearless moral inventory of ourselves.",
        type: 'entries',
        content: `In order to live a peaceful and happy life, I was suggested that working steps 4-9 was very important as these are the recovery steps.

I won't be saying how to work this step as the instructions to work this step are all in the Big Book, but I will be sharing some of my experience with you.

Step 4 is the first time I had ever attempted to look at myself, especially my character defects. How resentments were driving me towards anger and eventually to a drink. How I was always gripped with fear, especially the unknown fears of my blackout drinkings. Where was I last night, what did I do, who did I hurt, going through my phone to see if I had called anyone or sent an inappropriate text. This step also made me look at my sex conduct.

Working this step taught me to look at my part in the horrible things that were happening to me and I found out that 9 out of 10 times, I had done something to someone before they had done something back to me. Then again, sometimes people had hurt me without me playing in part, in which case I had to accept that perhaps they were sick just like I was. Afterall, had I not been sick and had I not hurt people during my drinking days, most of the times unintentionally?

This step taught me to forgive. First & foremost, I started forgiving myself and then I started forgiving others. A lot later in my recovery, I also found out that I had to put in action in order to complete the act of forgiveness.

This step enhanced my prayers and a belief in my higher power. I finally understood that I was not a bad person, but I was sick. And provided I was willing to put in the footwork, there was a good chance that I would be able to be a better person, day at a time.

My sponsor suggested that I make an inventory of my entire life, even of the life before I had commenced my drinking. I found out that I was stealing stuff in my childhood many years before I had started drinking. Later on, I had to make amends for these things. But for now, if you are planning to work this step, make sure you put pen to paper. There is no need to impress anyone with a neat, printed inventory. The **Big Book page 65** shows a sample inventory. This is how I had taken it. I felt it was best to write down the names in the first column first and then fill out rest of the information. In effect, if I was writing down resentments, I started listing names, place or things I had resented from my childhood up until that point in time.`,
        closingStatement: "Make a beginning and keep going!"
    },
    {
        number: 5,
        title: "The Admission",
        quote: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
        type: 'working',
        content: `This step was perhaps was the biggest fear for me in recovery. Writing down the dirty, filthy things I had done in step 4 was one thing, but then sharing them with another human being in the fellowship was a whole different level.

I was suggested that if a self-appraisal was sufficient, I wouldn't ever have landed up in the rooms. I would have been able to look at my mistakes on a daily basis and would have rectified them there and then. I was also told that a man is only as sick as his secrets. Hence this step was necessary. I was also suggested that unless I had shared it with another human being, sharing with God was not complete because God works through people.

Thankfully, I had a great sponsor and when I came to this step, he had already shared a lot about his life with me, some of which was sensitive stuff. This is how we had built mutual trust. On the day of sharing my inventory with my sponsor, he told me that everything I would share with him would remain confidential and that it would go to the grave with him. He also said that as I was sharing my stuff with him, he would share back his identifications and that I would have to keep his stuff confidential as well.

As I started sharing my stuff, I got a little emotional about some of it and we took breaks. My sponsor comforted me and shared back his intense stuff. I eventually found out that I wasn't the only one who had some some crazy stupid secrets. It's okay said my sponsor. You are not that person anymore.

My experience with step 5 was that of freedom from my own prison. I was no longer being haunted and thereafter, I started talking a little bit more freely at meetings. Although I'm always pointed out by my sponsor that in chapter 5 it says **'our stories disclose in a general way'**. It means, I shouldn't be sharing very intense stuff at meetings, especially not the details. This can include figures, specifics, names, places etc. Like how much money I make every month or how much money I owed while drinking or how much I spent. Using the word *lot* would depict humility rather than using a precise figure like 'I spent a $600,000 in my drinking days'.`,
        closingStatement: "Peace is a journey of a thousand miles and it must be taken one step at a time!"
    },
    {
        number: 6,
        title: "Entirely Ready",
        quote: "Were entirely ready to have God remove all these defects of character.",
        type: 'prayer',
        content: `It says in the book 12 & 12 that this step separates the men from the boys. And it took me a little while to understand the meaning of this. A few years into sobriety and a few hundred meetings later I found out that putting the drink down and making progress in spiritual life were two separate things.

I had met a lot of people who kept going to meetings, perhaps 7 days a week but they were not working the program. They were miserable, angry and not good company. Then there were few who were only in a few months, they were working the program, making changes, accepting their life as is, were happy and were good company.

This is a program of change and putting down the drink is only the tip of the iceberg. If I did not work on my character defects, there was little chance that I would be able to stay sober for a long time.

The 12 & 12 mentions the seven deadly sins of **Pride, Greed, Lust, Anger, Gluttony, Envy & Sloth**. We can never be rid of these sins, but by being willing to have God remove them and then trying to get rid of them in step 7 was an important part of my recovery.

In essence, this step is being willing to have God remove our character defects we found in step 4. And if you aren't willing, then praying to your higher power for that willingness to come.`,
        closingStatement: "We are either working on our recovery or we're working on a relapse!"
    },
    {
        number: 7,
        title: "Humbly Asked",
        quote: "Humbly asked Him to remove our shortcomings.",
        type: 'working',
        content: `This step begins with the word **Humbly**. The word humble means to not think too much of myself. I'm not important, I'm not the centre of the universe. And if I ask my higher power to remove my shortcomings, there is a good chance that when these crop up, I'll be able to deal with them effectively. With practice, it gets easier everytime my character defects resurface.

As mentioned before the seven deadly sins are **Pride, Greed, Lust, Anger, Gluttony, Envy & Sloth**. What I personally do in my life is when I wake up every morning and say my step 3 prayer, I also say a step 7 prayer which is very simple and it goes like this. 'God, please help me deal with my character defects.' Every day, I will consciously choose 2 of the 7 deadly sins and be consciously aware of these. And as soon as they crop up, I will try to act in a new different and better way.

This is how I was able to get rid of a big chunk of my anger. I worked on my anger levels for one whole year. Everyday when things did not go my way, my anger levels would go up and I would start ranting and cribbing. Gradually I was able to check my anger and I was able to start acting in better and productive ways. Today, people who know me say they haven't seen my anger in a very long time and I'm grateful for that.

This however did not happen overnight. It is a program of a life time, it is a new way of living. If you are confused with the words character defects and shortcomings, they basically mean the same thing. Our founder Bill W was great at using the English language and he did not like to repeat himself. So you often find him using different words with the same meaning.`,
        closingStatement: "True humility is staying teachable, regardless of how much you know!"
    },
    {
        number: 8,
        title: "Amends List",
        quote: "Made a list of all persons we had harmed, and became willing to make amends to them all.",
        type: 'entries',
        content: `The entire essence of the 12 step program is spiritual progress and for this, we have to go back set set right our wrongs. If you have done your step 4 inventory properly, you will have a list of persons we have harmed. Step 8 is simply making a list of these persons and writing down the wrongs we have done towards them. This again is putting out of mind what they have done to us.

I had a very easy experience with step 8. I simply copied all the names over from my step 4. Some of the people on this list were no longer around, but I still had their names on the list. The step clear uses the word **all**. It doesn't say 'made a list of all persons to whom amends were possible.'

I guess I don't have much to share on this step, but there's quite a bit I'll share in the next step.`,
        closingStatement: "Be sure to taste your words before spitting them out!"
    },
    {
        number: 9,
        title: "Direct Amends",
        quote: "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
        type: 'working',
        content: `Step 9 in my experience was the most effective step in my recovery in deflating my ego and helping me become more humble. I wanted to take this step on the same day as I had come to the fellowship. I was used to apologizing after my drunken episodes anyway. But once I had put down the drink for good, my sponsor suggested that I work this step in the right numerical order, it was numbered 9 for a reason. I was told that having a bit of sobriety under my belt was good for me before I attempted to make any amends, as this meant that people would know I meant business.

I found out that asking my sponsor about every amend was very helpful. Some amends were harder than others, but every time I made an amend I experienced a little bit of more freedom. My grandfather was no longer around and I owed him amends from my days where I hadn't even picked up a drink. I was suggested that I write him an honest letter and then burn it off.

I had stolen books from a library in my childhood, but I could not go back to that library as the owner of that library would have then gone around hurting my family. My sponsor suggested I make a donation to a charity of my choosing. I did that and that episode from my childhood doesn't haunt me anymore.

I had stolen a book from a school friend and I didn't want to do that amend citing that it was 23 years ago and my friend wouldn't even remember about it. But my sponsor said that if it was playing on my head, I'd better had dealt with it. I called my friend up as we lived in different countries. I never mentioned anything about the AA program or my alcoholism, but just how I had stolen the book and that I wanted to make amends as I was now turning to a spiritual life. My friend received my amend well and I'm now in good standing with him.

There are a few people who I could not find, but today I stand in total willingness to make that amend should I ever bump into these people.

In the big book, right after this step it says **'We have entered the world of the spirit'**. I believe that upon the completion of this step, I was humble enough that my higher power, my conscience made direct contact with me telling me it was there, deep within me.`,
        closingStatement: "Let Go & Let GOD!"
    },
    {
        number: 10,
        title: "Daily Inventory",
        quote: "Continued to take personal inventory and when we were wrong promptly admitted it.",
        type: 'entries',
        content: `The last 3 steps are maintenance steps. If we aren't growing, we are dying. Hence, it is important to keep progressing and setting right any wrongs we might do, as we now live our day to day life in a spiritual world.

Step 10 suggests that we continue looking for our character defects vigorously and when these crop up, we immediately ask God to take them away. It asks us to constantly monitor for selfishness, dishonesty, resentment & fear.

I personally pray as soon as I find that a character defect has resurfaced and ask my higher power to deal with it. Sometimes I call my sponsor and share with him what has happened. Many times, just sharing with my sponsor makes me feel better. Many times he will share his experience with me and perhaps point out if I might be wrong without criticizing me.

By practicing this step for a few years, I have gradually learnt to deal with my everyday turmoils in a much better way, effectively and quickly. I always say that I don't have bad days any more. I only have bad hours. No matter what, I can always turn things around and still manage to do something good everyday.

I was told that I can start my 24 hours at any time of the day. The one thing I have to remember is that the step asks me to act **promptly** if I am wrong. Sometimes I cannot see if I'm wrong, nevertheless I'm disturbed. If so, I will still try to call my sponsor or another close friend in the fellowship and share what's happened. Afterall, our preamble uses the word **share**. It does not use the word **tell**. Today I try to share with people and try not to tell people. And 9 out of 10 times I will get my message across. And that one occasion when my message does not get across, I've learnt to bite my tongue.

I've had an experience several times where the staff at supermarkets have forgotten to bill an item or two. I will now always go back and pay for that unpaid item as I cannot live with myself being dishonest. I like to nip stuff in the bud and not let it grow into a big foul weed.

Lastly, our book also states that when everything else fails, work with another alcoholic will never fail. I always remember to call someone when I'm going through a bad phase on any day. Many times they might just say something that will turn my thinking around and I can then start living my next 24 hours from there.

This is my experience of step 10. I hope it has helped you. Let's move on to step 11.`,
        closingStatement: "Serenity comes when we trade expectations for acceptance!"
    },
    {
        number: 11,
        title: "Prayer & Meditation",
        quote: "Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.",
        type: 'entries',
        content: `This step suggests that we develop a regular practice of prayer and meditation. It emphasizes improving our conscious contact with our Higher Power.

Many people in the fellowship have shared that they start their day with a morning prayer and end it with an evening reflection. The step suggests praying only for knowledge of God's will and the power to carry it out, not for specific outcomes.

Various forms of meditation practiced in the fellowship include:
- Quiet sitting and listening
- Reading spiritual literature
- Mindful walking
- Gratitude lists

The key is finding what works for you and making it a daily practice.`,
        closingStatement: "Prayer is talking to God. Meditation is listening."
    },
    {
        number: 12,
        title: "Spiritual Awakening",
        quote: "Having had a spiritual awakening as the result of these Steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs.",
        type: 'working',
        content: `This step is the culmination of all the work done in the previous 11 steps. It speaks of a spiritual awakening - a profound change in perspective and way of living.

Carrying the message means sharing your experience, strength, and hope with others who are still suffering. This can take many forms:
- Sponsoring newcomers
- Sharing at meetings
- Doing service work
- Being available when someone reaches out

Practicing these principles in all our affairs means applying what we've learned to every aspect of our lives - work, family, relationships, and daily interactions.

The program teaches us that in order to keep what we have, we must give it away. Service to others is not just helpful to them - it's essential for our own continued sobriety and spiritual growth.`,
        closingStatement: "We can only keep what we have by giving it away!"
    }
];

export function getStepByNumber(num: number): StepData | undefined {
    return stepsData.find(step => step.number === num);
}
