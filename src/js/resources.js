import { ImageSource, Sound, Resource, Loader } from 'excalibur'


// voeg hier jouw eigen resources toe
const Resources = {
   
    //lab
    LabBackground: new ImageSource('images/lab/labvloerbasic.png'),
    Obstacle1: new ImageSource('images/lab/labtable1.png'),
    Obstacle2: new ImageSource('images/lab/labtable2.png'),
    Obstacle3: new ImageSource('images/lab/labtableB.png'),
    Obstacle4: new ImageSource('images/lab/labtablelong.png'),
    Obstacle5: new ImageSource('images/lab/labtablemiddle.png'),
    Book: new ImageSource('images/lab/book.png'),

 
    //lab deuren
    SwampDoor: new ImageSource('images/lab/moerasdeur.png'),
    PoolDoor: new ImageSource('images/lab/deurbasic.png'),
    SavanneDoor: new ImageSource('images/lab/deurbasic.png'),
    TropenDoor: new ImageSource('images/lab/tropen-door.png'),
 
    //placeholders
    Bones: new ImageSource('images/bones.png'),
    Mine: new ImageSource('images/mine.png'),
    Bubble: new ImageSource('images/bubble.png'),
    Fish: new ImageSource('images/fish.png'),
    Net: new ImageSource('images/tropen/grijs.png'),
    Tree: new ImageSource('images/tropen/palmboom.png'),
    Hartred: new ImageSource('images/hartred.png'),
    Hartgrey: new ImageSource('images/hartgrey.png'),

    //discovered icons animals
    Capydiscover: new ImageSource("images/capyshrekicon.png"),
    MonkeyDiscover: new ImageSource("images/monkeycaughticon.png"),
    //: new ImageSource("images/capyshrekicon.png"),

    //discovered icons flowers
    Orchiddiscover: new ImageSource("images/orchidicon.png"),
    // Monkeydiscover: new ImageSource("images/capyshrekicon.png"),


    //undiscovered icons animals
    Capyundiscover: new ImageSource("images/capyshrek-bwicon.jpg"),
    Monkeyundiscover: new ImageSource("images/monkeyiconbw.jpg"),

    //undiscovered icons flowers
    Orchidundiscover: new ImageSource("images/orchidbwicon.jpg"),

    //player   
    Player: new ImageSource('images/player-sprite.png'),
    Net: new ImageSource('images/tropen/net.png'),

    //tropen
    Tropenbg: new ImageSource('images/tropen/junglebg.png'),
    MutatedMonkey: new ImageSource('images/tropen/monkeyinfected-sprite.png'),
    Palmtree: new ImageSource('images/tropen/palmboom.png'),
    Orchid: new ImageSource('images/tropen/mockorch.png'),
    YellowStone: new ImageSource('images/tropen/rockyel.png'),
    Purplebush: new ImageSource('images/tropen/paarse-struik.png'),
    Purplebushberries: new ImageSource('images/tropen/paarse-struik-met-bessen.png'),

    //moeras
    Swampbg: new ImageSource('images/moeras/swampbg.png'),
    Swampbg1: new ImageSource('images/moeras/swampbg-1.png'),
    Swampbg2: new ImageSource('images/moeras/swampbg-2.png'),
    Swampbg3: new ImageSource('images/moeras/swampbg-3.png'),
    Swampbg4: new ImageSource('images/moeras/swampbg-4.png'),
    Swampbg5: new ImageSource('images/moeras/swampbg-5.png'),
    Swampbg6: new ImageSource('images/moeras/swampbg-6.png'),
    Swampbg7: new ImageSource('images/moeras/swampbg-7.png'),
    Swampbg8: new ImageSource('images/moeras/swampbg-8.png'),
    Swampbg82: new ImageSource('images/moeras/swampbg-82.png'),
    Swampbg83: new ImageSource('images/moeras/swampbg-83.png'),
    Swampbg9: new ImageSource('images/moeras/swampbg-9.png'),


    Capybara: new ImageSource('images/moeras/capyshrek-sprite.png'),
    Capyfiona: new ImageSource('images/moeras/capyfiona.png'),
    Bluebush: new ImageSource('images/moeras/blauwe-bush.png'),
    Grasblue: new ImageSource('images/moeras/grasblue.png'),
    Lilypad: new ImageSource('images/moeras/lilypad.png'),
    Purplerock: new ImageSource('images/moeras/rockpurp.png'),
    Food: new ImageSource('images/moeras/melondrawing.png'),
    SwampRose: new ImageSource('images/moeras/swamprose.png')


}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }