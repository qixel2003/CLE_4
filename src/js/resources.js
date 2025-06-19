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
    Capybara: new ImageSource('images/moeras/capyshrek-sprite.png'),
    Bluebush: new ImageSource('images/moeras/blauwe-bush.png'),
    Food: new ImageSource('images/mine.png'),
    SwampRose: new ImageSource('images/bones.png')


}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }