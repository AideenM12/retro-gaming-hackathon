// Instantiate Phaser
let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

playerSprite = localStorage.getItem("playerSprite");

// preload assets
function preload () {
    this.load.image('floor', 'assets/tileset/frames/environment/floor/floor-group.png');
    this.load.image('acid-floor', 'assets/tileset/frames/environment/floor/acid-floor.png');
    this.load.image('single-floor', 'assets/tileset/frames/environment/floor/floor_5.png');
    this.load.image('door', 'assets/tileset/frames/environment/door/doors_leaf_closed.png');
    this.load.image('exit-door', 'assets/tileset/frames/environment/door/doors_all.png');
    this.load.image('secret-door', 'assets/tileset/frames/environment/door/doors_leaf_open.png');
    this.load.image('skull', 'assets/tileset/frames/enemies/skull.png');
    this.load.image('blue-Flask-Big', 'assets/tileset/frames/environment/objects/flask_big_blue.png');
    this.load.image('yellow-potion', 'assets/tileset/frames/environment/objects/flask_yellow.png');
    this.load.image('long-column', 'assets/tileset/frames/environment/wall/wall_coulmn_base.png');
    this.load.image('heart', 'assets/tileset/frames/ui/ui_heart_full.png');
    this.load.image('column', 'assets/tileset/frames/environment/column/wall_column_mid.png');
    this.load.image('column-flipped', 'assets/tileset/frames/environment/column/wall_column_mid-flipped.png');
    this.load.image('column-red-banner', 'assets/tileset/frames/environment/wall/wall_banner_red.png');
    this.load.image('column-red-banner-flipped', 'assets/tileset/frames/environment/wall/wall_banner_red-flipped.png');
    this.load.image('goo-pillar', 'assets/tileset/frames/environment/wall/wall_goo.png');
    this.load.image('background', 'assets/tileset/frames/environment/wall/level-background2.png');

    this.load.audio('door-close', 'assets/audio/door-creek-slam-egg.wav');
    this.load.audio('dungeon-2', 'assets/audio/Dungeon-2.mp3')

    this.load.spritesheet(
        'player',
        playerSprite,
        {
            frameWidth: 15,
            frameHeight: 21
        }
    )
};

// create assets
function create () {
    // level background & level audio
    levelBackground = this.add.image(0, 0, 'background').setScale(.3, .2).setOrigin(0, 0);
    levelMusic = this.sound.add('dungeon-2', {
        volume: 0.2,
        loop: true
    });
    levelMusic.play();

    // create level platforms
    platforms = this.physics.add.staticGroup();
    floor = platforms.create(((window.innerWidth / 2 - 217)), (window.innerHeight * 0.2), 'single-floor').setScale(8, 1).setOrigin(0, 0).refreshBody();
    exitFloor = platforms.create(20, ((window.innerHeight * 0.70) - 36), 'floor').setScale(2, 2).setOrigin(0, 0).refreshBody();
    secretFloor = platforms.create(85, ((window.innerHeight * 0.90) - 36), 'floor').setScale(0.5, 1.5).setOrigin(0, 0).refreshBody();
    floor2 = platforms.create(((window.innerWidth / 2) + 40), (window.innerHeight * 0.35), 'single-floor').setScale(8, 1).setOrigin(0, 0).refreshBody();
    floor3 = platforms.create(((window.innerWidth / 2) - 200), (window.innerHeight * 0.37), 'single-floor').setScale(6, 1).setOrigin(0, 0).refreshBody();
    floor4 = platforms.create((window.innerWidth * 0.60), ((window.innerHeight * 0.80) - 36), 'floor').setScale(3, 2).setOrigin(0, 0).refreshBody();
    verticalColumn = platforms.create(((window.innerWidth / 2 - 217)), (window.innerHeight * 0.2), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();
    verticalColumn2 = platforms.create(((window.innerWidth / 2 - 217) + (floor.width * 7)), (window.innerHeight * 0.2), 'single-floor').setScale(1, 5).setOrigin(0, 0).refreshBody();
    verticalColumn3 = platforms.create((floor2.body.position.x * 1.05), (window.innerHeight * 0.7), 'single-floor').setScale(1.5, 9).setOrigin(0, 0).refreshBody();
    verticalColumn4 = platforms.create((floor2.body.position.x * 0.8), (window.innerHeight * 0.6), 'single-floor').setScale(1.5, 9).setOrigin(0, 0).refreshBody();
    secretPlatform = platforms.create(275, (window.innerHeight * 0.80), 'single-floor').setScale(3, 1).setOrigin(0, 0).refreshBody();
    secretPlatform2 = platforms.create(200, (window.innerHeight * 0.90), 'single-floor').setScale(3, 1).setOrigin(0, 0).refreshBody();

    // kill floor
    kill = this.physics.add.staticGroup();
    killFloor = kill.create(0, ((window.innerHeight * 1) - 48), 'acid-floor').setScale(5, 3).setOrigin(0, 0).refreshBody();

    // add small animation to kill floor
    this.tweens.add({
        targets: killFloor,
        scaleY: 5,
        y: (window.innerHeight * 1) - 24,
        duration: 1500,
        yoyo: true,
        ease: 'Linear',
        repeat: -1
    });

    // static scene objects doors/skulls/ladders etc
    door = this.add.image(((window.innerWidth / 2) - 200), (window.innerHeight * 0.10), 'door').setScale(3).setOrigin(0, 0);
    doorCloseAudio = this.sound.play('door-close');

    column1 = this.add.image(43, (window.innerHeight * 0.61), 'column').setScale(3).setOrigin(0, 0);
    columnRedBanner = this.add.image(43, ((window.innerHeight * 0.57) + 10), 'column-red-banner').setScale(3).setOrigin(0, 0);
    column2 = this.add.image(280, (window.innerHeight * 0.61), 'column-flipped').setScale(3).setOrigin(0, 0);
    columnRedBanner2 = this.add.image(280, ((window.innerHeight * 0.57) + 10), 'column-red-banner-flipped').setScale(3).setOrigin(0, 0);

    verticalColumn5 = platforms.create(280, ((window.innerHeight * 0.50) - 40), 'single-floor').setScale(1.5, 12).setOrigin(0, 0).refreshBody();
    floor5 = platforms.create(175, ((window.innerHeight * 0.50) - 40), 'single-floor').setScale(8, 1).setOrigin(0, 0).refreshBody();

    // exit door
    exit = this.physics.add.staticGroup();
    exitDoor = exit.create(90, (window.innerHeight * 0.55), 'exit-door').setScale(3).setOrigin(0, 0).refreshBody();

    // secret level door
    secretExit = this.physics.add.staticGroup();
    secretDoor = secretExit.create(90, (window.innerHeight * 0.80), 'secret-door').setScale(2).setOrigin(0, 0).refreshBody();

    // ambient background objects
    yellowPotion = this.add.image(((window.innerWidth / 2) - 230), (window.innerHeight * 0.17), 'yellow-potion').setScale(2).setOrigin(0, 0);
    blueFlaskBig = this.add.image(((window.innerWidth / 2) - 220), (window.innerHeight * 0.17), 'blue-Flask-Big').setScale(2).setOrigin(0, 0);

    heartEE = this.physics.add.staticGroup();
    heart = heartEE.create(50, ((window.innerHeight * 0.65) + 15), 'heart').setScale(1);
    this.tweens.add({
        targets: heart,
        scale: 1.5,
        duration: 2000,
        yoyo: true,
        ease: 'Linear',
        repeat: -1
    })
    // skull = this.add.image(40, (window.innerHeight * 0.9), 'skull').setScale(4).setOrigin(0, 0);

    // character
    player = this.physics.add.sprite(((window.innerWidth / 2) - 175), (window.innerHeight * 0.10), 'player');
    player.setOrigin(0, 0);
    player.setScale(3);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(
            'player', {
                start: 4,
                end: 7
            }
        ),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(
            'player', {
                start: 0,
                end: 3
            }
        ),
        frameRate: 5,
        repeat: -1
    });

    // add collision between player and platforms
    this.physics.add.collider(player, platforms);

    // overlap detection between player and killFloor
    this.physics.add.overlap(player, killFloor, death, null, this);

    // overlap detection between player and exitDoor
    this.physics.add.overlap(player, exitDoor, nextLevel, null, this);

    // overlap detection between player and secretExit
    this.physics.add.overlap(player, secretDoor, secretLevel, null, this);

    // overlap detection between player and heart
    heartOverlap = this.physics.add.overlap(player, heart, beProud, null, this);

    // create keyboard detection for up/down/right/left arrow
    cursors = this.input.keyboard.createCursorKeys();
};

// update game tick
function update () {

    if (cursors.left.isDown) {
        player.setVelocityX(-120);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(120);
        player.anims.play('right', true)
    } else if (cursors.down.isDown) {
        player.setVelocityY(400);
    } else {
        player.setVelocityX(0);
    };

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-350);
    };

};

// function to handle level win mechanic
function nextLevel (player, exitDoor) {
    console.log("win");
    window.location.href = '/level-3.html';
};

// function to run a thing and do a thing.....hidden because of things
function _0x4b19(_0x25fd1e,_0x5f255e){const _0x4910fa=_0x4910();return _0x4b19=function(_0x4b196b,_0x182581){_0x4b196b=_0x4b196b-0x8f;let _0xd4d488=_0x4910fa[_0x4b196b];return _0xd4d488;},_0x4b19(_0x25fd1e,_0x5f255e);}(function(_0x1eefd1,_0x3979ae){const _0xc50d89=_0x4b19,_0x22458f=_0x1eefd1();while(!![]){try{const _0x434c1f=-parseInt(_0xc50d89(0x98))/0x1*(-parseInt(_0xc50d89(0x92))/0x2)+-parseInt(_0xc50d89(0x9c))/0x3*(parseInt(_0xc50d89(0x99))/0x4)+parseInt(_0xc50d89(0x9a))/0x5*(parseInt(_0xc50d89(0x90))/0x6)+-parseInt(_0xc50d89(0x9b))/0x7+-parseInt(_0xc50d89(0x91))/0x8+parseInt(_0xc50d89(0x94))/0x9+parseInt(_0xc50d89(0x93))/0xa;if(_0x434c1f===_0x3979ae)break;else _0x22458f['push'](_0x22458f['shift']());}catch(_0xbf83c4){_0x22458f['push'](_0x22458f['shift']());}}}(_0x4910,0x59ce0));function _0x4910(){const _0x40fa70=['34836RVYqhj','3518784ArpInz','58tFUJPN','8148110SvjzHn','4238037ODQYBQ','world','physics','removeCollider','4766DQbQVg','1392332YtzWhJ','5TeZocD','1917671nAMLAK','3IbUXsJ','68747470733a2f2f70726964652d6f7665727468657261696e626f772e6865726f6b756170702e636f6d2f'];_0x4910=function(){return _0x40fa70;};return _0x4910();}let overlapHeartTrigger=![];function beProud(_0x19cd42,_0x26b53f){const _0x53d1af=_0x4b19;if(overlapHeartTrigger){this[_0x53d1af(0x96)][_0x53d1af(0x95)][_0x53d1af(0x97)](heartOverlap);return;}console['log'](_0x53d1af(0x8f)),overlapHeartTrigger=!![];};

// function to handle secret level event
function secretLevel (player, secretDoor) {
    console.log("secret level");
    window.location.href = '/level-4.html';
}

// function to handle level death mechanic
function death (player, killFloor) {
    this.registry.destroy();
    this.events.off();
    this.scene.restart();
};
