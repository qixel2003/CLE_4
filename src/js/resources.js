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
    Book2: new ImageSource('images/lab/book.png'),
    Antidotetable: new ImageSource("images/lab/antidotetable.png"),
    Books: new ImageSource("images/books.png"),
    LongBooks: new ImageSource("images/longbooks.png"),
    LongBooks2: new ImageSource("images/longbooks.png"),

 

    //lab decorations
    Purplepotion: new ImageSource("images/lab/purplepotion.png"),
    Randompotions: new ImageSource("images/lab/randompotions.png"),
    Randompotionsremains: new ImageSource("images/lab/randompotionsremains.png"),
    Brokenpotplant: new ImageSource("images/lab/brokenpotplant.png"),
    Books: new ImageSource("images/lab/books.png"),
    Books2: new ImageSource("images/lab/books.png"),
    LongBooks: new ImageSource("images/lab/longbooks.png"),
    LongBooks2: new ImageSource("images/lab/longbooks.png"),

    //lab deuren
    SwampDoor: new ImageSource('images/lab/moerasdeur.png'),
    PoolDoor: new ImageSource('images/lab/pooldeur.png'),
    TropenDoor: new ImageSource('images/lab/tropen-door.png'),

    //placeholders
    Bones: new ImageSource('images/bones.png'),
    Mine: new ImageSource('images/mine.png'),
    Bubble: new ImageSource('images/bubble.png'),
    Fish: new ImageSource('images/fish.png'),
    Tree: new ImageSource('images/tropen/palmboom.png'),
    Hartred: new ImageSource('images/hartred.png'),
    Hartgrey: new ImageSource('images/hartgrey.png'),

    //discovered icons
    Capydiscover: new ImageSource("images/capyshrekicon.png"),
    MonkeyDiscover: new ImageSource("images/monkeycaughticon.png"),
    PenguDiscover: new ImageSource("images/penguinicon.png"),

    Orchiddiscover: new ImageSource("images/orchidicon.png"),
    Swamprosediscover: new ImageSource("images/swamprose-icon.png"),
    Purplesaksdiscover: new ImageSource("images/purplesaksicon.png"),


    //undiscovered icons
    Capyundiscover: new ImageSource("images/capyshrekicon-bw.png"),
    Monkeyundiscover: new ImageSource("images/monkeycaughticon-bw.png"),
    Penguundiscover: new ImageSource("images/penguinicon-bw.png"),

    Orchidundiscover: new ImageSource("images/orchidicon-bw.png"),
    Swamproseundiscover: new ImageSource("images/swamproseicon-bw.png"),
    Purplesaksundiscover: new ImageSource("images/purplesaksicon-bw.png"),

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
    SwampRose: new ImageSource('images/moeras/swamprose.png'),

    //Polen
    Poolbg: new ImageSource('images/poolgebied/poolbg.png'),
    SnowMountain: new ImageSource('images/poolgebied/sneeuwberg.png'),
    SnowPile: new ImageSource('images/poolgebied/snowpile.png'),
    SnowMan: new ImageSource('images/poolgebied/snowpop-tophat.png'),
    Purplesaks: new ImageSource('images/poolgebied/purpsaks.png'),
    // Penguintoslide: new ImageSource('images/poolgebied/penguintoslide-sprite.png'),
    Penguin: new ImageSource('images/poolgebied/penguinsliding-sprite.png'),


    //music

    //backgroundmusic 
    BackgroundMusicMoeras: new Sound('sounds/capybaraloop.wav'),
    BackgroundMusicLab: new Sound('sounds/labsound.wav'),
    BackgroundMusicTropen: new Sound('sounds/junglesound.mp3'),
    BackgroundMusicPoolgebied: new Sound('sounds/poolsound.mp3'),
    BackgroundMusicStartScene: new Sound('sounds/startscene.wav'),
    BackgroundMusicEndScene: new Sound('sounds/endscene.wav'),


    //walking sound
    WalkingSoundTropen: new Sound('sounds/tropenstappen.wav'),
    WalkingSoundMoeras: new Sound('sounds/moerasstappen.wav'),
    WalkingSoundPoolgebied: new Sound('sounds/snowstappen.wav'),
    WalkingSoundLab: new Sound('sounds/labstappen.wav'),

    //damage sound
    Damage: new Sound('sounds/damagesound.wav'),
    Died: new Sound('sounds/diedsound.wav'),

    //Pick up
    PickUp: new Sound('sounds/pickupsound.wav')









}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }