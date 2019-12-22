// Global JSON object to store prompts

const prompts = {
        "StoneAge1": {
            "Prompt": "On a stormy day, the gods bestowed upon us a flash in the sky. A bright living orange-yellow" +
                " substance seems to be consuming nearby trees.\n 1) Try to reason with to the orange.\n 2) Sacrifice" +
                " a rabbit to the orange.\n",
            "Choice1": {
                "Food": -3,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 10,
                "Security": 0,
                "Population": 50,
                "Military": 0,
                "Science": 0
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
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
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
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "MetalAge4"
        },
        "MetalAge4": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "MetalAge5"
        },
        "MetalAge5": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "MetalAge6"
        },
        "MetalAge6": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge1"
        },
        "ConqueringAge1": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge2"
        },
        "ConqueringAge2": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge3"
        },
        "ConqueringAge3": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge4"
        },
        "ConqueringAge4": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge5"
        },
        "ConqueringAge5": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "ConqueringAge6"
        },
        "ConqueringAge6": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge1"
        },
        "IndustrialAge1": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge2"
        },
        "IndustrialAge2": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge3"
        },
        "IndustrialAge3": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge4"
        },
        "IndustrialAge4": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge5"
        },
        "IndustrialAge5": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "IndustrialAge6"
        },
        "IndustrialAge6": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge1"
        },
        "SpaceAge1": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge2"
        },
        "SpaceAge2": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
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
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge4"
        },
        "SpaceAge4": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "SpaceAge5"
        },
        "SpaceAge5": {
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
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
            "Prompt": "",
            "Choice1": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "Choice2": {
                "Food": 0,
                "Security": 0,
                "Population": 0,
                "Military": 0,
                "Science": 0
            },
            "NextPrompt": "CONGRATS, YOU WON!"
        }
};