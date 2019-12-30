// Global JSON object to store prompts

const prompts = {
        "StoneAge1": {
            "Prompt": "On a stormy day, the gods bestowed upon us a flash in the sky. A bright living orange-yellow" +
                " substance seems to be consuming nearby trees.\n 1) Try to reason with to the orange.\n 2) Sacrifice" +
                " a rabbit to the orange.\n\n",
            "Choice1": {
                "Food": -3,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0,
                "Result" : "As you try to explain the meaning of life to the orange blur, a slight breeze comes in" +
                    ", and the orange vanishes. You lose 3 pieces of food in the process and are sad boi.\n\n"
            },
            "Choice2": {
                "Food": 10,
                "Security": 0,
                "Population": 50,
                "Military": 0,
                "Science": 0,
                "Result" : "You throw the rabbit at the orange, and you notice the rabbit begins to cook! You decide" +
                    " to name this orange 'fire,' and you introduce into into your community as a way to cook food. You gain" +
                    " 10 pieces of food and 50 population.\n\n"
            },
            "NextPrompt": "StoneAge2"
        },
        "StoneAge2": {
            "Prompt": "While being bored skipping stones one day, someone discovered that a hard hit to a fish might" +
                " stun them long enough to grab and take to the community.\n 1) Encourage friends to hunt more fish.\n" +
                "2) use this knowledge to hunt other small mammals.\n",
            "Choice1": {
                "Food": 5,
                "Security": 0,
                "Population": 100,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 10,
                "Security": 0,
                "Population": 100,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "StoneAge3"
        },
        "StoneAge3": {
            "Prompt": "A group of cave man came to your community to seek shelter. They said that their shelter are" +
                " stomped down by a T-rex.\n" +
                "1) Welcome them with food, water and shelter\n" +
                "2) Cook caveman, yum yum yum.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 100,
                "Military": 30,
                "Science": 0
            },
            "Choice2": {
                "Food": 5,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 10
            },
            "NextPrompt": "StoneAge4"
        },
        "StoneAge4": {
            "Prompt": "A large T-rex stomped into your community and destroyed many dwellings.\n" +
                "1) Fight the T-Rex and try to kill it.\n" +
                "2) Try to befriend the T-Rex, he looks like a good boy!\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -100,
                "Military": -10,
                "Science": 50
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": -200,
                "Military": 20,
                "Science": 0
            },
            "NextPrompt": "StoneAge5"
        },
        "StoneAge5": {
            "Prompt": "The temperature drops quickly and the world turns to winter in one night.\n" +
                "1) Stay in the current community for the winter with abundant resources.\n" +
                "2) Abandon the community and move somewhere else warmer.\n",
            "Choice1": {
                "Food": -5,
                "Security": 0,
                "Population": 100,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": -3,
                "Security": 0,
                "Population": -100,
                "Military": 0,
                "Science": 20
            },
            "NextPrompt": "StoneAge6"
        },
        "StoneAge6": {
            "Prompt": "You’ve spotted a curious creature prowling around, but it seems kinda big.\n" +
                "1) Run up to it and whack it with your club!\n" +
                "2) Maybe best to leave this one alone...\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -50,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 15
            },
            "NextPrompt": "MetalAge1"
        },
        "MetalAge1": {
            "Prompt": "Iron has been discovered! This metal has many different uses, but you should prioritize one first.\n" +
                "1) Start by making better weapons to defend your community.\n" +
                "2) Start by making farming tools to harvest crops.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 30,
                "Science": 0
            },
            "Choice2": {
                "Food": 10,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 20
            },
            "NextPrompt": "MetalAge2"
        },
        "MetalAge2": {
            "Prompt": "Some civilization members have discovered the effects of alchemy! Unfortunately, their experiments are introducing poisonous chemicals into the nearby river.\n" +
                "1) Support their studies and let them continue their experiments.\n" +
                "2) Put and end to the studies and keep the drinking water clean.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -100,
                "Military": 0,
                "Science": 20
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "MetalAge3"
        },
        "MetalAge3": {
            "Prompt": "A new king needs to be given control of the throne, but two different people have equal claim to the throne.\n" +
                "1) Choose the king who will focus on building the strongest nation.\n" +
                "2) Choose the king who will focus on protecting his own people.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 35,
                "Science": 15
            },
            "Choice2": {
                "Food": 10,
                "Security": 0,
                "Population": 150,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "MetalAge4"
        },
        "MetalAge4": {
            "Prompt": "Jousting tournaments have started becoming popular and are drawing more people into your civilization, but all of your good fighting men are focusing on jousting instead of actual protection!\n" +
                "1) Halt the jousting tournaments until you have enough knights for both.\n" +
                "2) Give full support to jousting and grow your community.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 20,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 100,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "MetalAge5"
        },
        "MetalAge5": {
            "Prompt": "A supposed “witch” has revealed herself to your civilization and claims to have the power to cure any disease.\n" +
                "1) She’s telling the truth - let her cure the sick.\n" +
                "2) She’s full of shit - magic doesn’t exist.\n",
            "Choice1": {
                "Food": 0,
                "Security": -1,
                "Population": 0,
                "Military": 0,
                "Science": -15
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": -50,
                "Military": 0,
                "Science": 25
            },
            "NextPrompt": "MetalAge6"
        },
        "MetalAge6": {
            "Prompt": "The den of the last dragons alive has been discovered!\n" +
                "1) Send in all of your best knights to kill the dragons before they hurt any more people.\n" +
                "2) Quietly observe the dragons and possibly learn aviation from them.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": -15,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": -150,
                "Military": 0,
                "Science": 40
            },
            "NextPrompt": "ConqueringAge1"
        },
        "ConqueringAge1": {
            "Prompt": "A carpenter in our town claims he has the ability to make massive wood structures.\n" +
                "1) Build a ship!\n" +
                "2) Build a wooden statue to praise the goddess of wisdom!\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 20,
                "Science": 15
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 150,
                "Military": 0,
                "Science": 10
            },
            "NextPrompt": "ConqueringAge2"
        },
        "ConqueringAge2": {
            "Prompt": "We discovered a kingdom that we never learned about before! Fortunately, they speak the same language as we do.\n" +
                "1) Want to trade?\n" +
                "2) To Waarrrrrrr!\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 200,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": -5,
                "Security": 0,
                "Population": -100,
                "Military": -20,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge3"
        },
        "ConqueringAge3": {
            "Prompt": "A wacky scientist believes the world is round, how crazy is that?\n" +
                "1) Endorse him just for the heck of it.\n" +
                "2) Kick him out and let another nation deal with him. \n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 30
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": -10,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge4"
        },
        "ConqueringAge4": {
            "Prompt": "Our ship is being attacked by a huge toad in the ocean!\n" +
                "1) Finally, a worthy opponent...\n" +
                "2) Prepare for evacuation!\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -200,
                "Military": -15,
                "Science": 0
            },
            "Choice2": {
                "Food": -3,
                "Security": 0,
                "Population": -100,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge5"
        },
        "ConqueringAge5": {
            "Prompt": "During one of the experiments, we found that whale oil is an extremely valuable resource.\n" +
                "1) Start catching more whales, and use whale oil to power the whole city.\n" +
                "2) Nope, we don’t want whale oil punks here. Eat whales, but throw away the oil.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 100,
                "Military": 0,
                "Science": 25
            },
            "Choice2": {
                "Food": 10,
                "Security": 0,
                "Population": 150,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge1"
        },
        "IndustrialAge1": {
            "Prompt": "Nuclear fission has been discovered. \n" +
                "1) Endorse nuclear technology development.\n" +
                "2) Let governments go wild with nuclear power!\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 150,
                "Military": 20,
                "Science": 40
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": -250,
                "Military": 40,
                "Science": 30
            },
            "NextPrompt": "IndustrialAge2"
        },
        "IndustrialAge2": {
            "Prompt": "The age of information is upon us, unfortunately with it comes misinformation.\n" +
                "1) Encourage ~the karens~ and conveniently forget what vaccinations do.\n" +
                "2) Encourage ~flat earthers~ and provide them with *definitely credible* fudged data.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -150,
                "Military": 0,
                "Science": -20
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": -35
            },
            "NextPrompt": "IndustrialAge3"
        },
        "IndustrialAge3": {
            "Prompt": "The date is September 20th, 2019. Humanity is eager to learn military secrets, with high hopes to reveal inter-galactic beings to the public. \n" +
                "1) Military secrets should never be revealed. Anonymously tip them that the raid will be aggressive and violent. \n" +
                "2) This is a democracy! What the people want is what the people get! Encourage the raider's influence and get more to join the cause.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -100,
                "Military": 20,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": -10,
                "Science": 40
            },
            "NextPrompt": "SpaceAge1"
        },
        "SpaceAge1": {
            "Prompt": "Scientists have confirmed that humans can survive by living on Mars!\n" +
                "1) Send a group of people over to have them start a new community there.\n" +
                "2) Don’t risk losing anyone out in space.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": -100,
                "Military": 0,
                "Science": 35
            },
            "Choice2": {
                "Food": 0,
                "Security": -1,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge2"
        },
        "SpaceAge2": {
            "Prompt": "Enough research has been done to make fully autonomous robots!\n" +
                "1) Make the robots and start a new “species.”\n" +
                "2) Don’t risk the robots turning against humanity.\n",
            "Choice1": {
                "Food": 0,
                "Security": -1,
                "Population": -100,
                "Military": -10,
                "Science": 50
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge3"
        },
        "SpaceAge3": {
            "Prompt": "A group of brave scientists want to go down to the Earth’s core and use it as an energy source.\n" +
                "1) They’re crazy with power and not acting very smart - don’t let them go.\n" +
                "2) Support the expedition, I HAVE THE POWERRRRR!\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": -30
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": -150,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge4"
        },
        "SpaceAge4": {
            "Prompt": "The first spaceship to travel at light speed has been invented!\n" +
                "1) Get your best astronauts on that ship and let them explore the great beyond!\n" +
                "2) The technology is too dangerous, don’t launch the expedition without knowing what’s out there.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": -15,
                "Science": 40
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": -20
            },
            "NextPrompt": "SpaceAge5"
        },
        "SpaceAge5": {
            "Prompt": "You receive a strange alien transmission, and you can’t understand it.\n" +
                "1) Recruit your top scientists to decode the message.\n" +
                "2) Ignore the message, it’s nothing important.\n",
            "Choice1": {
                "Food": 0,
                "Security": -1,
                "Population": 0,
                "Military": 0,
                "Science": 30
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge6"
        },
        "SpaceAge6": {
            "Prompt": "Alien UFOs have appeared in the sky! The aliens communicate and offer to help your people.\n" +
                "1) Trust the aliens and accept their peace.\n" +
                "2) Immediately destroy the alien saucers; they pose a major threat.\n",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 35
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": -1000,
                "Military": -50,
                "Science": 0
            },
            "NextPrompt": "CONGRATS, YOU WON!"
        }
};