// Global JSON object to store prompts
// Damn this is sweet john

const prompts = {
        "StoneAge1": {
            "Prompt": "// Stone Age \n" +
                "// On a stormy day, the gods bestowed upon us a flash in the sky. A bright living orange-yellow substance seems to be consuming nearby trees. It\'s unlike anything you\'ve ever seen\n" +
                "// Option (1) Try to reason with to the orange.\n" +
                "// Option (2) Sacrifice a rabbit to the orange.\n\n",
            "Choice": [{
                "Food": 0,
                "Security": 0,
                "Population": 50,
                "Military": 0,
                "Science": 0,
                "Result" : "// As you try to explain the meaning of life to the orange blur, a slight breeze comes in, and the orange vanishes. You lose 3 pieces of food in the process and are sad boi.\n\n\n"
            },{
                "Food": 15,
                "Security": 0,
                "Population": 50,
                "Military": 0,
                "Science": 0,
                "Result" : "// You throw the rabbit at the orange, and you notice the rabbit begins to cook! You decide to name this orange \'fire,\' and you introduce into into your community as a way to cook food. You gain 10 pieces of food and 50 population.\n\n\n"
            }],
            "NextPrompt": "StoneAge2"
        },
        "StoneAge2": {
            "Prompt": "// While being bored skipping stones one day, someone discovered that a hard hit to a fish might stun them long enough to grab and take to the community.\n" +
                "// Option (1) Encourage friends to hunt more fish.\n" +
                "// Option (2) use this knowledge to hunt other small mammals.\n\n",
            "Choice": [{
                "Food": 10,
                "Security": 0,
                "Population": 100,
                "Military": 1,
                "Science": 1,
                "Result" : "// You introduce \'fishing\' to your community, and it becomes a sort of sport as well as a way to get more food. You gain 5 pieces of food and 100 population, yum!\n\n\n"
            },{
                "Food": 12,
                "Security": 0,
                "Population": 100,
                "Military": 1,
                "Science": 1,
                "Result" : "// You find that it\'s much easier to hunt rabbits and beavers than fish with these stones, and your community thrives from the abundance of food and resources. You gain 10 pieces of food and 100 population.\n\n\n"
            }],
            "NextPrompt": "StoneAge3"
        },
        "StoneAge3": {
            "Prompt": "// A group of cavemen came to your community to seek shelter. They said that their shelter was\n" +
                "//      stomped down by a T-rex.\n" +
                "// Option (1) Welcome them with food, water and shelter.\n" +
                "// Option (2) Cook caveman, yum yum yum.\n\n",
            "Choice": [{
                "Food": 0,
                "Security": 0,
                "Population": 100,
                "Military": 30,
                "Science": 1,
                "Result" : "// You welcome the strangers into your community, and some of them volunteer to protect the community at all costs! You gain the Military statistic with 30 people to start, and Population goes up by 100.\n\n\n"
            },{
                "Food": 5,
                "Security": 0,
                "Population": 1,
                "Military": 1,
                "Science": 10,
                "Result" : "// Yum cannibalism, and you also gain some useful knowledge about cave people from the \'experiment\'! The Science statistic is introduced at 10, and you earn 5 pieces of food.\n\n\n"
            }],
            "NextPrompt": "StoneAge4"
        },
        "StoneAge4": {
            "Prompt": "// A large Tyrannosaurus stomped into your community and destroyed many dwellings.\n" +
                "// Option (1) Fight the T-Rex and try to kill it.\n" +
                "// Option (2) Try to befriend the T-Rex, he looks like a good boy!\n\n",
            "Choice": [{
                "Food": 10,
                "Security": 0,
                "Population": -100,
                "Military": -10,
                "Science": 50,
                "Result" : "// Many of your community members fall in the legendary fight with the T-Rex. \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -200,
                "Military": 50,
                "Science": 5,
                "Result" : "// Well, you\'ve tamed the beast but at great cost to your community. On the bright side, now you have a giant puppy-rex \n\n\n"
            }],
            "NextPrompt": "StoneAge5"
        },
        "StoneAge5": {
            "Prompt": "// You\'ve spotted a curious creature prowling around, but it seems kinda big.\n" +
                "// Option (1) Run up to it and whack it with your club!\n" +
                "// Option (2) Maybe best to leave this one alone...\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": -5,
                "Science": 1,
                "Result" : "// The bear did not take kindly to your whack. In return, it rampages onto your village. \n\n\n"
            },{
                "Food": 5,
                "Security": 0,
                "Population": 5,
                "Military": 10,
                "Science": 20,
                "Result" : "// Watching from the shadows, you see the bear reach into a beehive! Wow, bears like bee juice! \n\n\n"
            }],
            "NextPrompt": "StoneAge6"
        },
        "StoneAge6": {
            "Prompt": "// The temperature drops quickly and the world turns to winter in one night.\n" +
                "// Option (1) Stay in the current community for the winter with abundant resources.\n" +
                "// Option (2) Abandon the community and move somewhere else warmer.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 100,
                "Military": 1,
                "Science": -1,
                "Result" : "// Everyone survives, but your food and resources take a heavy hit. \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -100,
                "Military": -1,
                "Science": 30,
                "Result" : "// The move goes poorly, many people were caught in the cold. You learn how to treat frostbite. \n\n\n"
            }],
            "NextPrompt": "MetalAge1"
        },
        "MetalAge1": {
            "Prompt": "// Metal Age\n" +
                "// Iron has been discovered! This metal has many different uses, but you should prioritize one first.\n" +
                "// Option (1) Start by making better weapons to defend your community.\n" +
                "// Option (2) Start by making farming tools to harvest crops.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 30,
                "Science": 10,
                "Result" : "// Sharp edge = superior weapon. \n\n\n"
            },{
                "Food": 10,
                "Security": 0,
                "Population": 50,
                "Military": 1,
                "Science": 30,
                "Result" : "// Stick + iron = superior shovel. \n\n\n"
            }],
            "NextPrompt": "MetalAge2"
        },
        "MetalAge2": {
            "Prompt": "// Some civilization members have discovered the effects of alchemy! Unfortunately, their experiments are introducing poisonous chemicals into the nearby river.\n" +
                "// Option (1) Support their studies and let them continue their experiments.\n" +
                "// Option (2) Put and end to the studies and keep the drinking water clean.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 5,
                "Military": 5,
                "Science": 20,
                "Result" : "// Some alchemists have discovered the recipe for liquid gold! Unfortunately it's rather poisonous. \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 10,
                "Science": 1,
                "Result" : "// Alchemists are rather discouraged, and withdrew to create a secret society. \n\n\n"
            }],
            "NextPrompt": "MetalAge3"
        },
        "MetalAge3": {
            "Prompt": "// A new king needs to be given control of the throne, but two different people have equal \n" +
                "//      claim to the throne.\n" +
                "// Option (1) Choose the king who will focus on building the strongest nation.\n" +
                "// Option (2) Choose the king who will focus on protecting his own people.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 100,
                "Military": 40,
                "Science": 20,
                "Result" : "// Strength in military will lead our kingdom to greatness! \n\n\n"
            },{
                "Food": 10,
                "Security": 0,
                "Population": 200,
                "Military": 10,
                "Science": 20,
                "Result" : "// Long live the humble king! \n\n\n"
            }],
            "NextPrompt": "MetalAge4"
        },
        "MetalAge4": {
            "Prompt": "// Jousting tournaments have started becoming popular and are drawing more people into your civilization, but all of your good fighting men are focusing on jousting instead of actual protection!\n" +
                "// Option (1) Halt the jousting tournaments until you have enough knights for both.\n" +
                "// Option (2) Give full support to jousting and grow your community.\n\n",
            "Choice": [{
                "Food": 5,
                "Security": -1,
                "Population": 50,
                "Military": 20,
                "Science": 1,
                "Result" : "// What a spoilsport, the knights grudgingly agree. \n\n\n"
            },{
                "Food": 5,
                "Security": 0,
                "Population": 150,
                "Military": 20,
                "Science": 1,
                "Result" : "// Jousting has become wildly popular, an arena for it is being built. \n\n\n"
            }],
            "NextPrompt": "MetalAge5"
        },
        "MetalAge5": {
            "Prompt": "// A supposed \'witch\' has revealed herself to your civilization and claims to have the power to cure any disease.\n" +
                "// Option (1) She’s telling the truth - let her cure the sick.\n" +
                "// Option (2) She’s full of shit - magic doesn\'t exist.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": -1,
                "Population": 50,
                "Military": -1,
                "Science": -15,
                "Result" : "// The public start distrusting your scientists as this miracle worker does her magic. \n\n\n"
            },{
                "Food": 1,
                "Security": 1,
                "Population": -50,
                "Military": 20,
                "Science": 25,
                "Result" : "// Threatening the witch worked great! It\'s not magic at all! You\'ve convinced her to provide the formula to a natural remedy to the common sicknesses, as well as a wonderful pain reliever. Unfortunately many people died during the wait. \n\n\n"
            }],
            "NextPrompt": "MetalAge6"
        },
        "MetalAge6": {
            "Prompt": "// The den of the last dragon alive has been discovered!\n" +
                "// Option (1) Send in all of your best knights to kill the dragons before they hurt any more people.\n" +
                "// Option (2) Quietly observe the dragons and possibly learn aviation from them.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 10,
                "Military": -50,
                "Science": 5,
                "Result" : "// The battle was legendary, your army took many losses, but prevailed in the end. \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": 15,
                "Science": 40,
                "Result" : "// Turns out dragons think of us humans as entire meals, let alone snacks, and boy did we learn a lot at great cost. \n\n\n"
            }],
            "NextPrompt": "ConqueringAge1"
        },
        "ConqueringAge1": {
            "Prompt": "// Conquering Age\n" +
                "// A carpenter in our town claims he has the ability to make massive wood structures.\n" +
                "// Option (1) Build a ship!\n" +
                "// Option (2) Build a wooden statue to praise the goddess of wisdom!\n\n",
            "Choice": [{
                "Food": 5,
                "Security": 0,
                "Population": 50,
                "Military": 30,
                "Science": 35,
                "Result" : "// Bigger ships => more people on those ships => cross large rivers => exploration! \n\n\n"
            },{
                "Food": 10,
                "Security": 0,
                "Population": 150,
                "Military": 1,
                "Science": 10,
                "Result" : "// A celebration is in order to honor our deities! The citizens go wild with joy as a more strong alcohol is created for the celebrations. \n\n\n"
            }],
            "NextPrompt": "ConqueringAge2"
        },
        "ConqueringAge2": {
            "Prompt": "// We discovered a kingdom that we never learned about before! Fortunately, they speak the same language as we do.\n" +
                "// Option (1) Want to trade?\n" +
                "// Option (2) To Waarrrrrrr!\n\n",
            "Choice": [{
                "Food": 15,
                "Security": 0,
                "Population": 200,
                "Military": 20,
                "Science": 10,
                "Result" : "// Wow that went well! We gained new friends and new allies! \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -10,
                "Military": -20,
                "Science": 1,
                "Result" : "// We receive staggering losses! They even pillaged us! \n\n\n"
            }],
            "NextPrompt": "ConqueringAge3"
        },
        "ConqueringAge3": {
            "Prompt": "// A wacky scientist believes the world is round, how crazy is that?\n" +
                "// Option (1) Endorse him just for the heck of it.\n" +
                "// Option (2) Kick him out and let another nation deal with him. \n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 5,
                "Science": 30,
                "Result" : "// You wait months for any word on this wacky scientist, when suddenly his ship reappears! He speaks of a land beyond the vast ocean! Wow! \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": -10,
                "Science": 1,
                "Result" : "// He is so distraught at your refusal that he takes out a few of your guards in a fit of anger. \n\n\n"
            }],
            "NextPrompt": "ConqueringAge4"
        },
        "ConqueringAge4": {
            "Prompt": "// Our ship is being attacked by a huge toad in the ocean!\n" +
                "// Option (1) Finally, a  worthy opponent...\n" +
                "// Option (2) Prepare for evacuation!\n\n",
            "Choice": [{
                "Food": 10,
                "Security": 0,
                "Population": -50,
                "Military": 5,
                "Science": 25,
                "Result" : "// The ocean toad smashed a chunk of your city in this legendary battle. Now you have toad meat.  \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": 10,
                "Science": 20,
                "Result" : "// The ocean toad takes one look at fleeing citizens and uses its lengthy tongue to scoop up many of them. Both the toad and the people are never heard from again. \n\n\n"
            }],
            "NextPrompt": "ConqueringAge5"
        },
        "ConqueringAge5": {
            "Prompt": "// During an experiment, we found that whale oil is an extremely valuable resource.\n" +
                "// Option (1) Start catching more whales, and use whale oil to power the whole city.\n" +
                "// Option (2) Nope, we don\'t want whale oil punks here. Eat whales, but throw away the oil.\n\n",
            "Choice": [{
                "Food": 5,
                "Security": 0,
                "Population": 100,
                "Military": 5,
                "Science": 35,
                "Result" : "// Whale oil catches on quickly and many people enjoy the improvement! \n\n\n"
            },{
                "Food": 15,
                "Security": 0,
                "Population": 150,
                "Military": 5,
                "Science": 10,
                "Result" : "// Whale meat becomes a delicacy, whale jerky in particular tastes delicious plus an added bonus of long shelf life. \n\n\n"
            }],
            "NextPrompt": "ConqueringAge6"
        },
        "ConqueringAge6": {
            "Prompt": "// A trade ship was spotted by a nearby pirate ship, and the pirate ship begins to advance! \n" +
                "// Option (1) Have the trade ship fire their cannons immediately! Prepare for attack! \n" +
                "// Option (2) Have the trade ship attempt to outrun the pirates. Make haste! \n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": -20,
                "Science": 1,
                "Result" : "// The pirates were defeated with help from the local navy, but some lives and goods were lost.\n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": -1,
                "Science": -1,
                "Result" : "// Unforunately the sailors could not outrun the pirates: no one survived.\n\n\n"
            }],
            "NextPrompt": "IndustrialAge1"
        },
        "IndustrialAge1": {
            "Prompt": "// The age of information is upon us, unfortunately with it comes misinformation.\n" +
                "// Option (1) Encourage ~the karens~ and conveniently forget what vaccinations do.\n" +
                "// Option (2) Encourage ~flat earthers~ and provide them with *definitely credible* fudged data.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": 5,
                "Science": -20,
                "Result" : "// Wow, people these days can cause such a ruckus. They\'ll believe anything! \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 5,
                "Science": -20,
                "Result" : "// Wow, people these days will believe anything, even proven science. \n\n\n"
            }],
            "NextPrompt": "IndustrialAge2"
        },
        "IndustrialAge2": {
            "Prompt": "// Industrial Age\n" +
                "// Nuclear fission has been discovered. \n" +
                "// Option (1) Endorse nuclear technology development.\n" +
                "// Option (2) Seems a little risky, keep on using coal and electricity. \n\n",
            "Choice": [{
                "Food": 5,
                "Security": 0,
                "Population": 150,
                "Military": 30,
                "Science": 40,
                "Result" : "// Wow! So efficient, so clean! We learned a lot, including weaponized uses! \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": 10,
                "Science": 30,
                "Result" : "// Breathing in coal all day kinda sucks, but we\'ve made so many cool things! \n\n\n"
            }],
            "NextPrompt": "IndustrialAge3"
        },
        "IndustrialAge3": {
        "Prompt": "// The date is September 20th, 2019. Humanity is eager to learn military secrets, with high hopes to reveal inter-galactic beings to the public. \n" +
            "// Option (1) Military secrets should never be revealed. Anonymously tip them that the raid will be aggressive and violent. \n" +
            "// Option (2) This is a democracy! What the people want is what the people get! Encourage the raider\'s influence and get more to join the cause.\n\n",
        "Choice": [{
            "Food": 1,
            "Security": 1,
            "Population": -50,
            "Military": 20,
            "Science": -10,
            "Result" : "// That went as expected, September 20th goes down in history as a massacre. \n\n\n"
        },{
            "Food": 1,
            "Security": -1,
            "Population": 25,
            "Military": -10,
            "Science": 40,
            "Result" : "// People came in flocks to discover tucked away secrets. No military can stop this many people. The secured RAYGUN becomes public property. \n\n\n"
        }],
        "NextPrompt": "IndustrialAge4"
    },
    "IndustrialAge4": {
        "Prompt": "// Submarines unlock a vast oceanic world underneath miles of water.\n" +
            "// Option (1) Research alien-like ocean fishies.\n" +
            "// Option (2) Research underwater living spaces to sell to the uber rich. \n\n",
        "Choice": [{
            "Food": 10,
            "Security": 0,
            "Population": 50,
            "Military": 5,
            "Science": 40,
            "Result" : "// Wow these fish are fascinating! We can learn so much from these mysterious fishies \n\n\n"
        },{
            "Food": 1,
            "Security": 0,
            "Population": -50,
            "Military": 5,
            "Science": 20,
            "Result" : "// Lots of space down here for cool rich people, gimme the money! \n\n\n"
        }],
        "NextPrompt": "IndustrialAge5"
    },
    "IndustrialAge5": {
        "Prompt": "// A doctor has discovered the secret to cyber implants!\n" +
            "// Option (1) Weaponize the tech.\n" +
            "// Option (2) Open source! Open source! \n\n",
        "Choice": [{
            "Food": 1,
            "Security": 0,
            "Population": -50,
            "Military": 40,
            "Science": 20,
            "Result" : "// One step closer to developing Terminators, great job! \n\n\n"
        },{
            "Food": 5,
            "Security": 0,
            "Population": 110,
            "Military": 20,
            "Science": 30,
            "Result" : "// Give everyone the power! \n\n\n"
        }],
        "NextPrompt": "IndustrialAge6"
    },
    "IndustrialAge6": {
        "Prompt": "// Mass-producing food becomes a potential option to satisfy the ever-increasing demand.\n" +
            "// Option (1) Support mass-production of food, we need to feed some hungry mouths!.\n" +
            "// Option (2) Support organic food and local farms, none of that GMO crap. \n\n",
        "Choice": [{
            "Food": 15,
            "Security": 0,
            "Population": -50,
            "Military": 1,
            "Science": 20,
            "Result" : "// FEED ME! \n\n\n"
        },{
            "Food": 10,
            "Security": 0,
            "Population": 100,
            "Military": 1,
            "Science": 10,
            "Result" : "// Organic food always tastes better anyways, facts. \n\n\n"
        }],
        "NextPrompt": "SpaceAge1"
    },
        "SpaceAge1": {
            "Prompt": "// Space Age\n" +
                "// Scientists have confirmed that humans can survive by living on Mars!\n" +
                "// Option (1) Send a group of people over to have them start a new community there.\n" +
                "// Option (2) Don\'t risk losing anyone out in space.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": -10,
                "Military": 5,
                "Science": 35,
                "Result" : "// People can live on Mars! With some small modifications...may have cost a few lives... \n\n\n"
            },{
                "Food": 0,
                "Security": -1,
                "Population": 10,
                "Military": 10,
                "Science": 5,
                "Result" : "// Doing what humans have always done, staying on Earth! \n\n\n"
            }],
            "NextPrompt": "SpaceAge2"
        },
        "SpaceAge2": {
            "Prompt": "// Enough research has been done to make fully autonomous robots!\n" +
                "// Option (1) Make the robots and start a new \'species.\'\n" +
                "// Option (2) Don\'t risk the robots turning against humanity.\n\n",
            "Choice": [{
                "Food": 0,
                "Security": -1,
                "Population": -50,
                "Military": -5,
                "Science": 50,
                "Result" : "// Well it started great, but by the third system update, the robots formed a resistance group for robot rights.  \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 10,
                "Science": 1,
                "Result" : "// Things continue as normal.  \n\n\n"
            }],
            "NextPrompt": "SpaceAge3"
        },
        "SpaceAge3": {
            "Prompt": "// A group of brave scientists want to go down to the Earth\'s core and use it as an energy source.\n" +
                "// Option (1) They\'re crazy with power and not acting very smart - don\'t let them go.\n" +
                "// Option (2) Support the expedition, I HAVE THE POWERRRRR!\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 5,
                "Science": -10,
                "Result" : "// The scientists are disappointed they couldn\'t test their theories and put them in action, maybe another time?. \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -50,
                "Military": 1,
                "Science": 5,
                "Result" : "// Machinery malfunction, the spewing lava from the scientists\'s drill killed some citizens. \n\n\n"
            }],
            "NextPrompt": "SpaceAge4"
        },
        "SpaceAge4": {
            "Prompt": "// The first spaceship to travel at light speed has been invented!\n" +
                "// Option (1) Get your best astronauts on that ship and let them explore the great beyond!\n" +
                "// Option (2) The technology is too dangerous, don\'t launch the expedition without knowing what\'s out there.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 5,
                "Science": 40,
                "Result" : "// I\'m burnin though the skyy, two hundred degrees, that\'s why they call me Mr Fahrenheit, I\'m traveling at the speed of lightttt! I wanna make a supersonic man outta you! Don\'t stop me nooow... \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": 50,
                "Military": 5,
                "Science": -20,
                "Result" : "// The astronauts are disappointed they couldn\'t sing Queen\'s \'Dont Stop Me Now\' on repeat in the cosmos. \n\n\n"
            }],
            "NextPrompt": "SpaceAge5"
        },
        "SpaceAge5": {
            "Prompt": "// You receive a strange alien transmission, and you can\'t understand it. \n" +
                "// Option (1) Recruit your top scientists to decode the message.\n" +
                "// Option (2) Ignore the message, it\'s nothing important.\n\n",
            "Choice": [{
                "Food": 1,
                "Security": -1,
                "Population": 50,
                "Military": 10,
                "Science": 35,
                "Result" : "// Hmm fascinating, it say's to expect company shortly! How exciting! \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": 10,
                "Military": 25,
                "Science": -5,
                "Result" : "// Nervous or something? don\'t want to be diplomatic with other universe-beings? Too bad for you, they\'re on the way. \n\n\n"
            }],
            "NextPrompt": "SpaceAge6"
        },
        "SpaceAge6": {
            "Prompt": "// Alien UFOs have appeared in the sky! The aliens communicate and offer to help your people.\n" +
                "// Option (1) Trust the aliens and accept their peace.\n" +
                "// Option (2) Immediately destroy the alien saucers; they pose a major threat.\n\n",
            "Choice": [{
                "Food": 10,
                "Security": 0,
                "Population": 50,
                "Military": 10,
                "Science": 45,
                "Result" : "// Woo fancy space tech! We can learn so much! \n\n\n"
            },{
                "Food": 1,
                "Security": 0,
                "Population": -900,
                "Military": -50,
                "Science": -5,
                "Result" : "// Sure, point our puny pew pew guns at the space traveling beings, that won\'t go poorly. \n\n\n"
            }],
            "NextPrompt": "finish"
        },
        "finish": {
            "Prompt": "// You win.\n",
            "Choice": [{
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0,
                "Result" : "// Nothing happens...because you the game is over. \n\n"
            },{
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0,
                "Result" : "// Nothing happens...because you the game is over. \n\n"
            }],
            "NextPrompt": "CONGRATS, YOU WON!"
        },
        "finishL": {
            "Prompt": "// You finished the game, unfortunately you did not balance your resources!\n",
            "Choice": [{
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0,
                "Result": "// Nothing happens...because you the game is over. \n\n"
            }, {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0,
                "Result": "// Nothing happens...because you the game is over. \n\n"
            }],
            "NextPrompt": "CONGRATS, YOU WON!"
        }
};
